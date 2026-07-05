import logging

from django.db.models.signals import post_save, pre_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.conf import settings
from .models import Profile, Enquiry
from .tasks import  send_mail_talent

logger = logging.getLogger(__name__)


def _queue_mail(subject, message, sender_email, recipient_email):
    """Queue a notification email without letting a broker/mail outage bubble
    up into the caller. A profile approval (or enquiry) must never 500 just
    because the Celery broker is unreachable."""
    try:
        send_mail_talent.delay(subject, message, sender_email, recipient_email)
    except Exception as exc:
        logger.warning("Failed to queue mail to %s: %s", recipient_email, exc)

@receiver(pre_save, sender=Profile)
def profile_pre_save(sender, instance, **kwargs):
    if instance.pk:
        instance.old_status = (Profile.objects.filter(pk=instance.pk).values_list("status", flat=True).first())
    else:
        instance.old_status = None

@receiver(post_save, sender= Profile)
def profile_approve( sender, instance, created, **kwargs):
    if (instance.status == "APPROVED" and getattr(instance, "old_status", None) != "APPROVED"):
        subject = f"Congratulations {instance.user.first_name}, your profile has been Approved "
        message = f"Hey {instance.user.first_name}, your profile has been Approved by Quid AI. You are now ready to fly!."
        sender_email = settings.DEFAULT_FROM_EMAIL
        recipient_email = [instance.user.email]
        
        _queue_mail(subject, message, sender_email, recipient_email)

@receiver(pre_save, sender=Enquiry)
def enquiry_pre_save(sender, instance, **kwargs):
    if instance.pk:
        instance.old_status = (Enquiry.objects.filter(pk=instance.pk).values_list("status", flat=True).first())
    else:
        instance.old_status = None

@receiver(post_save, sender=Enquiry)
def send_approval_email(sender, instance, created, **kwargs):
    auto = getattr(instance.profile, "auto_approve_inquiry", False)
    if created and auto:
        if instance.status != "APPROVED":
            Enquiry.objects.filter(pk=instance.pk).update(status="APPROVED")
            instance.status = "APPROVED"


        subject = f"Hey {instance.profile.user.first_name}, {instance.full_name} wants to connect you!"
        message = f"Hey {instance.profile.user.first_name},{instance.full_name} wants to connect with you.\n{instance.message}\n Details:\n Full name: {instance.full_name}Email: {instance.email}"
        sender_email =  settings.DEFAULT_FROM_EMAIL
        
        recipient_email = [instance.profile.user.email]
        
        
        _queue_mail(subject, message, sender_email, recipient_email)
        return
    if (
        (not created)
        and (not auto)
        and instance.status == "APPROVED"
        and getattr(instance, "old_status", None) != "APPROVED"
    ):
        subject = f"Hey {instance.profile.user.first_name}, {instance.full_name} wants to connect you!"
        message = (
            f"Hey {instance.profile.user.first_name},{instance.full_name} wants to connect with you.\n"
            f"{instance.message}\n Details:\n Full name: {instance.full_name}Email: {instance.email}"
        )
        sender_email = settings.DEFAULT_FROM_EMAIL
        recipient_email = [instance.profile.user.email]
        _queue_mail(subject, message, sender_email, recipient_email)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     if instance.profile:
#         # Ensure the profile is saved after the user is created
#         instance.profile.save()

 
       
























            
