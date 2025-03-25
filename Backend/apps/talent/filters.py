import django_filters
from .models import Profile

class ProfileFilter(django_filters.FilterSet):
    expertise = django_filters.CharFilter(field_name="skill__name", lookup_expr='icontains')
    academics = django_filters.CharFilter(field_name="education__degree", lookup_expr='icontains')
    clients = django_filters.CharFilter(field_name="client__name", lookup_expr='icontains') 
    languages = django_filters.CharFilter(field_name="language__name", lookup_expr='icontains')
    available_to = django_filters.CharFilter(field_name="available_to__name", lookup_expr='icontains')
    country = django_filters.CharFilter(field_name="country__name", lookup_expr='icontains')
    

    class Meta:
        model = Profile
        fields = ['expertise', 'academics','clients','languages','available_to', 'country' ]

    