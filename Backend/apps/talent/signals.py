from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.conf import settings
from .models import Profile, Enquiry
from .tasks import  send_mail_talent


@receiver(post_save, sender= Profile)
def profile_approve( sender, instance, created, **kwargs):
    if instance.status == "APPROVED":
        subject = "Congratulations " + instance.user.first_name + " your profile has been Approved"
        message = "Congratulations " + instance.user.first_name + " your profile has been Approved. You are now ready to fly!"
        sender_email = settings.DEFAULT_FROM_EMAIL
        recipient_email = [instance.user.email]
        
        send_mail_talent.delay(subject, message, sender_email, recipient_email)     

@receiver(post_save, sender=Enquiry)
def send_approval_email(sender, instance, **kwargs):
    print("Hello")
    if instance.status == "APPROVED": 
        print("Hello") 
        subject = f"Hey {instance.profile.user.first_name}, {instance.full_name} wants to connect you!"
        message = f"Hey {instance.profile.user.first_name},{instance.full_name} wants to connect with you.\n{instance.message}\n Details:\n Full name: {instance.full_name}Email: {instance.email}"
        sender_email =  settings.DEFAULT_FROM_EMAIL
        print(sender_email)
        recipient_email = [instance.profile.user.email]
        print(recipient_email)
        
        send_mail_talent.delay(subject, message, sender_email, recipient_email)    
n

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

 
       
























            
