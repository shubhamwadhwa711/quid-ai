from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Profile, Skill, Language, Experience, Education, Certificates,
    Project, Enquiry, Publication, Client, Industry, AvailableTo, Country,
)


# ---- Bulk actions -----------------------------------------------------------

@admin.action(description="Approve selected profiles")
def approve_profiles(modeladmin, request, queryset):
    # Save one-by-one (not .update()) so the approval signal/email still fires.
    updated = 0
    for profile in queryset.exclude(status="APPROVED"):
        profile.status = "APPROVED"
        profile.save()
        updated += 1
    modeladmin.message_user(request, f"{updated} profile(s) approved.")


@admin.action(description="Reject selected profiles")
def reject_profiles(modeladmin, request, queryset):
    updated = queryset.exclude(status="REJECTED").update(status="REJECTED")
    modeladmin.message_user(request, f"{updated} profile(s) rejected.")


@admin.action(description="Mark selected as featured")
def feature_profiles(modeladmin, request, queryset):
    updated = queryset.update(is_featured=True)
    modeladmin.message_user(request, f"{updated} profile(s) featured.")


@admin.action(description="Remove featured flag")
def unfeature_profiles(modeladmin, request, queryset):
    updated = queryset.update(is_featured=False)
    modeladmin.message_user(request, f"{updated} profile(s) un-featured.")


# ---- Inlines ----------------------------------------------------------------

class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 0


class EducationInline(admin.TabularInline):
    model = Education
    extra = 0


class ClientInline(admin.TabularInline):
    model = Client
    extra = 0
    autocomplete_fields = ["company"]


# ---- Profile ----------------------------------------------------------------

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = [
        "id", "full_name", "email", "status", "is_featured",
        "auto_approve_inquiry", "country", "has_photo", "avatar_preview",
    ]
    list_display_links = ["id", "full_name"]
    list_editable = ["status", "is_featured", "auto_approve_inquiry"]
    list_filter = ["status", "is_featured", "auto_approve_inquiry", "country", "industry"]
    search_fields = [
        "user__first_name", "user__last_name", "user__email",
        "headline", "skill__name",
    ]
    autocomplete_fields = ["user", "country", "industry"]
    filter_horizontal = ["skill", "language", "available_to"]
    list_select_related = ["user", "country", "industry"]
    list_per_page = 50
    readonly_fields = ["avatar_preview"]
    inlines = [ExperienceInline, EducationInline, ClientInline]
    actions = [approve_profiles, reject_profiles, feature_profiles, unfeature_profiles]

    @admin.display(description="Name", ordering="user__first_name")
    def full_name(self, obj):
        return (f"{obj.user.first_name} {obj.user.last_name}".strip()
                or obj.user.username)

    @admin.display(description="Email")
    def email(self, obj):
        return obj.user.email

    @admin.display(boolean=True, description="Photo")
    def has_photo(self, obj):
        return bool(obj.image)

    @admin.display(description="Avatar")
    def avatar_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:40px;width:40px;border-radius:50%;object-fit:cover;" />',
                obj.image.url,
            )
        return "—"

    def get_queryset(self, request):
        return super().get_queryset(request).select_related(
            "user", "country", "industry"
        )


# ---- Enquiry ----------------------------------------------------------------

@admin.action(description="Approve selected enquiries")
def approve_enquiries(modeladmin, request, queryset):
    updated = 0
    for enquiry in queryset.exclude(status="APPROVED"):
        enquiry.status = "APPROVED"
        enquiry.save()
        updated += 1
    modeladmin.message_user(request, f"{updated} enquiry(ies) approved.")


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ["id", "full_name", "email", "profile", "status", "updated_at"]
    list_filter = ["status", "updated_at"]
    search_fields = ["full_name", "email", "profile__user__first_name", "profile__user__last_name"]
    autocomplete_fields = ["profile", "updated_by"]
    list_select_related = ["profile", "profile__user"]
    date_hierarchy = "updated_at"
    actions = [approve_enquiries]


# ---- Sub-resources ----------------------------------------------------------

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "company", "profile", "start_date", "end_date"]
    search_fields = ["title", "company", "profile__user__first_name"]
    autocomplete_fields = ["profile"]
    list_select_related = ["profile", "profile__user"]


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ["id", "degree", "school", "profile", "start_year", "end_year"]
    search_fields = ["degree", "school", "profile__user__first_name"]
    autocomplete_fields = ["profile"]
    list_select_related = ["profile", "profile__user"]


@admin.register(Certificates)
class CertificatesAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "issuing_organization", "profile", "issue_date"]
    search_fields = ["name", "issuing_organization", "profile__user__first_name"]
    autocomplete_fields = ["profile"]
    list_select_related = ["profile", "profile__user"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "profile", "start_date", "end_date", "url"]
    search_fields = ["title", "profile__user__first_name"]
    autocomplete_fields = ["profile"]
    filter_horizontal = ["tag"]
    list_select_related = ["profile", "profile__user"]


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ["id", "company", "profile", "is_featured"]
    list_filter = ["is_featured"]
    search_fields = ["company__name", "profile__user__first_name"]
    autocomplete_fields = ["profile", "company"]
    list_select_related = ["profile", "profile__user", "company"]


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "profile"]
    search_fields = ["title", "profile__user__first_name"]
    autocomplete_fields = ["profile"]


# ---- Lookup tables (need search_fields to back autocomplete_fields above) ----

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(AvailableTo)
class AvailableToAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]
