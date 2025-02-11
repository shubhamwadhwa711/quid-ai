from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name']





class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    skill = serializers.SlugRelatedField(many=True, queryset=Skill.objects.all(), slug_field="name")
    class Meta:
        model = Profile
        exclude =['status'] 



class EducationSerializer(serializers.ModelSerializer):
    profile = serializers.StringRelatedField()
    class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    profile = serializers.StringRelatedField()
    class Meta:
        model = Experience
        fields = '__all__'      

class CertificationSerializer(serializers.ModelSerializer):
    profile = serializers.StringRelatedField()
    class Meta:
        model = Certification
        fields = '__all__'  

class ProjectSerializer(serializers.ModelSerializer):
    profile = serializers.StringRelatedField()
    class Meta:
        model = Project
        fields = '__all__'                        

    

class EnquirySerializer(serializers.ModelSerializer):
    profile = serializers.StringRelatedField()
    class Meta:
        model = Enquiry
        exclude =['status'] 