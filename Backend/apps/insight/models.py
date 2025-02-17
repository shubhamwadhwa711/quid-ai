from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
# Create your models here.



class CompanyCategory(models.Model):
    title = models.CharField(max_length=80, null=True, blank=True )

    def __str__(self):
        return self.title   



class AssociatedCompany(models.Model):
    category = models.ForeignKey(CompanyCategory, on_delete=models.CASCADE, related_name='company_category')
    name = models.CharField(max_length=100, null=True, blank=True)
    logo = models.ImageField(upload_to='logo/', blank=True, null=True)

    def __str__(self):
        return self.name   


class Testimonial(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    position = models.CharField(max_length=100,null=True, blank=True)
    company = models.CharField(max_length=100,null=True, blank=True)
    message = models.TextField()
    rating = models.IntegerField(default=0, choices=[(i, str(i)) for i in range(1,6)])
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='testimonial')
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
    content = RichTextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='insight_created_by_user')
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='insight_updated_by_user')

    def __str__(self):
        return self.title   
    

class Faq(models.Model):
    insight = models.ForeignKey(Insights, on_delete=models.CASCADE, related_name='faq') 
    question = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='faq_created_by_user')
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='faq_updated_by_user')

    def __str__(self):
        return self.question   


