# Fix cPanel Pip Install Error

## Error Message

```
ERROR: Could not open requirements file: [Errno 21] Is a directory: 'hawladeragro.farm/'
```

## Root Cause

cPanel is treating the application root path incorrectly. The requirements file path needs to be specified without the application root prefix.

## Solution: Install Dependencies via SSH

Since cPanel's pip install is having issues, the best approach is to install dependencies via SSH directly in cPanel's virtual environment.

### Step 1: Pull Latest Changes

```bash
cd ~/hawladeragro.farm
git pull origin main
```

### Step 2: Activate cPanel's Virtual Environment

```bash
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements-cpanel.txt
```

### Step 4: Verify Installation

```bash
python manage.py check --settings=hawladar_agro.settings_prod
```

**Expected output:** `System check identified no issues (0 silenced).`

### Step 5: Restart Application in cPanel

1. In cPanel, go to **Setup Python App**
2. Find **hawladaragro.farm** application
3. Click **Restart** button

### Step 6: Test Deployment

Visit **https://hawladaragro.farm** - you should now see the Django application!

---

## Alternative: Create .htaccess File

If the above doesn't work, create the `.htaccess` file:

```bash
cd ~/hawladeragro.farm/public_html
cat > .htaccess << 'EOF'
PassengerEnabled on
PassengerAppRoot /home/kalobira/hawladeragro.farm
PassengerBaseURI /
EOF
```

Then restart the application in cPanel.

---

## Troubleshooting

### Error: "ModuleNotFoundError: No module named 'django'"

This means Django is not installed. Run Step 3 above to install dependencies.

### Error: "ModuleNotFoundError: No module named 'environ'"

This means django-environ is not installed. Run Step 3 above.

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

### Error: Still seeing directory listing

Check Passenger logs:
```bash
tail -f ~/hawladeragro.farm/logs/passenger_error.log
```

---

## Quick Reference

1. Pull latest changes: `cd ~/hawladeragro.farm && git pull origin main`
2. Activate virtual environment: `source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate`
3. Install dependencies: `pip install -r requirements-cpanel.txt`
4. Verify installation: `python manage.py check --settings=hawladar_agro.settings_prod`
5. Restart application in cPanel
6. Test deployment at https://hawladaragro.farm

---

**Last Updated:** 2026-03-09
**Status:** Fix for cPanel pip install error
