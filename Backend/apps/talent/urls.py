from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'profile', ProfileViewSet)
router.register(r'education',EducationViewSet, basename='education')
router.register(r'experience',ExperienceViewSet, basename='experience')
router.register(r'certification',CertificationViewSet, basename='certification')
router.register(r'project',ProjectViewSet, basename='project')
router.register(r'enquiry',EnquiryViewSet)

# Nested router for project under profile, education, experience, certification
profile_project_router = NestedDefaultRouter(router, r'profile',lookup='profile')
profile_project_router.register(r'project', ProjectViewSet, basename='project')
profile_project_router.register(r'education', EducationViewSet, basename='education')
profile_project_router.register(r'experience', ExperienceViewSet, basename='experience')
profile_project_router.register(r'certification', CertificationViewSet, basename='certification')





urlpatterns = [
   
    path('', include(router.urls)),
    path('', include(profile_project_router.urls)),

     
    
]
