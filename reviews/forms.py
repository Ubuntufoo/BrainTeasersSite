from django import forms
from .models import UserReviews


class UserReviewForm(forms.Form):

    rating = forms.IntegerField()
    comment = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 5, "cols": 50}))
