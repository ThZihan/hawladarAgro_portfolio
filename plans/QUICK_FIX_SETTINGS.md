# Quick Fix: Corrupted settings_prod.py File

## Problem
The `settings_prod.py` file on the server is corrupted and blocking Django from running.

## Solution Options

### Option 1: Restore from Git (Fastest)

```bash
# Navigate to project directory
cd ~/hawladaragro.farm

# Restore the file from git
git checkout HEAD -- hawladar_agro/settings_prod.py

# Verify the file is restored
cat hawladar_agro/settings_prod.py
```

### Option 2: Recreate the File Manually

If git restore doesn't work, recreate the file:

```bash
# Navigate to project directory
cd ~/hawladaragro.farm

# Create new settings_prod.py
cat > hawladar_agro/settings_prod.py << 'EOF'
"""
Production settings for hawladar_agro project.
"""
from .settings import *
import os

DEBUG = False

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['hawladaragro.farm', 'www.hawladaragro.farm'])

# PostgreSQL database for production
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME', default='hawladaragro_db'),
        'USER': env('DB_USER', default='hawladaragro_user'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST', default='localhost'),
        'PORT': env('DB_PORT', default='5432'),
    }
}

# Static files configuration for production
STATIC_ROOT = BASE_DIR / 'public_html' / 'static'

# Media files configuration for production
MEDIA_ROOT = BASE_DIR / 'public_html' / 'media'

# Security settings
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# SSL/HTTPS
SECURE_SSL_REDIRECT = True

# Email configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = env('EMAIL_PORT', default=587)
EMAIL_USE_TLS = True
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default='noreply@hawladaragro.farm')

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs' / 'django.log',
            'formatter': 'verbose',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'WARNING',
            'propagate': True,
        },
        'portfolio': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

# Create logs directory if it doesn't exist
os.makedirs(BASE_DIR / 'logs', exist_ok=True)
EOF

# Verify the file was created
cat hawladar_agro/settings_prod.py
```

### Option 3: Use Nano Editor

```bash
# Navigate to project directory
cd ~/hawladaragro.farm

# Open file in nano
nano hawladar_agro/settings_prod.py

# Paste the content from Option 2 above
# Save: Ctrl+O, Enter
# Exit: Ctrl+X
```

## Verification

After fixing the file, verify it works:

```bash
# Activate virtual environment
source venv/bin/activate

# Test Django can load the settings
python manage.py check --settings=hawladar_agro.settings_prod
```

If you see "System check identified no issues", the file is fixed!

## Next Steps

After fixing `settings_prod.py`:

1. **Configure .env file:**
   ```bash
   cp .env.example .env
   nano .env
   ```

2. **Run migrations:**
   ```bash
   source venv/bin/activate
   python manage.py migrate --settings=hawladar_agro.settings_prod
   ```

3. **Collect static files:**
   ```bash
   source venv/bin/activate
   python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput
   ```

4. **Restart Python app in cPanel**

## Troubleshooting

### Error: "ImportError: cannot import name 'env' from 'hawladar_agro.settings'"

This means the base `settings.py` file is also corrupted. Restore it:

```bash
git checkout HEAD -- hawladar_agro/settings.py
```

### Error: "ModuleNotFoundError: No module named 'django-environ'"

Install missing dependency:

```bash
source venv/bin/activate
pip install django-environ==0.11.2
```

### Error: "SyntaxError: invalid syntax"

The file has syntax errors. Use Option 2 above to recreate it completely.

---

## Quick Reference: Database Credentials

From the deployment, use these values in `.env`:

```env
DB_NAME=kalobira_hawladaragro_db
DB_USER=kalobira_hawladaragro_user
DB_PASSWORD=Zerin4321*
DB_HOST=localhost
DB_PORT=5432
```

## Quick Reference: Allowed Hosts

```env
ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm
```

---

**Note:** This guide assumes you have SSH access to the server. If you only have cPanel access, use the File Manager to edit/create the file.
