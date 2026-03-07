# Deployment Checklist - Hawladar Agro

## Pre-Deployment Checklist

### Local Development Setup
- [ ] Verify project runs locally with `python manage.py runserver`
- [ ] All pages are accessible and rendering correctly
- [ ] Static files are loading properly
- [ ] Media files are accessible
- [ ] Forms are working (contact form, etc.)
- [ ] Admin panel is accessible
- [ ] Database migrations are up to date
- [ ] No console errors in browser developer tools

### Code Quality
- [ ] Code follows Django best practices
- [ ] No hardcoded secrets in code
- [ ] All environment variables are in `.env.example`
- [ ] `.gitignore` is properly configured
- [ ] All unnecessary files are removed

### Git Repository
- [ ] All changes are committed to git
- [ ] `.gitignore` is updated and committed
- [ ] Repository is clean (no uncommitted changes)
- [ ] Remote repository is up to date

### Configuration Files
- [ ] `settings_dev.py` is configured for development
- [ ] `settings_prod.py` is configured for production
- [ ] `passenger_wsgi.py` is created and configured
- [ ] `requirements-prod.txt` is created
- [ ] `.env.example` is updated with all required variables

---

## WordPress Backup Checklist

### Before Deployment
- [ ] SSH access to cPanel is verified
- [ ] WordPress site is accessible at `https://hawladaragro.farm`
- [ ] `backup_wordpress.sh` script is uploaded to server
- [ ] Script has execute permissions (`chmod +x backup_wordpress.sh`)
- [ ] Backup directory exists (`~/backups/`)

### Backup Execution
- [ ] Run `bash backup_wordpress.sh` via SSH
- [ ] Verify `wordpress_files.tar.gz` is created
- [ ] Verify `wordpress_database.sql` is created (if database backup succeeds)
- [ ] Verify `backup_manifest.txt` is created
- [ ] Verify `restore_wordpress.sh` is created
- [ ] Test restore script (optional but recommended)

### Backup Verification
- [ ] Check backup file sizes are reasonable
- [ ] Verify backup files are not corrupted
- [ ] Note backup location and date for reference
- [ ] Copy backup to offsite location (optional but recommended)

---

## cPanel Deployment Checklist

### Database Setup
- [ ] Login to cPanel
- [ ] Navigate to "Databases" → "PostgreSQL Databases"
- [ ] Create new database: `hawladaragro_db`
- [ ] Create new database user: `hawladaragro_user`
- [ ] Generate strong password for database user
- [ ] Add user to database with all privileges
- [ ] Note database connection details (name, user, password, host)

### File Upload
- [ ] Upload project files to `/home/kalobira/hawladaragro.farm/`
  - [ ] Option A: Using Git clone
  - [ ] Option B: Using SFTP/FTP
- [ ] Verify all files are uploaded correctly
- [ ] Verify file permissions are correct

### Python Environment Setup
- [ ] SSH into cPanel server
- [ ] Navigate to project directory: `cd ~/hawladaragro.farm`
- [ ] Create virtual environment: `python3 -m venv venv`
- [ ] Activate virtual environment: `source venv/bin/activate`
- [ ] Install dependencies: `pip install -r requirements-prod.txt`

### Environment Configuration
- [ ] Create `.env` file in project root
- [ ] Copy contents from `.env.example`
- [ ] Update with production values:
  - [ ] `SECRET_KEY` (generate new strong key)
  - [ ] `DEBUG=False`
  - [ ] `ALLOWED_HOSTS=hawladaragro.farm,www.hawladaragro.farm`
  - [ ] `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
  - [ ] Email configuration (if needed)
- [ ] Set file permissions: `chmod 600 .env`

### Database Migration
- [ ] Run migrations: `python manage.py migrate --settings=hawladar_agro.settings_prod`
- [ ] Verify migrations complete without errors
- [ ] Create superuser if needed: `python manage.py createsuperuser --settings=hawladar_agro.settings_prod`

### Static Files
- [ ] Create static directory: `mkdir -p public_html/static`
- [ ] Create media directory: `mkdir -p public_html/media`
- [ ] Collect static files: `python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput`
- [ ] Verify static files are in `public_html/static/`

### cPanel Application Setup
- [ ] Go to cPanel → "Software" → "Setup Python App"
- [ ] Create new Python application:
  - [ ] Python version: 3.11 or higher
  - [ ] Application root: `hawladaragro.farm`
  - [ ] Application URL: `hawladaragro.farm`
  - [ ] Application startup file: `passenger_wsgi.py`
  - [ ] Application entry point: `application`
- [ ] Configure environment variables in Python App settings:
  - [ ] `DJANGO_SETTINGS_MODULE=hawladar_agro.settings_prod`
  - [ ] `SECRET_KEY=your-secret-key`
  - [ ] `DEBUG=False`
- [ ] Restart application

### Domain Configuration
- [ ] Go to cPanel → "Domains"
- [ ] Find `hawladaragro.farm`
- [ ] Click "Manage" or "Modify"
- [ ] Set document root to: `/home/kalobira/hawladaragro.farm/public_html`
- [ ] Save changes

### SSL Configuration
- [ ] Go to cPanel → "Security" → "SSL/TLS"
- [ ] Click "Manage SSL sites"
- [ ] Find `hawladaragro.farm`
- [ ] Install Let's Encrypt certificate (if not already installed)
- [ ] Enable "Force HTTPS Redirect"
- [ ] Verify SSL certificate is valid

---

## Post-Deployment Verification Checklist

### Basic Functionality
- [ ] Homepage loads at `https://hawladaragro.farm`
- [ ] All pages are accessible:
  - [ ] Home (`/`)
  - [ ] About (`/about/`)
  - [ ] Projects (`/projects/`)
  - [ ] Blog (`/blog/`)
  - [ ] Team (`/team/`)
  - [ ] Gallery (`/gallery/`)
  - [ ] Investment (`/investment/`)
  - [ ] Contact (`/contact/`)
