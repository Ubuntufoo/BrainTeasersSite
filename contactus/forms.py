from django import forms


class ContactUsForm(forms.Form):
    first_name = forms.CharField(
        widget=forms.TextInput(attrs={'autofocus': True})
    )
    last_name = forms.CharField()
    email = forms.EmailField()
    comment = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 5, "cols": 50}))
