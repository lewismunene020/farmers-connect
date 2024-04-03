"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.1.9.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import  pymysql 
import  os
import  dj_database_url
from datetime import timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-h@(z!f!&5f%cddi#e!jp#8b3yc@qp!w3g#5u6j69-fgf*jt@_3'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG =  os.environ.get("DEBUG") != "False"

# ALLOWED_HOSTS = [
#     "localhost",
#     "0.0.0.0",
#     "127.0.0.1"
# ]
ALLOWED_HOSTS = ["*"]

CSRF_TRUSTED_ORIGINS = [
     "http://localhost:5173",
     "http://127.0.0.1:5173",
     "https://67d8-41-204-187-5.ngrok-free.app",
]



CORS_ALLOWED_ORIGINS = [
     "http://localhost:5173",
     "http://127.0.0.1:5173",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # 'api.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=888965),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=767945),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": True,
    "TOKEN_USER_CLASS": "accounts.models.User",

}


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework' ,
    "backend",
    "accounts",
    "api",
    "orders",
    "farms",
    "bids",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware' ,
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'
AUTH_USER_MODEL = "accounts.User"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'farmers_connect',
#         'USER': 'ancentus',
#         'PASSWORD': 'password',
#         'HOST': 'localhost',  # Or the IP address of your MySQL server
#         'PORT': '3306',       # MySQL default port
#     }
# }


database_url = dj_database_url.config(
    default=os.environ.get('DATABASE_URL') if os.environ.get("DATABASE_URL") else "sqlite:///db.sqlite3"
)

DATABASES = {
    'default': database_url
}




pymysql.version_info = (1, 4, 3, "final", 0)
# pymysql.version_info = (1, 0, 2, "final", 0)

pymysql.install_as_MySQLdb()



# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
      'formatters': {
        'verbose': {
            'format': '%(asctime)s %(levelname)s %(message)s module:%(module)s process:%(process)d',
        } ,
        'simple': {
            'format': '%(levelname)s %(message)s'
        } ,
    } ,
    'handlers': {
        'console' :{
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter' : 'verbose' ,

        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
    'loggers': {

    },

}