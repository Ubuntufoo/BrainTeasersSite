import html
from django.urls import reverse_lazy
from django.views.generic import FormView, TemplateView

from common.utils.email import send_email
from .forms import ContactUsForm


class ContactUsView(FormView):
    template_name = 'contactus/contact-us.html'
    form_class = ContactUsForm
    success_url = reverse_lazy('contactus:thanks')

    def form_valid(self, form):
        data = form.cleaned_data
        to = 'timothymurphy123@gmail.com'
        subject = 'User Comment'
        content = f'''<p>Attn: Site Administrator -</p>
            <p>User Comment Received:</p>
            <ol>'''
        for key, value in data.items():
            label = key.replace('_', ' ').title()
            entry = html.escape(str(value), quote=False)
            content += f'<li>{label}: {entry}</li>'

        content += '</ol>'

        send_email(to, subject, content)
        return super().form_valid(form)


class ContactUsThanksView(TemplateView):
    template_name = 'contactus/thanks.html'
