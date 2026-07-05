"""Backfill Profile.image from LinkedIn for profiles whose stored picture rotted.

LinkedIn CDN URLs (media.licdn.com) are time-signed and expire after ~30-90d.
Older profiles were synced before we started downloading pictures server-side,
so they still point at a now-dead licdn URL and render a broken avatar.

This command re-fetches a *fresh* picture URL from Unipile for each profile's
LinkedIn handle and downloads it into Profile.image (on our own media storage),
then clears the volatile linkedin_profile_url.

Requires the Unipile settings (UNIPILE_URL / UNIPILE_ACCOUNT_ID / UNIPILE_API_KEY)
AND a LinkedIn account that is currently *connected* in Unipile — if that account's
session is expired, every call returns 401 and nothing can be backfilled until it
is reconnected in the Unipile dashboard.

Usage:
    python manage.py resync_linkedin_pictures --dry-run
    python manage.py resync_linkedin_pictures                # only profiles missing an image
    python manage.py resync_linkedin_pictures --overwrite    # refresh everyone
    python manage.py resync_linkedin_pictures --profile-id 36
"""
import time
from urllib.parse import urlparse

import requests
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError

from apps.talent.models import Profile


def _vanity_from_url(linkedin_url):
    """Extract the LinkedIn handle from https://linkedin.com/in/<vanity>[/]."""
    if not linkedin_url:
        return ""
    path = urlparse(linkedin_url).path.strip("/")
    parts = path.split("/")
    if len(parts) >= 2 and parts[0] == "in":
        return parts[1]
    return ""


class Command(BaseCommand):
    help = "Re-fetch LinkedIn profile pictures from Unipile and store them locally."

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true",
                            help="Report what would change without writing anything.")
        parser.add_argument("--overwrite", action="store_true",
                            help="Also refresh profiles that already have a local image.")
        parser.add_argument("--profile-id", type=int, default=None,
                            help="Restrict to a single profile id.")
        parser.add_argument("--sleep", type=float, default=1.0,
                            help="Seconds to wait between Unipile calls (default 1.0).")

    def handle(self, *args, **opts):
        base = (settings.UNIPILE_URL or "").strip()
        account_id = (settings.UNIPILE_ACCOUNT_ID or "").strip()
        api_key = (settings.UNIPILE_API_KEY or "").strip()
        if not (base and account_id and api_key):
            raise CommandError(
                "UNIPILE_URL / UNIPILE_ACCOUNT_ID / UNIPILE_API_KEY must be set "
                "in the environment before running this command."
            )
        if not base.endswith("/"):
            base += "/"

        dry_run = opts["dry_run"]
        overwrite = opts["overwrite"]

        qs = Profile.objects.exclude(linkedin_url__isnull=True).exclude(linkedin_url="")
        if opts["profile_id"]:
            qs = qs.filter(id=opts["profile_id"])
        if not overwrite:
            qs = qs.filter(image="")

        total = qs.count()
        self.stdout.write(f"{total} profile(s) to process "
                          f"(dry_run={dry_run}, overwrite={overwrite}).")

        headers = {"accept": "application/json", "X-API-KEY": api_key}
        ok = skipped = failed = 0

        for profile in qs.iterator():
            vanity = _vanity_from_url(profile.linkedin_url)
            if not vanity:
                self.stdout.write(self.style.WARNING(
                    f"  #{profile.id}: no LinkedIn handle in {profile.linkedin_url!r}, skipping"))
                skipped += 1
                continue

            try:
                resp = requests.get(
                    base + vanity, headers=headers,
                    params={"account_id": account_id}, timeout=25,
                )
            except requests.RequestException as exc:
                self.stdout.write(self.style.ERROR(f"  #{profile.id} ({vanity}): Unipile request failed: {exc}"))
                failed += 1
                continue

            if resp.status_code != 200:
                detail = resp.text[:150]
                self.stdout.write(self.style.ERROR(
                    f"  #{profile.id} ({vanity}): Unipile HTTP {resp.status_code} {detail}"))
                failed += 1
                # A 401 here means the Unipile LinkedIn account session expired —
                # no point hammering the rest.
                if resp.status_code == 401:
                    raise CommandError(
                        "Unipile returned 401 (expired/missing credentials). "
                        "Reconnect the LinkedIn account in Unipile and re-run.")
                time.sleep(opts["sleep"])
                continue

            data = resp.json()
            pic = data.get("profile_picture_url_large") or data.get("profile_picture_url")
            if not pic:
                self.stdout.write(self.style.WARNING(f"  #{profile.id} ({vanity}): no picture in Unipile response"))
                skipped += 1
                time.sleep(opts["sleep"])
                continue

            if dry_run:
                self.stdout.write(f"  #{profile.id} ({vanity}): would download {pic[:60]}...")
                ok += 1
                time.sleep(opts["sleep"])
                continue

            try:
                img = requests.get(pic, timeout=25)
                img.raise_for_status()
            except requests.RequestException as exc:
                self.stdout.write(self.style.ERROR(f"  #{profile.id} ({vanity}): picture download failed: {exc}"))
                failed += 1
                time.sleep(opts["sleep"])
                continue

            ctype = (img.headers.get("Content-Type") or "").lower()
            ext = "png" if "png" in ctype else "webp" if "webp" in ctype else "jpg"
            if profile.image:
                profile.image.delete(save=False)
            profile.image.save(f"linkedin_{profile.id}.{ext}", ContentFile(img.content), save=False)
            profile.linkedin_profile_url = ""
            profile.save(update_fields=["image", "linkedin_profile_url"])
            self.stdout.write(self.style.SUCCESS(
                f"  #{profile.id} ({vanity}): saved image ({len(img.content)} bytes)"))
            ok += 1
            time.sleep(opts["sleep"])

        self.stdout.write(self.style.SUCCESS(
            f"Done. updated={ok} skipped={skipped} failed={failed}"))
