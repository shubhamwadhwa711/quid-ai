from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only = True)
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'        



class ProfileSerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField()
    # skill = serializers.SlugRelatedField(many=True, queryset=Skill.objects.all(), slug_field="name")
    skill = SkillSerializer(many=True)
    class Meta:
        model = Profile
        exclude =['status','is_featured', 'auto_approve_inquiry'] 



class EducationSerializer(serializers.ModelSerializer):
#    profile = serializers.PrimaryKeyRelatedField( queryset=Profile.objects.all(), source="profile.id")
# #    profile = serializers.StringRelatedField()
   class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    # profile = serializers.StringRelatedField()
    class Meta:
        model = Experience
        fields = '__all__'      

class CertificationSerializer(serializers.ModelSerializer):
    # profile = serializers.StringRelatedField()
    class Meta:
        model = Certificates
        fields = '__all__'  

class ProjectSerializer(serializers.ModelSerializer):
    # profile = serializers.StringRelatedField()
    class Meta:
        model = Project
        fields = '__all__'                        

    

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = '__all__'





class EnquirySerializer(serializers.ModelSerializer):
    # profile = serializers.StringRelatedField()
    class Meta:
        model = Enquiry
        exclude =['status', 'updated_by','updated_at'] 



