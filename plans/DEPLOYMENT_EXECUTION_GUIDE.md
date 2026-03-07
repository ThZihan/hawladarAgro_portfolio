# Deployment Execution Guide - Step-by-Step

**Follow this guide to backup existing WordPress site and deploy Django project.**

---

## Phase 1: Backup Existing WordPress Site

### Step 1: Connect to Server via SSH

**On Windows (using PuTTY):**
1. Open PuTTY
2. Enter hostname: `hawladeragro.farm`
3. Port: `22`
4. Click "Open"
5. Enter your cPanel username
6. Paste your SSH key or enter password

**On Windows (using Command Prompt/PowerShell):**
```cmd
ssh username@hawladeragro.farm
```

**On Windows (using Git Bash):**
```bash
ssh username@hawladeragro.farm
```

**On Mac/Linux:**
```bash
ssh username@hawladeragro.farm
```

> **Replace `username` with your actual cPanel username**

---

### Step 2: Create Backup Directory

Once connected to the server, run:

```bash
# Create backup directory with date
BACKUP_DIR=~/backups/wordpress-$(date +%Y%m%d-%H%M%S)
mkdir -p $BACKUP_DIR

# Navigate to backup directory
cd $BACKUP_DIR

# Show backup directory path
echo "Backup directory: $BACKUP_DIR"
pwd
```

---

### Step 3: Backup WordPress Files

First, let's find where your WordPress files are located:

```bash
# Check common locations
ls -la ~/public_html/
ls -la ~/hawladeragro.farm/

# Look for wp-config.php file to identify WordPress location
find ~/public_html -name "wp-config.php" 2>/dev/null
find ~/hawladeragro.farm -name "wp-config.php" 2>/dev/null
```

**If WordPress is in `public_html`:**
```bash
# Backup all files
tar -czf wordpress_files.tar.gz -C ~/ public_html

echo "Files backed up: wordpress_files.tar.gz"
ls -lh wordpress_files.tar.gz
```

**If WordPress is in `hawladeragro.farm` directory:**
```bash
# Backup all files
tar -czf wordpress_files.tar.gz -C ~/ hawladeragro.farm

echo "Files backed up: wordpress_files.tar.gz"
ls -lh wordpress_files.tar.gz
```

---

### Step 4: Backup WordPress Database

First, let's find your WordPress database credentials:

```bash
# Find wp-config.php file
find ~/ -name "wp-config.php" 2>/dev/null | head -1

# View database credentials (replace with actual path)
cat ~/public_html/wp-config.php | grep -E "DB_NAME|DB_USER|DB_PASSWORD|DB_HOST"
```

**Then backup the database:**

```bash
# Backup MySQL database (replace with actual credentials)
mysqldump -u db_user -p db_name > database_backup.sql

# Compress the backup
gzip database_backup.sql

echo "Database backed up: database_backup.sql.gz"
ls -lh database_backup.sql.gz
```

> **Replace `db_user` and `db_name` with actual values from wp-config.php**

---

### Step 5: Verify Backup

```bash
# Check backup files
ls -lh

# Verify tar.gz file
tar -tzf wordpress_files.tar.gz | head -20

# Verify database backup
zcat database_backup.sql.gz | head -20

# Create backup manifest
cat > backup_manifest.txt << EOF
Backup Date: $(date)
Backup Directory: $BACKUP_DIR
Domain: hawladeragro.farm

Files Included:
- wordpress_files.tar.gz
- database_backup.sql.gz

EOF

cat backup_manifest.txt
```

---

### Step 6: Download Backup to Local Machine (Recommended)

**On Windows (using WinSCP/FileZilla):**
1. Connect to `hawladeragro.farm` with SFTP
2. Navigate to `~/backups/wordpress-YYYYMMDD-HHMMSS/`
3. Download all files to your local machine

**On Windows (using SCP):**
```cmd
scp username@hawladeragro.farm:~/backups/wordpress-YYYYMMDD-HHMMSS/* .\
```

