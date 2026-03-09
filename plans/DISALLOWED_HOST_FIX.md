# Fix DisallowedHost Error

## Error Message

```
ERROR 2026-03-10 02:39:03,952 exception Invalid HTTP_HOST header: 'cpcontacts.priyohaatbd.com'. You may need to add 'cpcontacts.priyohaatbd.com' to ALLOWED_HOSTS.
```

## Root Cause

The `.env` file has incorrect `ALLOWED_HOSTS` value. It contains `cpcontacts.priyohaatbd.com` instead of `hawladaragro.farm,www.hawladaragro.farm`.

## Solution: Fix .env File

### Step 1: Edit .env File

```bash
cd ~/hawladeragro.farm
nano .env
```

### Step 2: Update ALLOWED_HOSTS

Find the line with `ALLOWED_HOSTS` and replace it with:

```env
ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm
```

**Complete .env file should look like:**

```env
SECRET_KEY=<your-secret-key-here>
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

**Save:** `Ctrl+O`, `Enter`, `Ctrl+X`

### Step 3: Test Django Development Server

```bash
cd ~/hawladeragro.farm
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
python manage.py runserver 0.0.0.0:8000 --settings=hawladar_agro.settings_prod
```

**Expected output:** Server should start without errors.

### Step 4: Test Production Deployment

After fixing `.env` file, restart the cPanel application and visit `https://hawladaragro.farm`.

---

## Troubleshooting

### Error: "Port is already in use"

This means another process is using port 8000. Kill it:

```bash
# Find and kill process
lsof -i:8000
# Kill the process
kill -9 <PID>
```

### Error: "ModuleNotFoundError: No module named 'django'"

Activate virtual environment:
```bash
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
```

### Error: "ModuleNotFoundError: No module named 'environ'"

Install django-environ:
```bash
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
pip install django-environ==0.11.2
```

---

## Quick Reference

1. Edit `.env` file: `nano .env`
2. Update `ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm`
3. Save: `Ctrl+O`, `Enter`, `Ctrl+X`
4. Test development server: `python manage.py runserver 0.0.0.0:8000 --settings=hawladar_agro.settings_prod`
5. Restart cPanel application
6. Test production: `https://hawladaragro.farm`

---

**Last Updated:** 2026-03-10
**Status:** Fix for DisallowedHost error
