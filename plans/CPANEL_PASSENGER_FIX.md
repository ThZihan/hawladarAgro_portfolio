# Fix Passenger WSGI Issue - Directory Listing Instead of Django App

## Problem

When visiting `https://hawladaragro.farm`, you see a directory listing instead of the Django application. This means Passenger WSGI is not running the Django app properly.

## Root Cause

You installed dependencies using `--user` flag, which installs them to:
```
/home/kalobira/.local/lib/python3.9/site-packages/
```

But cPanel's Python app uses its own virtual environment at:
```
/home/kalobira/virtualenv/hawladeragro.farm/3.9/
```

The dependencies are not available in cPanel's virtual environment.

## Solution

### Step 1: Install Dependencies in cPanel's Virtual Environment

1. In cPanel, go to **Setup Python App**
2. Find your **hawladaragro.farm** application
3. Click the **Configure** button (or gear icon)
4. Scroll down to **"Run Pip Install"** section
5. Enter the following packages one by one:

```
Django==4.2.11
django-environ==0.11.2
djangorestframework==3.14.0
psycopg2-binary==2.9.9
Pillow==10.2.0
gunicorn==21.2.0
whitenoise==6.6.0
django-cors-headers==4.3.1
django-anymail==10.2
```

6. Click **Run Pip Install** for each package
7. Wait for each installation to complete

### Step 2: Restart Application

After installing all packages:
1. Click the **Restart** button
2. Wait for application to restart

### Step 3: Check Passenger Logs

If the site still doesn't work, check the logs:

1. In cPanel Python App page, scroll down to **Logs** section
2. Click on **passenger.log** or **passenger_error.log**
3. Look for error messages

### Step 4: Alternative - Check passenger_wsgi.py

If the above doesn't work, verify the passenger_wsgi.py file is correct:

```bash
cd ~/hawladeragro.farm
cat passenger_wsgi.py
```

It should contain:
```python
import os
import sys

project_path = '/home/kalobira/hawladaragro.farm'

if project_path not in sys.path:
    sys.path.insert(0, project_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hawladar_agro.settings_prod')

import django
from django.core.wsgi import get_wsgi_application

django.setup()

application = get_wsgi_application()
```

### Step 5: Test Again

After installing dependencies and restarting:
1. Visit **https://hawladaragro.farm**
2. You should now see the Django application, not a directory listing

---

## Troubleshooting

### Error: "ModuleNotFoundError: No module named 'django'"

This means Django is not installed in cPanel's virtual environment. Use Step 1 above to install it.

### Error: "ModuleNotFoundError: No module named 'environ'"

This means django-environ is not installed. Use Step 1 above to install it.

### Error: "django.db.utils.OperationalError: FATAL: password authentication failed"

Check `.env` file has correct database credentials:
```env
DB_NAME=kalobira_hawladaragro_db
DB_USER=kalobira_hawladaragro_user
DB_PASSWORD=Zerin4321*
DB_HOST=localhost
DB_PORT=5432
```

### Error: "DisallowedHost at / Invalid HTTP_HOST header"

Check `.env` file has:
```env
ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm
```

---

## Quick Reference

1. Install dependencies in cPanel's virtual environment using "Run Pip Install"
2. Restart application
3. Check logs if issues persist
4. Verify passenger_wsgi.py is correct
5. Test deployment at https://hawladaragro.farm

---

**Last Updated:** 2026-03-09
**Status:** Fix for Passenger WSGI directory listing issue
