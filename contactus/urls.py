from django.urls import path

from .views import ContactUsView, ContactUsThanksView

app_name = 'contactus'
urlpatterns = [
    path('contact-form/', ContactUsView.as_view(), name='form'),
    path('contact-form/thanks/', ContactUsThanksView.as_view(), name='thanks'),
]
