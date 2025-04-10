# views.py

from django.contrib.auth.models import User
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .filters import ProfileFilter


from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
# from rest_framework.parsers import MultiPartParser, FormParser

class UserViewSet(viewsets.ModelViewSet):
    """
    API view to list, delete and update all approved user.
    """
    permission_classes = [AllowAny]
    queryset = User.objects.filter(profile__status="APPROVED")
    serializer_class = UserSerializer
    http_method_names = ['get', 'patch', 'delete',]

class ProfileViewSet(viewsets.ModelViewSet):
    """
    API view to list current user.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    # def get_serializer_class(self):
    #     print(self.request.method)
    #     if self.request.method == 'GET':
    #         return ProfileRelatedSerializer
    #     return super().get_serializer_class()
   
   

class EducationViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, delete and update education.
    """
    permission_classes = [AllowAny]
    serializer_class = EducationSerializer   

    """
    Restricts the returned education to a given profile,
    by filtering against a `pk` URL parameter.
    """
    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Education.objects.filter(profile_id=profile_id , profile__status="APPROVED")  
    

class FeatureClientViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, delete and update education.
    """
    permission_classes = [AllowAny]
    serializer_class = ClientSerializer   

    """
    Restricts the returned education to a given profile,
    by filtering against a `pk` URL parameter.
    """
    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Client.objects.filter(profile_id=profile_id , profile__status="APPROVED")  


class ExperienceViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, delete and update experience.
    """
    permission_classes = [AllowAny]
    serializer_class = ExperienceSerializer 

    """
    Restricts the returned experience to a given profile,
    by filtering against a `pk` URL parameter.
    """
    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Experience.objects.filter(profile_id=profile_id , profile__status="APPROVED") 

class CertificationViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, delete and update certification.
    """
    permission_classes = [AllowAny]
    serializer_class = CertificationSerializer

    """
    Restricts the returned certification to a given profile,
    by filtering against a `pk` URL parameter.
    """
    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Certificates.objects.filter(profile_id=profile_id , profile__status="APPROVED")   

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, delete and update project.
    """
    permission_classes = [AllowAny]
    serializer_class =ProjectSerializer    
   
    
    """
    Restricts the returned project to a given profile,
    by filtering against a `pk` URL parameter.
    """
    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Project.objects.filter(profile_id=profile_id , profile__status="APPROVED") 


class ProjectEditViewSet(viewsets.ModelViewSet):
    """
    API view to for updation
    """
    permission_classes = [AllowAny]
    serializer_class =ProjectEditSerializer    
   
    
    """
    Restricts the returned project to a given profile,
    by filtering against a `pk` URL parameter.
    """
    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Project.objects.filter(profile_id=profile_id , profile__status="APPROVED")             

class IndustryViewSet(viewsets.ModelViewSet):
    """
    API view to list all industries.
    """
    permission_classes = [AllowAny]
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

class EnquiryViewSet(viewsets.ModelViewSet):
    """
    API view to create enquiries for talent.
    """
    permission_classes = [AllowAny]
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    http_method_names = ['post','get']
    
class ProfileEnquiry(viewsets.ModelViewSet):
    """
    API view to list all enquiries .
    """
    permission_classes = [AllowAny]
    serializer_class =EnquirySerializer    
    http_method_names = ['get']

    """
    Restricts the returned enquiry to a given profile,
    by filtering against a `pk` URL parameter.
    """
    def get_queryset(self):
        profile_id = self.kwargs['profile_pk']
        return Enquiry.objects.filter(profile_id=profile_id , status="APPROVED") 
    

class ProfileRelatedViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, delete and update all profile.
    """
    permission_classes = [AllowAny]
    queryset = Profile.objects.filter(Q(status="APPROVED") & Q(clients__is_featured =True))
    serializer_class = ProfileRelatedSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]  
    filterset_class = ProfileFilter  # Use the custom filter class 
    search_fields = ['user__first_name', 'user__last_name', 'skill__name','country__name','education__degree','industry__name']

class TopProfileViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, delete and update all profile.
    """
    permission_classes = [AllowAny]
    queryset = Profile.objects.filter(Q(status="APPROVED") & Q(clients__is_featured =True) & (Q(auto_approve_inquiry=True) | Q(is_featured=True)))
    serializer_class = ProfileRelatedSerializer
    http_method_names=['get']


class UsProfileViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, delete and update all profile.
    """
    permission_classes = [AllowAny]
    queryset = Profile.objects.filter(Q(status="APPROVED") & Q(clients__is_featured =True) & Q(country__name="United States"))
    serializer_class = ProfileRelatedSerializer
    http_method_names=['get']

    
class SkillViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer  
    http_method_names = ['get','post'] 
    filter_backends = [SearchFilter]  
    search_fields = ['name']    

class LanguageViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer  
    http_method_names = ['get','post','patch']
    filter_backends = [SearchFilter]  
    search_fields = ['name']    
     

class AvailableToViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = AvailableTo.objects.all()
    serializer_class = AvailableSerializer 
    http_method_names = ['get']    

class CountryViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Country.objects.all()
    serializer_class = CountrySerializer 
    http_method_names = ['get'] 
    filter_backends = [SearchFilter]  
    search_fields = ['name']         

class ClientViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Client.objects.all()
    serializer_class = ClientSerializer 
    http_method_names = ['get','post','patch','delete']   
    filter_backends = [SearchFilter]  
    search_fields = ['company__name']          

class AcademicViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Education.objects.all()
    serializer_class = EducationSerializer 
    http_method_names = ['get']    



    
   
        
