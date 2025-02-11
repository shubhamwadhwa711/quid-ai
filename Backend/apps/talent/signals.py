from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.core.mail import send_mail
from .models import Profile, Enquiry


@receiver(post_save, sender= Profile)
def profile_approve(sender, instance, created, **kwargs):
    if instance.status == "APPROVED":
        subject = "Congratulations " + instance.user.first_name + " your profile has been Approved"
        message = "Congratulations " + instance.user.first_name + " your profile has been Approved. You are now ready to fly!"
        sender_email = settings.DEFAULT_FROM_EMAIL
        recipient_email = [instance.user.email]
        
        # Send email and check the response
        email_sent = send_mail(subject, message, sender_email, recipient_email)
        if email_sent:
            print(f"Email successfuly sent to {instance.user.email}")
        else:
            print(f"Failed to send email to {instance.user.email}")    


@receiver(post_save, sender=Enquiry)
def send_approval_email(sender, instance, **kwargs):
    if instance.status == "APPROVED":  
        
        subject = "Your Enquiry Has Been Approved"
        message = "Hello, your enquiry has been approved!"
        sender_email = settings.DEFAULT_FROM_EMAIL
        recipient_email = [instance.email]

        # Send email and check the response
        email_sent = send_mail(subject, message, sender_email, recipient_email, fail_silently=False)

        if email_sent:
            print(f" Email successfully sent to {instance.email}")
        else:
            print(f" Failed to send email to {instance.email}")

       
























            
