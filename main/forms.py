from django import forms
from .models import ContactMessage

class ContactForm(forms.ModelForm):
    # Honeypot field - hidden from humans but visible to bots
    website = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            'style': 'display: none !important; position: absolute !important; left: -9999px !important;',
            'tabindex': '-1',
            'autocomplete': 'off'
        })
    )

    def clean_website(self):
        """Check if the honeypot field was filled (indicating bot spam)"""
        website = self.cleaned_data.get('website', '')
        if website:  # If this field is filled, it's likely a bot
            raise forms.ValidationError("Spam detected. Please try again.")
        return website

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Your Name',
                'id': 'id_name' # Ensure ID matches your JS/CSS if needed
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'Your Email',
                'id': 'id_email'
            }),
            'subject': forms.TextInput(attrs={
                'placeholder': 'Subject',
                'id': 'id_subject'
            }),
            'message': forms.Textarea(attrs={
                'placeholder': 'Your Message',
                'id': 'id_message'
            }),
        }