**On Mac/Linux (using SCP):**
```bash
scp username@hawladeragro.farm:~/backups/wordpress-YYYYMMDD-HHMMSS/* ./
```

---

## Phase 2: Deploy Django Project

### Step 7: Create PostgreSQL Database

1. **Login to cPanel** at `https://hawladeragro.farm:2083`
2. Navigate to **Databases** → **PostgreSQL Databases**
3. Click **Create New Database**
4. Enter:
   - **Database Name:** `hawladaragro_db`
   - **Database User:** `hawladaragro_user`
   - **Password:** [Generate strong password]
5. Click **Create Database**
6. Click **Add User to Database**
7. Select user and database, check **ALL PRIVILEGES**
8. Click **Make Changes**

**Save these credentials:**
```
Database Name: hawladaragro_db
Database User: hawladaragro_user
Database Password: [your password]
Database Host: localhost
Database Port: 5432
```

---

### Step 8: Clone Django Project

```bash
# Navigate to home directory
cd ~

# Clone the repository
git clone https://github.com/ThZihan/hawladarAgro_portfolio.git hawladeragro.farm

# Navigate to project directory
cd ~/hawladeragro.farm

# Verify files
ls -la
```

---

### Step 9: Setup Python Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# You should see (venv) in your prompt
echo "Virtual environment activated"

# Upgrade pip
pip install --upgrade pip

# Install production dependencies
pip install -r requirements-prod.txt

# Verify Django installation
python -m django --version
```

---

### Step 10: Create .env File

```bash
# Create .env file from example
cp .env.example .env

# Edit .env file
nano .env
```

**Update the following values in `.env`:**

```env
# SECURITY SETTINGS
SECRET_KEY=[generate new secret key]
DEBUG=False
ALLOWED_HOSTS=hawladeragro.farm,www.hawladeragro.farm

# DATABASE CONFIGURATION
DB_NAME=hawladaragro_db
DB_USER=hawladaragro_user
DB_PASSWORD=[your database password from Step 7]
DB_HOST=localhost
DB_PORT=5432

# EMAIL CONFIGURATION (optional)
# If you want email functionality, update these
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-email-password
DEFAULT_FROM_EMAIL=noreply@hawladeragro.farm
```

**Generate new SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Save and exit nano:**
- Press `Ctrl + O` to save
- Press `Enter` to confirm
- Press `Ctrl + X` to exit

**Set proper permissions:**
```bash
chmod 600 .env
```

---

### Step 11: Run Database Migrations

```bash
# Ensure virtual environment is active
source venv/bin/activate

# Run migrations
python manage.py migrate --settings=hawladar_agro.settings_prod

# Create superuser (optional but recommended)
python manage.py createsuperuser --settings=hawladar_agro.settings_prod
```

---

### Step 12: Collect Static Files

```bash
# Create public_html directory
mkdir -p public_html

# Collect static files
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput

# Verify static files
ls -la public_html/static/
```

---

### Step 13: Setup Python Application in cPanel

1. **Login to cPanel** at `https://hawladeragro.farm:2083`
2. Navigate to **Software** → **Setup Python App**
3. Click **Create Application**
4. Configure:
   - **Python Version:** `3.11` (or latest available)
   - **Application Root:** `hawladeragro.farm`
   - **Application URL:** `hawladeragro.farm`
   - **Application Startup File:** `passenger_wsgi.py`
   - **Application Entry Point:** `application`
5. Click **Create**
6. After creation, click the application name to edit
7. Add environment variables:
   - `DJANGO_SETTINGS_MODULE=hawladar_agro.settings_prod`
   - `SECRET_KEY=[your secret key from .env]`
   - `DEBUG=False`
8. Click **Save**
9. Click **Restart** to restart the application

---

### Step 14: Configure Domain Document Root

1. In cPanel, navigate to **Domains**
2. Find `hawladeragro.farm`
3. Click **Manage** or **Modify**
4. Set **Document Root** to: `/home/username/hawladeragro.farm/public_html`
   > **Replace `username` with your actual cPanel username**
