from django.contrib import admin
from .models import *
# Register your models here.
# @admin.register(Profile)
# class AdminProfile(admin.ModelAdmin):
#     list_display = ['id']
admin.site.register(Profile)
admin.site.register(Skill)
admin.site.register(Language)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Certificates)
admin.site.register(Project)
admin.site.register(Enquiry)
admin.site.register(Publication)
admin.site.register(Client)
admin.site.register(Industry)
admin.site.register(AvailableTo)
admin.site.register(Country)