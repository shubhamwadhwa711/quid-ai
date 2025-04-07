from django.db import models
from django.contrib.auth.models import User


class Skill(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class Language(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class AvailableTo(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    
    def __str__(self):
        return self.name  

class Country(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    
    def __str__(self):
        return self.name      

class Industry(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    logo = models.ImageField(upload_to='industry_logo/', null=True, blank=True)
    
    def __str__(self):
        return self.name    

class Profile(models.Model):
    STATUS = (
        ('PENDING','Pending'),
        ('APPROVED','Approved'),
        ('REJECTED','Rejected'),
    )
    status = models.CharField(max_length=8, choices=STATUS, default='PENDING')
    auto_approve_inquiry = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    image = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    headline = models.CharField(max_length=255,null=True, blank=True)  
    summary = models.TextField(blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True, blank=True, related_name='country')
    industry = models.ForeignKey(Industry, on_delete=models.CASCADE, null=True, blank=True)
    website = models.URLField(blank=True, null=True)
    skill = models.ManyToManyField(Skill)
    language = models.ManyToManyField(Language) 
    available_to = models.ManyToManyField(AvailableTo)
    phone = models.CharField(max_length=20, blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.user.first_name 
    @property
    def first_name(self):
        return self.user.first_name
    
    @property
    def last_name(self):
        return self.user.last_name
    
    
    

class Experience(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='experiences')
    title = models.CharField(max_length=255,null=True, blank=True)
    company = models.CharField(max_length=255,null=True, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True) 
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} at {self.company}"

class Education(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='education')
    school = models.CharField(max_length=255, blank=True, null=True)
    degree = models.CharField(max_length=255, blank=True, null=True)
    field_of_study = models.CharField(max_length=255, blank=True, null=True)
    start_year = models.IntegerField(blank=True, null=True)
    end_year = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.degree} at {self.school}"

class Certificates(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='certificates')
    name = models.CharField(max_length=255)
    issuing_organization = models.CharField(max_length=255)
    issue_date = models.DateField()
    
    def __str__(self):
        return self.name

class Project(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    tag = models.ManyToManyField(Skill)
    image = models.ImageField(upload_to='project/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return self.title

class Publication(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='publication')
    title = models.CharField(max_length=200, null=True, blank=True )

    def __str__(self):
        return self.title  

class Client(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE,related_name='client')
    name = models.CharField(max_length=80, null=True, blank=True )
    client = models.ImageField(upload_to='client/', blank=True, null=True)

    def __str__(self):
        return self.name   
    
    

class Enquiry(models.Model):
    STATUS = (
        ('PENDING','Pending'),
        ('APPROVED','Approved'),
        ('REJECTED','Rejected'),
    )
    status = models.CharField(max_length=8, choices=STATUS, default='PENDING')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='enquiry')
    full_name = models.CharField(max_length=80)
    email = models.EmailField(max_length=250)
    mobile = models.IntegerField(null=True)
    message = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)
    updated_by =models.ForeignKey(User, on_delete=models.CASCADE, related_name='enquiry_updated_by_user',null=True, blank=True) 
    
    def __str__(self):
        return self.full_name   