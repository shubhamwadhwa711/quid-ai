from rest_framework import serializers
from django.conf import settings
import re
from .models import *


class CompanyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyCategory
        fields = '__all__'

class AssociatedCompanySerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset =CompanyCategory.objects.all())
    class Meta:
        model = AssociatedCompany
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        exclude = ['created_by']     

class InsightsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InsightsCategory
        fields = '__all__'                

class InsightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insights
        exclude = ['updated_at','updated_by','created_by']    

    def to_representation(self, instance):
        
        representation = super().to_representation(instance)
        # Replace relative paths in the 'text' field with absolute URLs
        text = representation.get('text', '')
        if text:
            representation['text'] = self.replace_relative_paths(text)
        return representation

    def replace_relative_paths(self, text):
        """Replaces relative media URLs with absolute URLs in the given text."""
        media_url = settings.MEDIA_URL
        request = self.context.get('request')
        # media_root = settings.MEDIA_ROOT
        if not media_url.startswith('/'):
            media_url = '/' + media_url

        if not media_url.endswith('/'):
            media_url = media_url + '/'

        import re

        def replace(match):
            relative_path = match.group(1)
            # handle cases where the media root is not directly under the media url.
            if relative_path.startswith(media_url[1:]):
                # remove leading slash from media_url for comparison.
                return request.build_absolute_uri(relative_path[len(media_url[1:]):]) # remove media_url from relative path

            else:
                return request.build_absolute_uri(relative_path)

        # Use a regular expression to find relative media URLs
        # Adjust the regex as needed based on your CKEditor 5 output
        text = re.sub(r'(/media/.*?)(?=["\'])', replace, text)
        return text

        
        # def to_representation(self, instance):
        #     data = super().to_representation(instance)

        #     # Convert relative image URLs to absolute URLs
        #     if data.get('text'):
        #         media_url = settings.MEDIA_URL.rstrip('/')
        #         data['text'] = re.sub(
        #             r'src="/media/', f'src="{media_url}/', data['text']
        #         )
        #     return data                   

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = '__all__'                                