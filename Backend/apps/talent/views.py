from django.shortcuts import render
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from django.contrib.auth.models import User

# Create your views here.



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(profile__status="APPROVED")
    serializer_class = UserSerializer
    http_method_names = ['get', 'patch', 'delete',]


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.filter(status="APPROVED")
    serializer_class = ProfileSerializer
    filter_backends = [DjangoFilterBackend]  
    filterset_fields = ['location', 'user__first_name', 'industry', 'skill']  

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer   

    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Education.objects.filter(profile_id=profile_id , profile__status="APPROVED")  



class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer  
    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Experience.objects.filter(profile_id=profile_id , profile__status="APPROVED") 


class CertificationViewSet(viewsets.ModelViewSet):
    serializer_class = CertificationSerializer

    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Certificates.objects.filter(profile_id=profile_id , profile__status="APPROVED")   


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class =ProjectSerializer    

    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Project.objects.filter(profile_id=profile_id , profile__status="APPROVED")         


class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    http_method_names = ['post']
    
    
class ProfileEnquiry(viewsets.ModelViewSet):
    serializer_class =EnquirySerializer    
    http_method_names = ['post']
    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Enquiry.objects.filter(profile_id=profile_id , status="APPROVED") 
    




    
   
        
