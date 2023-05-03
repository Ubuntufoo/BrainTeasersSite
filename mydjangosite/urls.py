from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    # Admin
    path('admin/doc/', include('django.contrib.admindocs.urls')),
    path('admin/', admin.site.urls),

    # User Management
    path('account/', include('users.urls')),
    path('account/', include('allauth.urls')),

    # Local Apps
    path('contact-us/', include('contactus.urls')),
    path('', include("games.urls")),
]
