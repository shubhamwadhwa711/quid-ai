# views.py

from . models import *
from . serializers import *

from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated


class CompanyCategoryViewSet(viewsets.ModelViewSet):
    """
    API view to list all company category.
    """
    permission_classes = [AllowAny]
    queryset = CompanyCategory.objects.all()
    serializer_class = CompanyCategorySerializer
    http_method_names = ['get']

class AssociatedCompanyViewSet(viewsets.ModelViewSet):
    """
    API view to list all company which is associated with category.
    """
    permission_classes = [AllowAny]
    serializer_class = AssociatedCompanySerializer
    http_method_names = ['get']

    def get_queryset(self):
        category_id = self.kwargs['category_pk']
        return AssociatedCompany.objects.filter(category_id=category_id) 

class AllCompany(viewsets.ModelViewSet):
    """
    API view to list all company.
    """
    permission_classes = [AllowAny]
    queryset = AssociatedCompany.objects.all()
    serializer_class = AssociatedCompanySerializer
    http_method_names = ['get','post']
    filter_backends = [SearchFilter]  
    search_fields = ['name']    

    def get_permissions(self):
        if self.action == 'create':
            # Only authenticated users can create
            permission_classes = [IsAuthenticated]
        else:
            # Allow any user to perform GET requests
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]  
    

class Testimonial(viewsets.ModelViewSet):
    """
    API view to list all testimonial.
    """
    permission_classes = [AllowAny]
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    http_method_names = ['get']

class InsightsCategoryViewSet(viewsets.ModelViewSet):
    """
    API view to list all insight-category.
    """
    permission_classes = [AllowAny]
    queryset = InsightsCategory.objects.all()
    serializer_class = InsightsCategorySerializer
    http_method_names = ['get']

class InsightsViewSet(viewsets.ModelViewSet):
    """
    API view to list all insight which is associated with insight-category.
    """
    permission_classes = [AllowAny]
    serializer_class = InsightsSerializer
    http_method_names = ['get']

    def get_queryset(self):
        category_id = self.kwargs['category_pk']
        return Insights.objects.filter(category_id=category_id)
    

class AllInsightViewSet(viewsets.ModelViewSet):
    """
    API view to list all insight.
    """
    permission_classes = [AllowAny]
    queryset = Insights.objects.all()
    serializer_class = InsightsSerializer
    http_method_names = ['get']

      

class FaqViewSet(viewsets.ModelViewSet):
    """
    API view to list all FAQ.
    """
    permission_classes = [AllowAny]
    queryset = Faq.objects.all()
    serializer_class = FaqSerializer
    http_method_names = ['get']
