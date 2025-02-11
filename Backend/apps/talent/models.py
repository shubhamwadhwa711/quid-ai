from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Skill(models.Model):
    name = models.CharField(max_length=255)
    

    def __str__(self):
        return self.name



class Profile(models.Model):
    STATUS = (
        ('PENDING','Pending'),
        ('APPROVED','Approved'),
        ('REJECTED','Rejected'),
    )
    status = models.CharField(max_length=8, choices=STATUS, default='PENDING')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    image = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    headline = models.CharField(max_length=255)  
    summary = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    industry = models.CharField(max_length=255, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    skill = models.ManyToManyField(Skill)
    
    # Contact Info
    phone = models.CharField(max_length=20, blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)

    
    def __str__(self):
        return self.user.username

class Experience(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='experiences')
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)  # Null for current jobs
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} at {self.company}"

class Education(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='education')
    school = models.CharField(max_length=255)
    degree = models.CharField(max_length=255, blank=True, null=True)
    field_of_study = models.CharField(max_length=255, blank=True, null=True)
    start_year = models.IntegerField()
    end_year = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.degree} at {self.school}"





class Certification(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='certifications')
    name = models.CharField(max_length=255)
    issuing_organization = models.CharField(max_length=255)
    issue_date = models.DateField()
    expiration_date = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class Project(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.title



class Enquiry(models.Model):
    STATUS = (
        ('PENDING','Pending'),
        ('APPROVED','Approved'),
        ('REJECTED','Rejected'),
    )
    status = models.CharField(max_length=8, choices=STATUS, default='PENDING')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    email = models.EmailField(max_length=250)
    mobile = models.IntegerField(null=True)
    message = models.TextField() 

    def __str__(self):
        return self.name   