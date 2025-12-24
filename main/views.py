from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from django.core.cache import cache
from django.core.cache.utils import make_template_fragment_key
from django.views.decorators.cache import cache_page
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .models import Blog, Category, ContactMessage
from .forms import ContactForm

@cache_page(60 * 15)  # Cache for 15 minutes
def home(request):
    """
    View for the home page.
    Fetches only the 'selected' blog posts to display.
    Uses template fragment caching for performance.
    """
    # Cache the selected blogs query for 15 minutes
    cache_key = 'home_selected_blogs'
    selected_blogs = cache.get(cache_key)
    if selected_blogs is None:
        selected_blogs = list(Blog.objects.filter(is_selected=True).order_by('-date')[:6])  # Limit to 6 for home page
        cache.set(cache_key, selected_blogs, 60 * 15)  # Cache for 15 minutes

    context = {
        'posts': selected_blogs
    }
    return render(request, 'index.html', context)

def blog_list(request):
    """
    View for the blog list page.
    Handles a deep search functionality based on the 'q' GET parameter.
    Uses caching for improved performance.
    """
    query = request.GET.get('q')

    if query:
        # For search queries, don't cache to ensure fresh results
        blogs = Blog.objects.filter(
            Q(title_en__icontains=query) |
            Q(title_fa__icontains=query) |
            Q(subtitle_en__icontains=query) |
            Q(subtitle_fa__icontains=query) |
            Q(description_en__icontains=query) |
            Q(description_fa__icontains=query) |
            Q(category__name_en__icontains=query) |
            Q(category__name_fa__icontains=query) |
            Q(creator_name__icontains=query)
        ).distinct().order_by('-date')
    else:
        # Cache all blogs for the main listing (no search query)
        cache_key = 'blog_list_all_blogs'
        blogs = cache.get(cache_key)
        if blogs is None:
            blogs = list(Blog.objects.all().order_by('-date'))
            cache.set(cache_key, blogs, 60 * 10)  # Cache for 10 minutes

    context = {
        'posts': blogs,
        'search_query': query,
    }
    return render(request, 'blog_list.html', context)

def blog_detail(request, slug):
    """
    View for a single blog post detail page.
    Fetches a specific blog post by its unique slug.
    """
    post = get_object_or_404(Blog, slug=slug)
    context = {
        'post': post,
    }
    return render(request, 'blog_detail.html', context)

def contact(request):
    """
    View for the contact page.
    Handles both displaying the form (GET) and processing form submissions (POST).
    Sends email notification on successful submission.
    """
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Save the message
            message = form.save()

            # Send email notification asynchronously
            send_contact_notification_email(message)

            # Redirect to the same page to clear the form after successful submission
            return redirect('contact')
    else:
        form = ContactForm()

    context = {
        'form': form
    }
    return render(request, 'contact.html', context)


def send_contact_notification_email(message):
    """
    Send email notification for new contact form submission.
    """
    try:
        subject = f'Lunotech Contact Form: {message.subject}'
        context = {
            'message': message,
            'site_name': 'Lunotech'
        }

        # Render HTML email template
        html_message = render_to_string('emails/contact_notification.html', context)
        plain_message = strip_tags(html_message)

        # Send email
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=None,  # Uses DEFAULT_FROM_EMAIL from settings
            recipient_list=[message.email],  # Send to the person who submitted
            html_message=html_message,
            fail_silently=True
        )

        # Also send notification to admin
        admin_subject = f'New Contact Form Submission: {message.subject}'
        admin_context = {
            'message': message,
            'admin_notification': True,
            'site_name': 'Lunotech'
        }

        admin_html = render_to_string('emails/contact_notification.html', admin_context)
        admin_plain = strip_tags(admin_html)

        from django.conf import settings
        send_mail(
            subject=admin_subject,
            message=admin_plain,
            from_email=None,
            recipient_list=[settings.ADMIN_EMAIL],
            html_message=admin_html,
            fail_silently=True
        )

    except Exception as e:
        # Log the error but don't break the form submission
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Failed to send contact notification email: {str(e)}")