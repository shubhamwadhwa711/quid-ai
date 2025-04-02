from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only = True)
    
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name']

       

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     data['full_name'] = f"{instance.first_name} {instance.last_name}"    
    #     return data
    
    # def to_internal_value(self, data):
    #     full_name = data.pop('full_name', None)
    #     if full_name:
    #         first_name, last_name = full_name.split()
    #         data['first_name']= first_name
    #         data['last_name']= last_name
    #     return super().to_internal_value(data)    



class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'        
class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100, required =True)
    last_name = serializers.CharField(max_length=100, required =True)
    # country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all())
    # skill = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), many=True)
    # user = UserSerializer()
    class Meta:
        model = Profile
        exclude =['status','is_featured', 'auto_approve_inquiry','phone','website'] 
        # fields = ['first_name', 'country','skill','user']

    def to_representation(self, instance):
        return ProfileRelatedSerializer(instance).data
    
        # data = super().to_representation(instance)
        # data['full_name'] = f"{instance.first_name} {instance.last_name}"    
        # return data
   
    def update(self, instance, validated_data):
        # Handle updating nested fields
        
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        instance.user.first_name = first_name
        instance.user.last_name = last_name
        instance.user.save()

        # Update instance with remaining fields
        return super().update(instance, validated_data)       

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Education
        fields = ['degree']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'      

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificates
        fields = '__all__'  

class ProjectSerializer(serializers.ModelSerializer):
    tag = SkillSerializer(read_only=True, many=True)
    class Meta:
        model = Project
        fields = '__all__'  

class ProjectEditSerializer(serializers.ModelSerializer):
    tag = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), many=True)
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

    def create(self, validated_data):
        profile = validated_data.get('profile')
        if profile and profile.auto_approve_inquiry:
            validated_data['status'] = "APPROVED"
        return super().create(validated_data)    


class ClientSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer(read_only=True)
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
    country = CountrySerializer()
    language = LanguageSerializer(many=True, read_only=True)
    available_to = AvailableSerializer(many=True, read_only=True)
    education= EducationSerializer(many=True,read_only=True)
    projects = ProjectSerializer(many=True,read_only=True)
    client = ClientSerializer(many=True,read_only=True)
    
    class Meta:
        model = Profile
        exclude =['status','is_featured', 'auto_approve_inquiry','phone','website'] 

     