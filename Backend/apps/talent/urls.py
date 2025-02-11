from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)
router.register(r'education',EducationViewSet)
router.register(r'experience',ExperienceViewSet)
router.register(r'certification',CertificationViewSet)
router.register(r'project',ProjectViewSet)

urlpatterns = [
   
    path('', include(router.urls)),
    path('enquiry', EnquiryView.as_view()),  
    
]
