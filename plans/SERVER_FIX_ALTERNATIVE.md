# Server Fix - Alternative Approach

## Issue Encountered

The virtual environment creation failed with:
```
Error: Command '['/home/kalobira/hawladeragro.farm/venv/bin/python3.9', '-Im', 'ensurepip', '--upgrade', '--default-pip']' returned non-zero exit status1.
```

This is a common issue with Python 3.9 on some servers.

## Alternative Solution

### Step 1: Remove Failed Virtual Environment

```bash
cd ~/hawladeragro.farm
rm -rf venv
```

### Step 2: Try Alternative Virtual Environment Creation

```bash
# Try with --system-site-packages flag
/usr/bin/python3.9 -m venv --system-site-packages venv
```

### Step 3: If That Fails, Use Python Directly

If the above still fails, we can install packages directly to Python:

```bash
# Install Django 4.2 directly
/usr/bin/python3.9 -m pip install --user Django==4.2.11

# Install other dependencies
/usr/bin/python3.9 -m pip install --user django-environ==0.11.2
/usr/bin/python3.9 -m pip install --user djangorestframework==3.14.0
/usr/bin/python3.9 -m pip install --user psycopg2-binary==2.9.9
/usr/bin/python3.9 -m pip install --user Pillow==10.2.0
/usr/bin/python3.9 -m pip install --user gunicorn==21.2.0
/usr/bin/python3.9 -m pip install --user whitenoise==6.6.0
/usr/bin/python3.9 -m pip install --user django-cors-headers==4.3.1
/usr/bin/python3.9 -m pip install --user django-anymail==10.2
```

### Step 4: Configure .env File

```bash
nano .env
```

**Replace entire content with:**

```env
SECRET_KEY=<paste-your-secret-key-here>
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

### Step 5: Run Migrations

```bash
cd ~/hawladeragro.farm
/usr/bin/python3.9 manage.py migrate --settings=hawladar_agro.settings_prod
```

### Step 6: Collect Static Files

```bash
cd ~/hawladeragro.farm
mkdir -p public_html/static
/usr/bin/python3.9 manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput
```

### Step 7: Verify Installation

```bash
cd ~/hawladeragro.farm
/usr/bin/python3.9 manage.py check --settings=hawladar_agro.settings_prod
```

**Expected output:** `System check identified no issues (0 silenced).`

---

## cPanel Configuration

### 1. Setup Python App

1. Log in to cPanel
2. Go to **Setup Python App**
3. Click **Create Application**
4. Configure:
   - **Python Version:** 3.9
   - **Application Root:** `hawladeragro.farm`
   - **Application URL:** `hawladaragro.farm`
   - **Application Entry Point:** `passenger_wsgi.py`
   - **Application Startup File:** `passenger_wsgi.py`
   - **Passenger Log File:** `logs/passenger.log`
   - **Passenger Error Log File:** `logs/passenger_error.log`
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

### Error: "ModuleNotFoundError: No module named 'django'"

Install Django:
```bash
/usr/bin/python3.9 -m pip install --user Django==4.2.11
```

### Error: "ModuleNotFoundError: No module named 'environ'"

Install django-environ:
```bash
/usr/bin/python3.9 -m pip install --user django-environ==0.11.2
```

### Error: "DisallowedHost at / Invalid HTTP_HOST header"

Check `.env` file has:
```env
ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm
```

### Error: Static files not loading

```bash
mkdir -p public_html/static
/usr/bin/python3.9 manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput
```

---

## Quick Reference: All Commands

```bash
# Navigate to project
cd ~/hawladeragro.farm

# Remove failed venv
rm -rf venv

# Install dependencies directly
/usr/bin/python3.9 -m pip install --user Django==4.2.11
/usr/bin/python3.9 -m pip install --user django-environ==0.11.2
/usr/bin/python3.9 -m pip install --user djangorestframework==3.14.0
/usr/bin/python3.9 -m pip install --user psycopg2-binary==2.9.9
/usr/bin/python3.9 -m pip install --user Pillow==10.2.0
/usr/bin/python3.9 -m pip install --user gunicorn==21.2.0
/usr/bin/python3.9 -m pip install --user whitenoise==6.6.0
/usr/bin/python3.9 -m pip install --user django-cors-headers==4.3.1
/usr/bin/python3.9 -m pip install --user django-anymail==10.2

# Configure .env (see Step 4 above)
nano .env

# Run migrations
/usr/bin/python3.9 manage.py migrate --settings=hawladar_agro.settings_prod

# Collect static files
mkdir -p public_html/static
/usr/bin/python3.9 manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput

# Verify
/usr/bin/python3.9 manage.py check --settings=hawladar_agro.settings_prod
```

---

**Last Updated:** 2026-03-09
**Status:** Alternative approach for virtual environment issues