5. Click **Save**

---

### Step 15: Configure SSL Certificate

1. In cPanel, navigate to **Security** → **SSL/TLS**
2. Click **Manage SSL Sites**
3. Find `hawladeragro.farm`
4. Click **Install Certificate**
5. Choose **Let's Encrypt** (if available)
6. Enable **Force HTTPS Redirect**
7. Click **Save**

---

## Phase 3: Verify Deployment

### Step 16: Test Deployment

```bash
# Check if site is accessible
curl -I https://hawladeragro.farm

# Check Django logs
tail -f ~/hawladeragro.farm/logs/django.log

# Check Passenger logs
tail -f ~/logs/passenger.log
```

### Step 17: Verify All Pages Work

Open your browser and test:
- [ ] Homepage: https://hawladeragro.farm
- [ ] About: https://hawladeragro.farm/about/
- [ ] Projects: https://hawladeragro.farm/projects/
- [ ] Blog: https://hawladeragro.farm/blog/
- [ ] Team: https://hawladeragro.farm/team/
- [ ] Gallery: https://hawladeragro.farm/gallery/
- [ ] Investment: https://hawladeragro.farm/investment/
- [ ] Contact: https://hawladeragro.farm/contact/
- [ ] Admin: https://hawladeragro.farm/admin

---

## Rollback Procedure (If Needed)

### Quick Rollback

```bash
# SSH into server
ssh username@hawladeragro.farm

# Navigate to backup directory
cd ~/backups/wordpress-YYYYMMDD-HHMMSS

# Stop Python application in cPanel

# Restore WordPress files
tar -xzf wordpress_files.tar.gz -C ~/

# Restore database
zcat database_backup.sql.gz | mysql -u db_user -p db_name

# Set proper permissions
find ~/public_html -type d -exec chmod 755 {} \;
find ~/public_html -type f -exec chmod 644 {} \;

# Restart web server (if needed)
```

---

## Troubleshooting

### Site Not Loading - 500 Error

```bash
# Check Django logs
tail -f ~/hawladeragro.farm/logs/django.log

# Check Passenger logs
tail -f ~/logs/passenger.log

# Check error logs
tail -f ~/logs/error_log
```

### Static Files Not Loading

```bash
# Check if static files were collected
ls -la ~/hawladeragro.farm/public_html/static/

# Re-run collectstatic
cd ~/hawladeragro.farm
source venv/bin/activate
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput
```

### Database Connection Error

```bash
# Check .env file
cat ~/hawladeragro.farm/.env

# Test database connection
psql -h localhost -U hawladaragro_user -d hawladaragro_db
```

---

## Quick Reference Commands

```bash
# SSH to server
ssh username@hawladeragro.farm

# Activate virtual environment
cd ~/hawladeragro.farm
source venv/bin/activate

# Run migrations
python manage.py migrate --settings=hawladar_agro.settings_prod

# Collect static files
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput

# Restart Python app (in cPanel)
# Navigate to Setup Python App → Restart

# Check logs
tail -f ~/hawladeragro.farm/logs/django.log
```

---

## Important Notes

⚠️ **Before Starting:**
- Make sure you have at least 30-60 minutes available
- Choose a low-traffic time for deployment
- Have your cPanel credentials ready
- Have SSH access working

⚠️ **During Deployment:**
- Don't interrupt any running commands
- Wait for each step to complete before proceeding
- Check for error messages after each command

⚠️ **After Deployment:**
- Monitor site for 24-48 hours
- Keep backup files for at least 30 days
- Test all functionality thoroughly

---

## Support

If you encounter issues:
1. Check the logs (Django, Passenger, Error logs)
2. Review the troubleshooting section above
3. Refer to [`BACKUP_AND_DEPLOYMENT_PLAN.md`](BACKUP_AND_DEPLOYMENT_PLAN.md:1)
4. Contact your hosting provider if needed
