from django.shortcuts import render
from rest_framework import viewsets
from django.db.models import Q
from . models import *
from . serializers import *
# Create your views here.

# API for Company
class CompanyCategoryViewSet(viewsets.ModelViewSet):
    queryset = CompanyCategory.objects.all()
    serializer_class = CompanyCategorySerializer
    http_method_names = ['get']

class AssociatedCompanyViewSet(viewsets.ModelViewSet):
    serializer_class = AssociatedCompanySerializer
    http_method_names = ['get']

    def get_queryset(self):
        category_id = self.kwargs['category_pk']
        return AssociatedCompany.objects.filter(category_id=category_id) 


class AllCompany(viewsets.ModelViewSet):
    queryset = AssociatedCompany.objects.all()
    serializer_class = AssociatedCompanySerializer
    http_method_names = ['get']





# API for testimonial
class Testimonial(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    http_method_names = ['get']


