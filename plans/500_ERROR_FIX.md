# Fix 500 Internal Server Error

## Error

When visiting `https://hawladaragro.farm`, you see:
```
500 Internal Server Error
```

## Root Cause

The dependencies are installed and Django system check passed, but Passenger WSGI is not properly serving the Django application.

## Solution: Check Passenger Logs

### Step 1: View Passenger Error Logs

```bash
tail -f ~/hawladeragro.farm/logs/passenger_error.log
```

Look for specific error messages like:
- `ModuleNotFoundError: No module named 'django'`
- `ModuleNotFoundError: No module named 'environ'`
- `django.db.utils.OperationalError: FATAL: password authentication failed`
- `DisallowedHost at / Invalid HTTP_HOST header`
- Any other Python/Django errors

### Step 2: View Passenger Application Logs

```bash
tail -f ~/hawladeragro.farm/logs/passenger.log
```

## Common Issues and Fixes

### Issue 1: ModuleNotFoundError: No module named 'django'

**Cause:** Django not installed in cPanel's virtual environment

**Fix:**
```bash
cd ~/hawladeragro.farm
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
pip install Django==4.2.11
```

### Issue 2: ModuleNotFoundError: No module named 'environ'

**Cause:** django-environ not installed in cPanel's virtual environment

**Fix:**
```bash
cd ~/hawladeragro.farm
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
pip install django-environ==0.11.2
```

### Issue 3: Database Connection Error

**Cause:** Incorrect database credentials in `.env` file

**Fix:** Check `.env` file has correct values:
```env
DB_NAME=kalobira_hawladaragro_db
DB_USER=kalobira_hawladaragro_user
DB_PASSWORD=Zerin4321*
DB_HOST=localhost
DB_PORT=5432
```

### Issue 4: DisallowedHost Error

**Cause:** Incorrect `ALLOWED_HOSTS` in `.env` file

**Fix:** Check `.env` file has:
```env
ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm
```

### Issue 5: passenger_wsgi.py Not Found

**Cause:** passenger_wsgi.py file missing or incorrect

**Fix:** Verify file exists and has correct content:
```bash
cd ~/hawladeragro.farm
cat passenger_wsgi.py
```

Should contain:
```python
import os
import sys

project_path = '/home/kalobira/hawladeragro.farm'

if project_path not in sys.path:
    sys.path.insert(0, project_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hawladar_agro.settings_prod')

import django
from django.core.wsgi import get_wsgi_application

django.setup()

application = get_wsgi_application()
```

### Issue 6: .env File Not Found

**Cause:** Django can't find `.env` file

**Fix:** Create `.env` file with production values:
```bash
cd ~/hawladeragro.farm
nano .env
```

Add content:
```env
SECRET_KEY=<your-secret-key>
DEBUG=False
ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm
DB_NAME=kalobira_hawladaragro_db
DB_USER=kalobira_hawladaragro_user
DB_PASSWORD=Zerin4321*
DB_HOST=localhost
DB_PORT=5432
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-email-password-here
DEFAULT_FROM_EMAIL=noreply@hawladaragro.farm
```

## Quick Troubleshooting Steps

### Step 1: Check Logs

```bash
# Check Passenger error logs
tail -50 ~/hawladeragro.farm/logs/passenger_error.log

# Check Passenger application logs
tail -50 ~/hawladeragro.farm/logs/passenger.log
```

### Step 2: Test Django Directly

```bash
cd ~/hawladeragro.farm
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
python manage.py runserver 0.0.0.0:8000 --settings=hawladar_agro.settings_prod
```

Then visit: `http://your-server-ip:8000`

If this works, Django is configured correctly and the issue is with Passenger.

### Step 3: Restart Application in cPanel

1. In cPanel, go to **Setup Python App**
2. Find **hawladaragro.farm** application
3. Click **Restart** button

### Step 4: Check File Permissions

```bash
cd ~/hawladeragro.farm
ls -la
```

Ensure `.env` file has correct permissions (not readable by others):
```bash
chmod 600 .env
```

## Alternative: Use Django's Development Server

If Passenger continues to have issues, you can temporarily use Django's development server:

```bash
cd ~/hawladeragro.farm
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
python manage.py runserver 0.0.0.0:8000 --settings=hawladar_agro.settings_prod
```

Then access via: `http://your-server-ip:8000`

**Note:** This is for testing only. For production, Passenger must be configured correctly.

---

## Quick Reference

1. Check Passenger error logs: `tail -f ~/hawladeragro.farm/logs/passenger_error.log`
2. Check Passenger app logs: `tail -f ~/hawladeragro.farm/logs/passenger.log`
3. Test Django directly: `python manage.py runserver 0.0.0.0:8000`
4. Restart application in cPanel
5. Check file permissions: `chmod 600 .env`

---

**Last Updated:** 2026-03-09
**Status:** Fix for 500 Internal Server Error
