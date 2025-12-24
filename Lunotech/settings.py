import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url
from django.core.exceptions import ImproperlyConfigured

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env file for local development
load_dotenv(os.path.join(BASE_DIR, '.env'))


# --- SECURITY SETTINGS ---
def get_env_variable(var_name, default=None):
    """Get environment variable or raise ImproperlyConfigured in production."""
    value = os.getenv(var_name, default)
    if not os.getenv('DEBUG', 'False').lower() in ('true', '1', 'yes') and value is None:
        raise ImproperlyConfigured(f"Required environment variable '{var_name}' is not set in production.")
    return value

SECRET_KEY = get_env_variable('SECRET_KEY')

DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 'yes')


# --- HOSTS AND DOMAINS ---
ALLOWED_HOSTS = []

# Automatically add Render's external hostname
RENDER_EXTERNAL_HOSTNAME = os.getenv('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

if DEBUG:
    ALLOWED_HOSTS.extend(['localhost', '127.0.0.1', '127.0.0.1:8000'])
else:
    # Replace with your actual domain or use the Render URL
    ALLOWED_HOSTS.append('www.lunotech.ir')
    # Required for Django security on Render
    CSRF_TRUSTED_ORIGINS = ['https://*.onrender.com', 'https://www.lunotech.ir']


# --- PRODUCTION SECURITY ENFORCEMENT ---
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'


# --- APPLICATION DEFINITION ---
INSTALLED_APPS = [
    'whitenoise.runserver_nostatic', # Must be first
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main',
    'tinymce',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # For static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Lunotech.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Lunotech.wsgi.application'


# --- DATABASE ---
# Render provides the DATABASE_URL environment variable automatically.
DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///db.sqlite3',
        conn_max_age=600
    )
}


# --- INTERNATIONALIZATION ---
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# --- STATIC FILES ---
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
# Serve compressed/cached static files via Whitenoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# --- MEDIA FILES ---
# Using standard Render filesystem (Note: Requires a Persistent Disk on Render)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# --- CACHE ---
REDIS_URL = os.getenv('REDIS_URL')
if not DEBUG and REDIS_URL:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.redis.RedisCache',
            'LOCATION': REDIS_URL,
        }
    }
else:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
            'LOCATION': 'unique-snowflake',
        }
    }


# --- EMAIL ---
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True').lower() == 'true'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', 'noreply@lunotech.ir')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'