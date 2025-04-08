# views.py

from . models import *
from . serializers import *

from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.filters import SearchFilter


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
