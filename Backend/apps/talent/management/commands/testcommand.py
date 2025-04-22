from django.core.management.base import BaseCommand, CommandError
import csv
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Displays stats related to Article and Comment models'
    def handle(self, *args, **options):
        with open('data.csv', 'r') as csv_file:
            csv_reader = csv.reader(csv_file)
            next(csv_reader)

            for row in csv_reader:
                
               
                user, created = User.objects.get_or_create(username=row[0],first_name=row[1], last_name=row[2], email=row[3])
                if created:
                   print("New user created:", user)
                else:
                   print("User already exists:", user)  
                

                
        