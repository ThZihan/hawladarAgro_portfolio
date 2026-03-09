# Quick Server Commands - Copy & Paste

## Current Issues Found

1. ❌ Virtual environment missing
2. ❌ Missing `django-environ` module
3. ❌ `.env` file has default values (not configured for production)
4. ❌ Wrong directory path (use `~/hawladeragro.farm`)

---

## Fix Commands (Run in Order)

```bash
# 1. Navigate to project directory
cd ~/hawladeragro.farm

# 2. Create virtual environment
rm -rf venv
/usr/bin/python3.9 -m venv venv
source venv/bin/activate

# 3. Install dependencies
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

# 4. Generate secret key (copy the output)
python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**⚠️ STOP HERE - Copy the secret key output above, then continue:**

```bash
# 5. Edit .env file
nano .env
```

**Replace entire content with:**

```env
# Django Environment Variables - Production

SECRET_KEY=<PASTE-YOUR-SECRET-KEY-HERE>
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

```bash
# 6. Run migrations
python manage.py migrate --settings=hawladar_agro.settings_prod

# 7. Collect static files
mkdir -p public_html/static
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput

# 8. Verify installation
python manage.py check --settings=hawladar_agro.settings_prod
```

**Expected output:** `System check identified no issues (0 silenced).`

---

## cPanel Configuration (After Commands Above)

### 1. Setup Python App

1. Log in to cPanel
2. Go to **Setup Python App**
3. Click **Create Application**
4. Configure:
   - Python Version: **3.9**
   - Application Root: **hawladeragro.farm**
   - Application URL: **hawladaragro.farm**
   - Application Entry Point: **passenger_wsgi.py**
   - Application Startup File: **passenger_wsgi.py**
5. Click **Create**
6. Click **Restart**

### 2. Configure Domain

1. Go to **Domains**
2. Find **hawladaragro.farm**
3. Click **Manage**
4. Document Root: **hawladeragro.farm/public_html**
5. Click **Save**

### 3. Configure SSL

1. Go to **SSL/TLS Status**
2. Find **hawladaragro.farm**
3. Click **Run AutoSSL**

---

## Troubleshooting

### Error: "ModuleNotFoundError: No module named 'environ'"

```bash
source venv/bin/activate
pip install django-environ==0.11.2
```

### Error: "DisallowedHost at / Invalid HTTP_HOST header"

Check `.env` file has:
```env
ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm
```

### Error: Static files not loading

```bash
source venv/bin/activate
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput
```

---

## Check Logs

```bash
# Django logs
tail -f ~/hawladeragro.farm/logs/django.log

# Passenger error logs
tail -f ~/hawladeragro.farm/logs/passenger_error.log
```

---

## Test Deployment

Visit: **https://hawladaragro.farm**

---

**Last Updated:** 2026-03-09
