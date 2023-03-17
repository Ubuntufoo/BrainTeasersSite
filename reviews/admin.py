from django.contrib import admin

from .models import UserReview


@admin.register(UserReview)
class UserReviewAdmin(admin.ModelAdmin):
    model = UserReview
    list_display = ['user', 'rating', 'comment', 'created', 'updated']

    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return ('created', 'updated')

        return ()