- [ ] Admin panel is accessible at `/admin`
- [ ] Can login to admin panel

### Static & Media Files
- [ ] CSS files are loading (check page source)
- [ ] JavaScript files are loading
- [ ] Images are loading correctly
- [ ] Icons are displaying properly
- [ ] No 404 errors for static files

### Database
- [ ] Database queries are working
- [ ] Can create/edit content in admin panel
- [ ] Data persists across page loads

### Forms
- [ ] Contact form submits successfully
- [ ] Form validation works
- [ ] Email notifications are sent (if configured)

### Security
- [ ] DEBUG is False (no debug page on errors)
- [ ] HTTPS is enforced
- [ ] SSL certificate is valid
- [ ] Security headers are present
- [ ] `.env` file is not accessible via web
- [ ] Admin panel has strong password

### Performance
- [ ] Page load time is acceptable (< 3 seconds)
- [ ] Images are optimized
- [ ] Static files are compressed
- [ ] No console errors in browser

### Mobile Responsiveness
- [ ] Site works on mobile devices
- [ ] Navigation is accessible on mobile
- [ ] Forms work on mobile
- [ ] Images scale properly

---

## Rollback Checklist

### Rollback to WordPress (If Django Deployment Fails)

#### Quick Rollback
- [ ] SSH into cPanel server
- [ ] Navigate to backup directory: `cd ~/backups/wordpress_DATE/`
- [ ] Run restore script: `bash restore_wordpress.sh`
- [ ] Verify WordPress site is restored
- [ ] Update domain document root if needed

#### Manual Rollback
- [ ] Stop Django application (remove Python app in cPanel)
- [ ] Restore WordPress files:
  ```bash
  cd ~/
  tar -xzf backups/wordpress_DATE/wordpress_files.tar.gz
  ```
- [ ] Restore database:
  ```bash
  mysql -u DB_USER -pDB_PASSWORD DB_NAME < backups/wordpress_DATE/wordpress_database.sql
  ```
- [ ] Update domain document root to WordPress directory
- [ ] Verify WordPress site is accessible

### Rollback Django Changes (If Something Breaks)

#### Database Rollback
- [ ] SSH into server
- [ ] Navigate to project directory
- [ ] Run: `python manage.py migrate --settings=hawladar_agro.settings_prod --fake-initial`
- [ ] Or restore from database backup

#### Code Rollback
- [ ] Use git to revert changes:
  ```bash
  git log --oneline
  git checkout <commit-hash>
  ```
- [ ] Or restore from backup

---

## Maintenance Checklist

### Daily
- [ ] Check error logs: `tail -f ~/hawladaragro.farm/logs/django.log`
- [ ] Check Apache error logs: `tail -f ~/logs/error_log`
- [ ] Verify site is accessible

### Weekly
- [ ] Review site performance
- [ ] Check for any reported issues
- [ ] Review admin panel for spam/abuse

### Monthly
- [ ] Update Python dependencies
- [ ] Create database backup
- [ ] Review security settings
- [ ] Check disk usage

### Quarterly
- [ ] Full security audit
- [ ] SSL certificate renewal check
- [ ] Review and update documentation
- [ ] Test disaster recovery procedures

---

## Emergency Contacts

- **cPanel Support:** Contact hosting provider
- **Domain:** hawladaragro.farm
- **cPanel User:** kalobira
- **Primary Domain:** kalobiral.com.bd
- **SSH Access:** Enabled (RSA 2048 key)

---

## Useful Commands

### SSH Commands
```bash
# Connect to server
ssh kalobira@kalobiral.com.bd

# Navigate to project
cd ~/hawladaragro.farm

# Activate virtual environment
source venv/bin/activate

# Restart Passenger
touch tmp/restart.txt

# View logs
tail -f logs/django.log
tail -f ~/logs/error_log

# Check disk usage
df -h
du -sh ~/hawladaragro.farm
```

### Django Management Commands
```bash
# Run migrations
python manage.py migrate --settings=hawladar_agro.settings_prod

# Create superuser
python manage.py createsuperuser --settings=hawladar_agro.settings_prod

# Collect static files
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput

# Start development shell
python manage.py shell --settings=hawladar_agro.settings_prod
```

---

*Document Version: 1.0*
*Last Updated: 2026-03-04*
