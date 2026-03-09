# Server Deployment Fix Guide

## Current Issues Identified

1. **Virtual Environment Missing** - `venv/bin/activate: No such file or directory`
2. **Missing Dependencies** - `ModuleNotFoundError: No module named 'environ'`
3. **Incorrect .env Configuration** - Still has default values
4. **Wrong Directory Path** - Project is at `/home/kalobira/hawladeragro.farm` (note spelling)

---

## Complete Fix Procedure

### Step 1: Navigate to Project Directory

```bash
cd ~/hawladeragro.farm
```

### Step 2: Create Virtual Environment

```bash
# Remove old venv if it exists
rm -rf venv

# Create new virtual environment with Python 3.9
/usr/bin/python3.9 -m venv venv

# Activate virtual environment
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
# Upgrade pip
pip install --upgrade pip

# Install Django 4.2 (Python 3.9 compatible)
pip install Django==4.2.11

# Install django-environ first (required for settings.py)
pip install django-environ==0.11.2

# Install remaining dependencies
pip install djangorestframework==3.14.0
pip install psycopg2-binary==2.9.9
pip install Pillow==10.2.0

# Install production dependencies
pip install gunicorn==21.2.0
pip install whitenoise==6.6.0
pip install django-cors-headers==4.3.1
pip install django-anymail==10.2
```

### Step 4: Configure .env File

```bash
# Edit .env file
nano .env
```

**Replace entire content with:**

```env
# Django Environment Variables - Production
# IMPORTANT: Never commit .env file to version control!

# ============================================
# SECURITY SETTINGS
# ============================================

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY=django-insecure-#-change-this-to-a-real-secret-key

# DEBUG mode - Set to False in production
DEBUG=False

# ALLOWED_HOSTS - Comma-separated list of allowed hostnames
ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm

# ============================================
# DATABASE CONFIGURATION (PostgreSQL for Production)
# ============================================

# Database Name
DB_NAME=kalobira_hawladaragro_db

# Database User
DB_USER=kalobira_hawladaragro_user

# Database Password
DB_PASSWORD=Zerin4321*

# Database Host (usually localhost for cPanel)
DB_HOST=localhost

# Database Port (default PostgreSQL port)
DB_PORT=5432

# ============================================
# EMAIL CONFIGURATION (Optional)
# ============================================

# Email Backend Host (e.g., smtp.gmail.com)
EMAIL_HOST=smtp.gmail.com

# Email Port (587 for TLS, 465 for SSL)
EMAIL_PORT=587

# Email Host User (your email address)
EMAIL_HOST_USER=your-email@example.com

# Email Host Password (app-specific password recommended)
EMAIL_HOST_PASSWORD=your-email-password-here

# Default From Email
DEFAULT_FROM_EMAIL=noreply@hawladaragro.farm
```

**Save and Exit:** `Ctrl+O`, `Enter`, `Ctrl+X`

### Step 5: Generate New Secret Key

```bash
# Generate a new secret key
python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Copy the output and update SECRET_KEY in .env file:**

```bash
nano .env
```

Replace:
```env
SECRET_KEY=django-insecure-#-change-this-to-a-real-secret-key
```

With:
```env
SECRET_KEY=<paste-the-generated-secret-key-here>
```

**Save and Exit:** `Ctrl+O`, `Enter`, `Ctrl+X`

### Step 6: Run Migrations

```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Run migrations
python manage.py migrate --settings=hawladar_agro.settings_prod
```

### Step 7: Collect Static Files

```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Create static directory if it doesn't exist
mkdir -p public_html/static

# Collect static files
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput
```

### Step 8: Verify Installation

```bash
# Test Django can load the settings
python manage.py check --settings=hawladar_agro.settings_prod
```

You should see: `System check identified no issues (0 silenced).`

### Step 9: Configure cPanel Python Application

1. Log in to cPanel
2. Go to "Setup Python App"
3. Click "Create Application"
4. Configure:
   - **Python Version:** 3.9
   - **Application Root:** `hawladeragro.farm`
   - **Application URL:** `hawladaragro.farm`
   - **Application Entry Point:** `passenger_wsgi.py`
   - **Application Startup File:** `passenger_wsgi.py`
   - **Passenger Log File:** `logs/passenger.log`
   - **Passenger Error Log File:** `logs/passenger_error.log`

5. Click "Create"

6. After creation, click "Restart" to restart the application

### Step 10: Configure WSGI File

```bash
# Check passenger_wsgi.py exists
cat passenger_wsgi.py
```

If it doesn't exist or needs updating:

```bash
nano passenger_wsgi.py
```

**Content should be:**

```python
import os
import sys

# Add project directory to Python path
project_directory = '/home/kalobira/hawladeragro.farm'
if project_directory not in sys.path:
    sys.path.insert(0, project_directory)

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hawladar_agro.settings_prod')

# Import Django and get WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

**Save and Exit:** `Ctrl+O`, `Enter`, `Ctrl+X`

### Step 11: Configure Domain Document Root

1. In cPanel, go to "Domains"
2. Find `hawladaragro.farm`
3. Click "Manage"
4. Set document root to: `hawladeragro.farm/public_html`
5. Click "Save"

### Step 12: Configure SSL Certificate

1. In cPanel, go to "SSL/TLS Status"
2. Find `hawladaragro.farm`
3. Click "Run AutoSSL"
4. Wait for certificate to be issued

### Step 13: Restart Application

In cPanel "Setup Python App", click "Restart"

### Step 14: Test Deployment

1. Visit `https://hawladaragro.farm`
2. Check if site loads correctly
3. Test all pages

---

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'environ'"

**Solution:**
```bash
source venv/bin/activate
pip install django-environ==0.11.2
```

### Issue: "django.db.utils.OperationalError: FATAL: password authentication failed"

**Solution:**
1. Check `.env` file has correct database password
2. Verify database credentials in cPanel > PostgreSQL Databases
3. Update `.env` if needed

### Issue: "DisallowedHost at / Invalid HTTP_HOST header"

**Solution:**
1. Check `.env` file has correct `ALLOWED_HOSTS`
2. Ensure domain is included: `hawladaragro.farm,www.hawladaragro.farm`
3. Restart Python application in cPanel

### Issue: Static files not loading

**Solution:**
```bash
source venv/bin/activate
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput
```

### Issue: "Permission denied" when creating logs directory

**Solution:**
```bash
cd ~/hawladeragro.farm
mkdir -p logs
chmod 755 logs
```

---

## Quick Reference: All Commands in Order

```bash
# Navigate to project
cd ~/hawladeragro.farm

# Create virtual environment
rm -rf venv
/usr/bin/python3.9 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install Django==4.2.11
pip install django-environ==0.11.2
pip install djangorestframework==3.14.0
pip install psycopg2-binary==2.9.9
pip install Pillow==10.2.0
pip install gunicorn==21.2.0
pip install whitenoise==6.6.0
pip install django-cors-headers==4.3.1
pip install django-anymail==10.2

# Configure .env (see Step 4 above)
nano .env

# Generate secret key
python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# Update .env with new secret key
nano .env

# Run migrations
python manage.py migrate --settings=hawladar_agro.settings_prod

# Collect static files
mkdir -p public_html/static
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput

# Verify
python manage.py check --settings=hawladar_agro.settings_prod
```

---

## Database Credentials (Reference)

```env
DB_NAME=kalobira_hawladaragro_db
DB_USER=kalobira_hawladaragro_user
DB_PASSWORD=Zerin4321*
DB_HOST=localhost
DB_PORT=5432
```

---

**Last Updated:** 2026-03-09
**Status:** Ready for deployment
