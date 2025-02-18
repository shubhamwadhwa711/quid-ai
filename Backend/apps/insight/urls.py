from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'category', CompanyCategoryViewSet)
router.register(r'all-company', AllCompany)
router.register(r'company', AssociatedCompanyViewSet, basename='company')
router.register(r'testimonial', Testimonial)


# Nested router for company under category
category_company_router = NestedDefaultRouter(router, r'category', lookup='category')
category_company_router.register(r'company', AssociatedCompanyViewSet, basename = 'company')

urlpatterns = [
   
    path('', include(router.urls)),
    path('', include(category_company_router.urls)),
  

     
    
]