from django.apps import AppConfig


class TalentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.talent'

    def ready(self):
         import apps.talent.signals