from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only = True)
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'        

class ProfileSerializer(serializers.ModelSerializer):
    skill = SkillSerializer(many=True)
    class Meta:
        model = Profile
        exclude =['status','is_featured', 'auto_approve_inquiry','phone','website'] 

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'      

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificates
        fields = '__all__'  

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'                        

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = '__all__'

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        exclude =['status', 'updated_by','updated_at', 'mobile'] 


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'        

class AvailableSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableTo
        fields = '__all__'


class ProfileRelatedSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    skill = SkillSerializer(many=True, read_only=True)
    industry = IndustrySerializer(read_only=True)
    country = CountrySerializer(read_only=True)
    language = LanguageSerializer(many=True, read_only=True)
    available_to = AvailableSerializer(many=True, read_only=True)
    education= EducationSerializer(many=True,read_only=True)
    projects = ProjectSerializer(many=True,read_only=True)
    client = ClientSerializer(many=True,read_only=True)
    
    class Meta:
        model = Profile
        exclude =['status','is_featured', 'auto_approve_inquiry','phone','website'] 