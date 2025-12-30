from django.db import models
from django.contrib.auth.models import User
from django_ckeditor_5.fields import CKEditor5Field
from django.db.models import Q
from django.db.models.functions import Lower
from django.core.exceptions import ValidationError

class CompanyCategory(models.Model):
    title = models.CharField(max_length=80, null=True, blank=True )
    
    def __str__(self):
        return self.title   
    

class AssociatedCompany(models.Model):
    category = models.ManyToManyField(CompanyCategory,blank=True, related_name='company_category')
    name = models.CharField(max_length=100, null=True, blank=True)
    logo = models.ImageField(upload_to='logo/', blank=True, null=True)

    def __str__(self):
        return self.name   
    
    def clean(self):
        nm = (self.name or "").strip()
        if not nm:
            raise ValidationError({"name": "Company name is required."})
        qs = AssociatedCompany.objects.filter(name__iexact=nm)
        if self.pk:
            qs = qs.exclude(pk=self.pk)
        if qs.exists():
            raise ValidationError({"name": "This company already exists. Edit the existing company and add categories there."})
        
        self.name = nm
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    # @property
    # def is_featured(self):
    #     return self.company.is_featured


class Testimonial(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    position = models.CharField(max_length=100,null=True, blank=True)
    company = models.CharField(max_length=100,null=True, blank=True)
    message = models.TextField()
    rating = models.IntegerField(default=0, choices=[(i, str(i)) for i in range(1,6)])
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='testimonial', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name   

class InsightsCategory(models.Model):
    title = models.CharField(max_length=100, null=True,blank=True)

    def __str__(self):
        return self.title   

class Insights(models.Model):
    title = models.CharField(max_length=100, null=True,blank=True)
    category = models.ForeignKey(InsightsCategory, on_delete=models.CASCADE, related_name='insight')
    text = CKEditor5Field('Text', config_name='extends')
    embed = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='insight_created_by_user',null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='insight_updated_by_user', null=True, blank=True)
    featured_image = models.ImageField(upload_to='featured_image/', blank=True, null=True)

    def __str__(self):
        return self.title   
    
class Faq(models.Model):
    question = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='faq_created_by_user', null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='faq_updated_by_user', null=True, blank=True)

    def __str__(self):
        return self.question   


