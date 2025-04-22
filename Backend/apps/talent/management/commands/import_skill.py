from django.core.management.base import BaseCommand, CommandError
import csv
from apps.talent.models import Skill

class Command(BaseCommand):
    help = 'Displays stats related to Article and Comment models'
    path = 'apps/talent/data/skill.csv'
    def handle(self, *args, **options):

        with open(self.path, 'r') as csv_file:
            csv_reader = csv.reader(csv_file)
            next(csv_reader)

            for row in csv_reader:
                
                
                skill, created = Skill.objects.get_or_create(name=row[0])
                if created:
                   print("New user created:", skill)
                else:
                   print("User already exists:", skill)  
                

                
        