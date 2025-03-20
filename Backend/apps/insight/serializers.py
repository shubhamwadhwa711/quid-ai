from rest_framework import serializers
from .models import *


class CompanyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyCategory
        fields = '__all__'

class AssociatedCompanySerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = AssociatedCompany
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        exclude = ['created_by']     

class InsightsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InsightsCategory
        fields = '__all__'                

class InsightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insights
        exclude = ['updated_at','updated_by','created_by']                       

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = '__all__'                                