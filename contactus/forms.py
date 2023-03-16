from django import forms


class ContactUsForm(forms.Form):
    first_name = forms.CharField()
    last_name = forms.CharField()
    email = forms.EmailField()
    comment = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 5, "cols": 50}))
