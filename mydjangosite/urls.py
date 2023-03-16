from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/doc/', include('django.contrib.admindocs.urls')),
    path('admin/', admin.site.urls),
    path('contact-us/', include('contactus.urls')),
    path('', include("games.urls"))
]
