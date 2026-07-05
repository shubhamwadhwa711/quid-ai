from django.contrib import admin
from django.utils.html import format_html

from .models import (
    CompanyCategory, AssociatedCompany, Testimonial,
    InsightsCategory, Insights, Faq,
)


@admin.register(CompanyCategory)
class CompanyCategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "title"]
    search_fields = ["title"]


@admin.register(AssociatedCompany)
class AssociatedCompanyAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "category", "logo_preview"]
    list_filter = ["category"]
    search_fields = ["name", "category__title"]
    autocomplete_fields = ["category"]
    list_select_related = ["category"]

    @admin.display(description="Logo")
    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="height:32px;" />', obj.logo.url)
        return "—"


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "position", "company", "rating", "created_at"]
    list_filter = ["rating", "created_at"]
    search_fields = ["name", "company", "position"]
    date_hierarchy = "created_at"


@admin.register(InsightsCategory)
class InsightsCategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "title"]
    search_fields = ["title"]


@admin.register(Insights)
class InsightsAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "category", "created_at", "updated_at"]
    list_filter = ["category", "created_at"]
    search_fields = ["title"]
    autocomplete_fields = ["category", "created_by", "updated_by"]
    list_select_related = ["category"]
    date_hierarchy = "created_at"
    readonly_fields = ["created_at", "updated_at"]


@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ["id", "question", "created_at", "updated_at"]
    search_fields = ["question", "answer"]
    date_hierarchy = "created_at"
    readonly_fields = ["created_at", "updated_at"]
