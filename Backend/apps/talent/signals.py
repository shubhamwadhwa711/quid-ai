from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Profile, Enquiry
from .tasks import send_mail_enq , send_mail_talent


@receiver(post_save, sender= Profile)
def profile_approve(sender, instance, created, **kwargs):
    if instance.status == "APPROVED":
        subject = "Congratulations " + instance.user.first_name + " your profile has been Approved"
        message = "Congratulations " + instance.user.first_name + " your profile has been Approved. You are now ready to fly!"
        sender_email = settings.DEFAULT_FROM_EMAIL
        recipient_email = [instance.user.email]
        
        send_mail_talent.delay(subject, message, sender_email, recipient_email)     

@receiver(post_save, sender=Enquiry)
def send_approval_email(sender, instance, **kwargs):
    if instance.status == "APPROVED":  
        subject = "Your Enquiry Has Been Approved"
        message = "Hello, your enquiry has been approved!"
        sender_email = settings.DEFAULT_FROM_EMAIL
        recipient_email = [instance.email]
        
        send_mail_enq.delay(subject, message, sender_email, recipient_email)    


 
       
























            
