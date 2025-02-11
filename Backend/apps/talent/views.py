from django.shortcuts import render
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .serializers import *
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status
# Create your views here.



# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.filter(status="APPROVED")
#     serializer_class = ProfileSerializer





class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.filter(status="APPROVED")
    serializer_class = ProfileSerializer
    filter_backends = [DjangoFilterBackend]  
    filterset_fields = ['location', 'user__first_name', 'industry', 'skill']  

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.filter(profile__status="APPROVED")
    serializer_class = EducationSerializer    

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.filter(profile__status="APPROVED")
    serializer_class = ExperienceSerializer  

class CertificationViewSet(viewsets.ModelViewSet):
    queryset = Certification.objects.filter(profile__status="APPROVED")
    serializer_class = CertificationSerializer  


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.filter(profile__status="APPROVED")
    serializer_class =ProjectSerializer                


class EnquiryView(APIView):
    def post(self, request):
       serializer = EnquirySerializer(data=request.data)
       if serializer.is_valid():
          serializer.save()
          return Response({'success':'Enquiry Created'}, status=status.HTTP_201_CREATED)
       
       return Response(serializer.errors)
    
    




    
   
        
