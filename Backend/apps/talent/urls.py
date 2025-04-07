from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'profile', ProfileViewSet)
router.register(r'us-profile', UsProfileViewSet, basename='us-profile')
router.register(r'top-profile', TopProfileViewSet, basename='top-profile')
router.register(r'profile-related', ProfileRelatedViewSet, basename='profile-related')
router.register(r'education',EducationViewSet, basename='education')
router.register(r'experience',ExperienceViewSet, basename='experience')
router.register(r'certification',CertificationViewSet, basename='certification')
router.register(r'project',ProjectViewSet, basename='project')
router.register(r'enquiry',EnquiryViewSet)
router.register(r'profile-all-enquiry',ProfileEnquiry, basename='profile-enquiry')
router.register(r'industry',IndustryViewSet)
router.register(r'skill',SkillViewSet)
router.register(r'language',LanguageViewSet)
router.register(r'available',AvailableToViewSet)
router.register(r'country',CountryViewSet)
router.register(r'client',ClientViewSet)
router.register(r'academic',AcademicViewSet, basename='academic')

# Nested router for project under profile, education, experience, certification
profile_project_router = NestedDefaultRouter(router, r'profile',lookup='profile')
profile_project_router.register(r'project', ProjectViewSet, basename='project')
profile_project_router.register(r'project-edit', ProjectEditViewSet, basename='project-edit')
profile_project_router.register(r'education', EducationViewSet, basename='education')
profile_project_router.register(r'feature-client', FeatureClientViewSet, basename='feature-client')
profile_project_router.register(r'experience', ExperienceViewSet, basename='experience')
profile_project_router.register(r'certification', CertificationViewSet, basename='certification')
profile_project_router.register(r'profile-all-enquiry',ProfileEnquiry, basename='profile-enquiry')

urlpatterns = [
   
    path('', include(router.urls)),
    path('', include(profile_project_router.urls)),
]
