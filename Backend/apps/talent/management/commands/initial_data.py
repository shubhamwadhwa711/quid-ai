# myapp/management/commands/load_fixtures.py
from django.core.management.base import BaseCommand
from django.db import transaction
from django.db.models.signals import post_save
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Load fixtures and disable signals'

    def handle(self, *args, **options):
        self.load_fixtures()

    @transaction.atomic
    def load_fixtures(self):

        call_command('loaddata', 'user.json')
        call_command('loaddata', 'skill.json')
        call_command('loaddata', 'language.json')
        call_command('loaddata', 'countries.json')
        call_command('loaddata', 'available_to.json')
        call_command('loaddata', 'industry.json')
        call_command('loaddata', 'profile.json')
        call_command('loaddata', 'certificate.json')
        # call_command('loaddata', 'client.json')
        call_command('loaddata', 'education.json')
        call_command('loaddata', 'experience.json')
        call_command('loaddata', 'publication.json')
        call_command('loaddata', 'project.json')
        call_command('loaddata', 'insight-category.json')
        call_command('loaddata', 'insight.json')
        call_command('loaddata', 'company-category.json')
        call_command('loaddata', 'associate-company.json')
        call_command('loaddata', 'faq.json')
        call_command('loaddata', 'testimonial.json')
        