# cPanel Deployment Inputs Required

**Project:** Hawladar Agro Django Portfolio
**Domain:** https://hawladeragro.farm/
**Deployment Date:** TBD

---

## Required Information Checklist

Please gather the following information before starting deployment:

### 1. cPanel Access Credentials

| Field | Description | Example |
|-------|-------------|---------|
| **cPanel URL** | URL to access cPanel | `https://hawladeragro.farm:2083` |
| **cPanel Username** | Your cPanel username | `hawlader` |
| **cPanel Password** | Your cPanel password | `********` |

**How to find:**
- Check your hosting provider's welcome email
- Contact your hosting provider if you don't have this information

---

### 2. SSH Access Credentials

| Field | Description | Example |
|-------|-------------|---------|
| **SSH Host** | Server hostname or IP address | `hawladeragro.farm` or `192.168.1.1` |
| **SSH Port** | SSH port number | `22` (default) |
| **SSH Username** | SSH username (usually same as cPanel) | `hawlader` |
| **SSH Password** | SSH password or use SSH key | `********` |

**How to find:**
- Same as cPanel credentials (usually)
- Check cPanel → SSH Access section
- Contact your hosting provider

---

### 3. Existing Site Information

| Field | Description | Example |
|-------|-------------|---------|
| **Domain Name** | Your website domain | `hawladeragro.farm` |
| **Document Root** | Where files are stored | `/home/hawlader/public_html` |
| **Platform Type** | What's currently running | WordPress, Static HTML, PHP, etc. |
| **Database Type** | Database system used | MySQL, PostgreSQL, SQLite |
| **Database Name** | Existing database name | `hawlader_wp` |
| **Database User** | Database username | `hawlader_user` |
| **Database Password** | Database password | `********` |
| **Database Host** | Database server | `localhost` |

**How to find:**
- Document Root: cPanel → File Manager
- Database Info: cPanel → phpMyAdmin (for MySQL) or phpPgAdmin (for PostgreSQL)
- Platform Type: Check your website source code or contact developer

---

### 4. New Django Project Configuration

| Field | Description | Value |
|-------|-------------|-------|
| **Git Repository** | GitHub repository URL | `https://github.com/ThZihan/hawladarAgro_portfolio.git` |
| **Branch** | Git branch to deploy | `main` |
| **Python Version** | Required Python version | `3.11` or higher |
| **Database Type** | Database for Django | `PostgreSQL` |
| **New Database Name** | PostgreSQL database name | `hawladaragro_db` |
| **New Database User** | PostgreSQL database user | `hawladaragro_user` |
| **New Database Password** | Generate strong password | `[Generate during setup]` |

---

### 5. Email Configuration (Optional)

| Field | Description | Example |
|-------|-------------|---------|
| **Email Host** | SMTP server | `smtp.gmail.com` |
| **Email Port** | SMTP port | `587` (TLS) or `465` (SSL) |
| **Email Address** | Your email address | `info@hawladeragro.farm` |
| **Email Password** | Email or app password | `********` |
| **From Email** | Default sender email | `noreply@hawladeragro.farm` |

**How to find:**
- For Gmail: Use app-specific password (enable 2FA first)
- For custom email: Check your email provider settings

---

### 6. SSL Certificate

| Field | Description | Value |
|-------|-------------|-------|
| **SSL Type** | Certificate type | Let's Encrypt (free) or Custom |
| **Force HTTPS** | Redirect HTTP to HTTPS | `Yes` |

**How to find:**
- cPanel → SSL/TLS Status
- Check if Let's Encrypt is available (most hosting providers offer it)

---

## Information Gathering Template

Copy and fill in this template:

```
=== CPANEL ACCESS ===
cPanel URL: ______________________________
cPanel Username: _______________________
cPanel Password: _______________________

=== SSH ACCESS ===
SSH Host: _____________________________
SSH Port: ____________________________
SSH Username: _________________________
SSH Password: _________________________

=== EXISTING SITE ===
Domain: hawladeragro.farm
Document Root: _______________________
Platform: ____________________________
Database Type: ______________________
Database Name: _____________________
Database User: _____________________
Database Password: _________________
Database Host: ____________________

=== EMAIL CONFIGURATION (OPTIONAL) ===
Email Host: ________________________
Email Port: ________________________
Email Address: _____________________
Email Password: ____________________
From Email: ________________________

=== SSL ===
SSL Type: Let's Encrypt / Custom
Force HTTPS: Yes / No
```

---

## How to Find This Information

### cPanel Access
1. Check your hosting provider's welcome email
2. Login to your hosting provider's client area
3. Look for "cPanel Login" or "Control Panel" credentials

### SSH Access
1. Login to cPanel
2. Navigate to "SSH Access" under "Advanced"
3. If SSH is not enabled, contact your hosting provider

### Existing Site Information

**Document Root:**
1. Login to cPanel
2. Navigate to "File Manager"
3. Look for your domain folder (usually `public_html` or domain name)

**Database Information:**
1. Login to cPanel
2. Navigate to "phpMyAdmin" (for MySQL) or "phpPgAdmin" (for PostgreSQL)
3. View database list and credentials
4. If WordPress: Check `wp-config.php` file for database credentials

**Platform Type:**
1. Check your website's source code
2. Look for WordPress files (`wp-config.php`, `wp-content/`)
3. Or contact your previous developer

### Email Configuration
1. For Gmail: Go to Google Account → Security → App Passwords
2. For custom email: Check your email provider's SMTP settings
3. Contact your email provider if unsure

### SSL Certificate
1. Login to cPanel
2. Navigate to "SSL/TLS Status"
3. Check if Let's Encrypt is available (most providers offer it for free)

---

## Security Notes

⚠️ **Important Security Reminders:**

1. **Never share your passwords** via email or unsecured channels
2. **Use strong passwords** - at least 16 characters with mixed case, numbers, and symbols
3. **Generate new passwords** for the Django deployment (don't reuse old ones)
4. **Enable 2FA** on all accounts where available
5. **Keep this document secure** - it contains sensitive information
6. **Delete this document** after deployment or store securely

---

## Password Generation

Generate strong passwords using these methods:

### Using Python (on your local machine):
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Using OpenSSL:
```bash
openssl rand -base64 32
```

### Online Password Generators:
- https://passwordsgenerator.net/
- https://www.random.org/passwords/

---

## Contact Information

If you need help gathering this information:

- **Hosting Provider:** [Your hosting provider's support]
- **Developer:** [Your developer's contact]
- **cPanel Documentation:** https://docs.cpanel.net/

---

## Next Steps

Once you have all the required information:

1. ✅ Fill in the Information Gathering Template above
2. ✅ Verify all credentials work (login to cPanel, SSH, etc.)
3. ✅ Proceed with deployment using [`BACKUP_AND_DEPLOYMENT_PLAN.md`](BACKUP_AND_DEPLOYMENT_PLAN.md:1)

---

## Quick Reference

| What You Need | Where to Find It |
|---------------|------------------|
| cPanel Login | Hosting welcome email |
| SSH Access | cPanel → SSH Access |
| Document Root | cPanel → File Manager |
| Database Info | cPanel → phpMyAdmin/phpPgAdmin |
| Email Settings | Email provider documentation |
| SSL Certificate | cPanel → SSL/TLS Status |
