from celery import shared_task
from django.core.mail import send_mail


@shared_task(bind=True, max_retries=3)
def send_mail_talent(self, subject, message, sender_email, recipient_email ):
    send_mail(
            subject= subject,
            message=message,
            from_email=sender_email,
            recipient_list= recipient_email,
            fail_silently=False,
        )
    return "Done"


@shared_task(bind=True, max_retries=3)
def send_mail_enq(self, subject, message, sender_email, recipient_email ):
    send_mail(
            subject= subject,
            message=message,
            from_email=sender_email,
            recipient_list= recipient_email,
            fail_silently=False,
        )
    return "Done"