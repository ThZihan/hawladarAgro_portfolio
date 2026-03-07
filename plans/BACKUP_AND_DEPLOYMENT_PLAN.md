# Backup and Deployment Plan - Hawladar Agro

**Domain:** https://hawladeragro.farm/
**Target:** Replace existing site with new Django portfolio project
**Date:** 2026-03-07

---

## Table of Contents

1. [Required Information for Deployment](#required-information-for-deployment)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Backup Procedure](#backup-procedure)
4. [Deployment Procedure](#deployment-procedure)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Rollback/Restoration Procedure](#rollbackrestoration-procedure)
7. [Troubleshooting](#troubleshooting)

---

## Required Information for Deployment

### cPanel Access Information
- [ ] **cPanel URL** (e.g., https://yourdomain.com:2083)
- [ ] **cPanel Username**
- [ ] **cPanel Password**

### SSH Access Information
- [ ] **SSH Host** (e.g., hawladeragro.farm or server IP)
- [ ] **SSH Port** (default: 22)
- [ ] **SSH Username** (usually same as cPanel username)
- [ ] **SSH Password or SSH Key**

### Database Information (Existing Site)
- [ ] **Database Type** (MySQL, PostgreSQL, or SQLite)
- [ ] **Database Name**
- [ ] **Database User**
- [ ] **Database Password**
- [ ] **Database Host** (usually localhost)

### Domain Information
- [ ] **Domain Name:** hawladeragro.farm
- [ ] **Document Root** (e.g., /home/username/public_html or /home/username/hawladeragro.farm)
- [ ] **SSL Certificate Status** (Let's Encrypt, custom, or none)

### Existing Site Technology Stack
- [ ] **Platform** (WordPress, static HTML, PHP, etc.)
- [ ] **Web Server** (Apache, Nginx, LiteSpeed)
- [ ] **PHP Version** (if applicable)

### New Django Project Information
- [ ] **Git Repository:** https://github.com/ThZihan/hawladarAgro_portfolio.git
- [ ] **Branch:** main
- [ ] **Python Version Required:** 3.11 or higher
- [ ] **Database Type Required:** PostgreSQL

---

## Pre-Deployment Checklist

### Before Starting Backup
- [ ] Gather all required information listed above
- [ ] Notify stakeholders about scheduled maintenance
- [ ] Choose a low-traffic time for deployment
- [ ] Ensure you have sufficient disk space for backups
- [ ] Test SSH access to server
- [ ] Test cPanel login

### Backup Preparation
- [ ] Create backup directory: `mkdir -p ~/backups/hawladeragro-$(date +%Y%m%d)`
- [ ] Verify backup directory exists
- [ ] Check available disk space: `df -h`

---

## Backup Procedure

### Step 1: SSH into Server
```bash
ssh username@hawladeragro.farm
# Or
ssh -p port username@server-ip
```

### Step 2: Create Backup Directory
```bash
# Create backup directory with date
BACKUP_DIR=~/backups/hawladeragro-$(date +%Y%m%d-%H%M%S)
mkdir -p $BACKUP_DIR
cd $BACKUP_DIR

echo "Backup directory: $BACKUP_DIR"
```

### Step 3: Backup Website Files
```bash
# Identify the document root (common locations)
# Option 1: If site is in public_html
DOCUMENT_ROOT=/home/username/public_html

# Option 2: If site is in subdomain directory
DOCUMENT_ROOT=/home/username/hawladeragro.farm

# Backup all files
tar -czf website_files.tar.gz -C /home/username $(basename $DOCUMENT_ROOT)

echo "Files backed up: website_files.tar.gz"
ls -lh website_files.tar.gz
```

### Step 4: Backup Database

#### If Database is MySQL:
```bash
# Get database credentials from wp-config.php (if WordPress)
# Or use known credentials

# Backup database
mysqldump -u db_user -p db_name > database_backup.sql

# Compress database backup
gzip database_backup.sql

echo "Database backed up: database_backup.sql.gz"
ls -lh database_backup.sql.gz
```

#### If Database is PostgreSQL:
```bash
# Backup PostgreSQL database
pg_dump -U db_user db_name > database_backup.sql

# Compress database backup
gzip database_backup.sql

echo "Database backed up: database_backup.sql.gz"
ls -lh database_backup.sql.gz
```

#### If Database is SQLite:
```bash
# Find and backup SQLite database
find /home/username -name "*.sqlite3" -o -name "*.db"

# Copy database file
cp /path/to/database.sqlite3 database_backup.sqlite3

# Compress
gzip database_backup.sqlite3

echo "Database backed up: database_backup.sqlite3.gz"
```

### Step 5: Backup Configuration Files
```bash
# Backup .htaccess file
cp $DOCUMENT_ROOT/.htaccess .htaccess.backup 2>/dev/null || echo "No .htaccess file"

# Backup any configuration files
find $DOCUMENT_ROOT -name "*.conf" -o -name "wp-config.php" -o -name "config.php" | xargs -I {} cp {} ./

# Create backup manifest
cat > backup_manifest.txt << EOF
Backup Date: $(date)
Backup Directory: $BACKUP_DIR
Domain: hawladeragro.farm
Document Root: $DOCUMENT_ROOT

Files Included:
- website_files.tar.gz ($(du -h website_files.tar.gz | cut -f1))
- database_backup.sql.gz ($(du -h database_backup.sql.gz | cut -f1))
- Configuration files

EOF

cat backup_manifest.txt
```

### Step 6: Verify Backup
```bash
# Check backup files
ls -lh

# Verify tar.gz file integrity
tar -tzf website_files.tar.gz | head -20

# Verify database backup
zcat database_backup.sql.gz | head -20

# Create backup checksums
md5sum *.tar.gz *.sql.gz > checksums.md5
cat checksums.md5
```

### Step 7: Download Backup to Local Machine (Optional but Recommended)
```bash
# On your local machine
scp username@hawladeragro.farm:~/backups/hawladeragro-YYYYMMDD-HHMMSS/* ./backups/

# Or use SFTP client (FileZilla, WinSCP, etc.)
```

### Step 8: Create Restoration Script
```bash
cat > restore_original_site.sh << 'EOF'
#!/bin/bash
# Restoration Script for Original Site
# Usage: bash restore_original_site.sh

BACKUP_DIR=$(pwd)
DOCUMENT_ROOT=/home/username/public_html

echo "Starting restoration from: $BACKUP_DIR"
echo "Target directory: $DOCUMENT_ROOT"

# Confirm restoration
read -p "This will overwrite the current site. Continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "Restoration cancelled."
    exit 1
fi

# Stop web server (if needed)
# systemctl stop httpd
# systemctl stop nginx

# Backup current site (just in case)
mv $DOCUMENT_ROOT $DOCUMENT_ROOT.backup-$(date +%Y%m%d-%H%M%S)

# Create new document root
mkdir -p $DOCUMENT_ROOT

# Extract website files
echo "Extracting website files..."
tar -xzf website_files.tar.gz -C /home/username/

# Restore database
echo "Restoring database..."
zcat database_backup.sql.gz | mysql -u db_user -p db_name

# Restore configuration files
cp .htaccess.backup $DOCUMENT_ROOT/.htaccess 2>/dev/null || true

# Set proper permissions
echo "Setting permissions..."
find $DOCUMENT_ROOT -type d -exec chmod 755 {} \;
find $DOCUMENT_ROOT -type f -exec chmod 644 {} \;

# Start web server
# systemctl start httpd
# systemctl start nginx

echo "Restoration completed successfully!"
echo "Please verify your site at https://hawladeragro.farm"
EOF

chmod +x restore_original_site.sh
```

---

## Deployment Procedure

### Step 1: Create New PostgreSQL Database
1. Login to cPanel
2. Navigate to **Databases** → **PostgreSQL Databases**
3. Create new database:
   - **Database Name:** `hawladaragro_db`
   - **Database User:** `hawladaragro_user`
   - **Password:** [Generate strong password]
   - **Host:** `localhost`
   - **Port:** `5432`
4. Add user to database with all privileges
5. **Save these credentials** - you'll need them for the `.env` file

### Step 2: Clone Django Project
```bash
# SSH into server
ssh username@hawladeragro.farm

# Navigate to home directory
cd ~

# Clone the repository
git clone https://github.com/ThZihan/hawladarAgro_portfolio.git hawladeragro.farm

# Navigate to project directory
cd ~/hawladeragro.farm

# Verify files
ls -la
```

### Step 3: Setup Python Virtual Environment
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install production dependencies
pip install -r requirements-prod.txt

# Verify Django installation
python -m django --version
```

### Step 4: Create .env File
```bash
# Create .env file from example
cp .env.example .env

# Edit .env file with production values
nano .env
```

**Update the following values in `.env`:**
```env
# SECURITY SETTINGS
SECRET_KEY=[generate new secret key or use the one from local .env]
DEBUG=False
ALLOWED_HOSTS=hawladeragro.farm,www.hawladeragro.farm

# DATABASE CONFIGURATION
DB_NAME=hawladaragro_db
DB_USER=hawladaragro_user
DB_PASSWORD=[your database password from Step 1]
DB_HOST=localhost
DB_PORT=5432

# EMAIL CONFIGURATION (optional)
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

**Set proper permissions:**
```bash
chmod 600 .env
```

### Step 5: Run Database Migrations
```bash
# Ensure virtual environment is active
source venv/bin/activate

# Run migrations
python manage.py migrate --settings=hawladar_agro.settings_prod

# Create superuser (optional)
python manage.py createsuperuser --settings=hawladar_agro.settings_prod
```

### Step 6: Collect Static Files
```bash
# Create public_html directory
mkdir -p public_html

# Collect static files
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput

# Verify static files
ls -la public_html/static/
```

### Step 7: Setup Python Application in cPanel

1. Login to cPanel
2. Navigate to **Software** → **Setup Python App**
3. Click **Create Application**
4. Configure the application:
   - **Python Version:** 3.11 (or latest available)
   - **Application Root:** `hawladeragro.farm`
   - **Application URL:** `hawladeragro.farm`
   - **Application Startup File:** `passenger_wsgi.py`
   - **Application Entry Point:** `application`
5. Click **Create**
6. After creation, click the application name to edit
7. Add environment variables:
   - `DJANGO_SETTINGS_MODULE=hawladar_agro.settings_prod`
   - `SECRET_KEY=[your secret key]`
   - `DEBUG=False`
8. Click **Save**
9. Click **Restart** to restart the application

### Step 8: Configure Domain Document Root
1. In cPanel, navigate to **Domains**
2. Find `hawladeragro.farm`
3. Click **Manage** or **Modify**
4. Set **Document Root** to: `/home/username/hawladeragro.farm/public_html`
5. Click **Save**

### Step 9: Configure SSL Certificate
1. In cPanel, navigate to **Security** → **SSL/TLS**
2. Click **Manage SSL Sites**
3. Find `hawladeragro.farm`
4. Click **Install Certificate**
5. Choose **Let's Encrypt** (if available) or upload custom certificate
6. Enable **Force HTTPS Redirect**
7. Click **Save**

### Step 10: Update Passenger WSGI Configuration (if needed)
```bash
# Edit passenger_wsgi.py if the project path is different
nano passenger_wsgi.py

# Update project_path if necessary:
# project_path = '/home/your-actual-username/hawladeragro.farm'

# Restart Python application in cPanel
```

---

## Post-Deployment Verification

### Step 1: Basic Functionality Check
- [ ] Homepage loads at https://hawladeragro.farm
- [ ] HTTPS is working (green lock icon)
- [ ] No mixed content warnings
- [ ] All pages accessible:
  - [ ] Home (/)
  - [ ] About (/about/)
  - [ ] Projects (/projects/)
  - [ ] Blog (/blog/)
  - [ ] Team (/team/)
  - [ ] Gallery (/gallery/)
  - [ ] Investment (/investment/)
  - [ ] Contact (/contact/)

### Step 2: Static Files Check
- [ ] CSS files loading (check page source)
- [ ] JavaScript files loading
- [ ] Images loading correctly
- [ ] Icons displaying properly
- [ ] No 404 errors for static files

### Step 3: Admin Panel Check
- [ ] Admin panel accessible at https://hawladeragro.farm/admin
- [ ] Can login to admin panel
- [ ] Can create/edit content

### Step 4: Database Check
- [ ] Database queries working
- [ ] Data persists across page loads
- [ ] No database errors in logs

### Step 5: Security Check
- [ ] DEBUG is False (no debug page on errors)
- [ ] HTTPS is enforced
- [ ] SSL certificate is valid
- [ ] `.env` file not accessible via web
- [ ] Admin panel has strong password

### Step 6: Performance Check
- [ ] Page load time acceptable (< 3 seconds)
- [ ] Images optimized
- [ ] No console errors in browser

### Step 7: Mobile Responsiveness
- [ ] Site works on mobile devices
- [ ] Navigation is accessible on mobile
- [ ] Forms work on mobile
- [ ] Images scale properly

### Step 8: Check Application Logs
```bash
# Check Django logs
tail -f ~/hawladeragro.farm/logs/django.log

# Check Passenger logs
tail -f ~/logs/passenger.log

# Check error logs
tail -f ~/logs/error_log
```

---

## Rollback/Restoration Procedure

### Quick Rollback (If Django Deployment Fails)

#### Option 1: Restore from Backup Directory
```bash
# SSH into server
ssh username@hawladeragro.farm

# Navigate to backup directory
cd ~/backups/hawladeragro-YYYYMMDD-HHMMSS

# Run restoration script
bash restore_original_site.sh
```

#### Option 2: Manual Restoration
```bash
# SSH into server
ssh username@hawladeragro.farm

# Navigate to backup directory
cd ~/backups/hawladeragro-YYYYMMDD-HHMMSS

# Stop Python application (in cPanel or via command)
# Or remove Python app in cPanel

# Backup current Django site
mv ~/hawladeragro.farm ~/hawladeragro.farm.failed-$(date +%Y%m%d-%H%M%S)

# Restore original site
tar -xzf website_files.tar.gz -C /home/username/

# Restore database
zcat database_backup.sql.gz | mysql -u db_user -p db_name

# Set proper permissions
find /home/username/public_html -type d -exec chmod 755 {} \;
find /home/username/public_html -type f -exec chmod 644 {} \;

# Verify site is restored
curl -I https://hawladeragro.farm
```

### Full Rollback (Including Database)

```bash
# 1. Stop Python application in cPanel
#    Navigate to Setup Python App → Stop application

# 2. Remove Python application
#    Navigate to Setup Python App → Delete application

# 3. Restore files
cd ~/backups/hawladeragro-YYYYMMDD-HHMMSS
tar -xzf website_files.tar.gz -C /home/username/

# 4. Restore database
zcat database_backup.sql.gz | mysql -u db_user -p db_name

# 5. Restore configuration files
cp .htaccess.backup /home/username/public_html/.htaccess

# 6. Set permissions
find /home/username/public_html -type d -exec chmod 755 {} \;
find /home/username/public_html -type f -exec chmod 644 {} \;

# 7. Restart web server (if needed)
#    systemctl restart httpd
#    systemctl restart nginx

# 8. Verify restoration
curl -I https://hawladeragro.farm
```

### Test Rollback Procedure (Before Actual Deployment)

It's recommended to test the rollback procedure on a staging environment first:

```bash
# 1. Create a test directory
mkdir -p ~/test-restore
cd ~/test-restore

# 2. Copy backup files
cp ~/backups/hawladeragro-YYYYMMDD-HHMMSS/* .

# 3. Extract files to test location
tar -xzf website_files.tar.gz -C /home/username/test-restore/

# 4. Verify extraction
ls -la /home/username/test-restore/

# 5. Test database restore (to a test database)
#    Create test database first
#    Then restore
zcat database_backup.sql.gz | mysql -u db_user -p test_db_name

# 6. Clean up test files
rm -rf ~/test-restore
```

---

## Troubleshooting

### Issue 1: Site Not Loading - 500 Internal Server Error

**Solution:**
```bash
# Check Django logs
tail -f ~/hawladeragro.farm/logs/django.log

# Check Passenger logs
tail -f ~/logs/passenger.log

# Check error logs
tail -f ~/logs/error_log

# Common causes:
# 1. Missing .env file or incorrect permissions
# 2. Database connection issues
# 3. Missing dependencies
# 4. Incorrect ALLOWED_HOSTS setting
```

### Issue 2: Static Files Not Loading

**Solution:**
```bash
# Check if static files were collected
ls -la ~/hawladeragro.farm/public_html/static/

# Re-run collectstatic
cd ~/hawladeragro.farm
source venv/bin/activate
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput

# Check STATIC_ROOT in settings_prod.py
# Should be: BASE_DIR / 'public_html' / 'static'
```

### Issue 3: Database Connection Error

**Solution:**
```bash
# Check .env file
cat ~/hawladeragro.farm/.env

# Verify database exists in cPanel
# Navigate to PostgreSQL Databases

# Test database connection
psql -h localhost -U hawladaragro_user -d hawladaragro_db

# Check database credentials in .env match cPanel
```

### Issue 4: Permission Denied Errors

**Solution:**
```bash
# Fix directory permissions
find ~/hawladeragro.farm -type d -exec chmod 755 {} \;

# Fix file permissions
find ~/hawladeragro.farm -type f -exec chmod 644 {} \;

# Fix .env permissions
chmod 600 ~/hawladeragro.farm/.env

# Fix venv permissions
chmod -R 755 ~/hawladeragro.farm/venv
```

### Issue 5: Python Application Not Starting

**Solution:**
```bash
# Check Python version
python3 --version

# Check if all dependencies are installed
cd ~/hawladeragro.farm
source venv/bin/activate
pip list

# Restart Python application in cPanel
# Navigate to Setup Python App → Restart

# Check Passenger WSGI configuration
cat ~/hawladeragro.farm/passenger_wsgi.py
```

### Issue 6: SSL Certificate Issues

**Solution:**
```bash
# Check SSL status in cPanel
# Navigate to SSL/TLS Status

# Reinstall Let's Encrypt certificate
# Navigate to SSL/TLS → Manage SSL Sites

# Force HTTPS in .htaccess (if needed)
# Add to public_html/.htaccess:
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Emergency Contacts and Resources

### Documentation
- [Django Deployment Documentation](https://docs.djangoproject.com/en/5.0/howto/deployment/)
- [cPanel Python App Documentation](https://docs.cpanel.net/cpanel/software-setup-python-app/)
- [Passenger Documentation](https://www.phusionpassenger.com/library/)

### Project Documentation
- [`DEPLOYMENT_READINESS_REPORT.md`](../DEPLOYMENT_READINESS_REPORT.md:1)
- [`plans/deployment-plan.md`](deployment-plan.md:1)
- [`plans/deployment-checklist.md`](deployment-checklist.md:1)

---

## Deployment Timeline Estimate

| Task | Estimated Time |
|------|----------------|
| Backup existing site | 15-30 minutes |
| Create PostgreSQL database | 5-10 minutes |
| Clone Django project | 5-10 minutes |
| Setup Python environment | 10-15 minutes |
| Configure .env file | 5-10 minutes |
| Run migrations | 5-10 minutes |
| Collect static files | 5-10 minutes |
| Setup Python app in cPanel | 10-15 minutes |
| Configure SSL | 5-10 minutes |
| Post-deployment verification | 15-30 minutes |
| **Total** | **1.5-2.5 hours** |

---

## Notes

- Always test rollback procedure before actual deployment
- Keep backups for at least 30 days
- Monitor site for 24-48 hours after deployment
- Have emergency contact information ready
- Document any custom configurations or changes made during deployment
