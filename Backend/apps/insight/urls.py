from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'category', CompanyCategoryViewSet)
router.register(r'all-company', AllCompany)
router.register(r'company', AssociatedCompanyViewSet, basename='company')
router.register(r'testimonial', Testimonial)
router.register(r'all-insight-category', AllInsightViewSet, basename='all-insight')
router.register(r'insight-category', InsightsCategoryViewSet)
router.register(r'insight', InsightsViewSet, basename = 'insight')

router.register(r'faq', FaqViewSet)

# Nested routing for company under category
category_company_router = NestedDefaultRouter(router, r'category', lookup='category')
category_company_router.register(r'company', AssociatedCompanyViewSet, basename = 'company')

# Nested routing for insight under category
category_insight_router = NestedDefaultRouter(router, r'insight-category', lookup='category')
category_insight_router.register(r'insight', InsightsViewSet, basename = 'insight')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(category_company_router.urls)),
    path('', include(category_insight_router.urls)),
  ]