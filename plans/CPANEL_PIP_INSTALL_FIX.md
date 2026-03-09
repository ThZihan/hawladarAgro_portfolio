# Fix cPanel Pip Install Error

## Error

```
ERROR: Could not open requirements file: [Errno 21] Is a directory: 'hawladeragro.farm/'
```

## Root Cause

cPanel is treating the application root as a directory path instead of a file path. The requirements file needs to be in the project directory.

## Solution

### Option 1: Use cPanel's Built-in Virtual Environment (Recommended)

cPanel has its own virtual environment. Use it directly:

1. In cPanel, go to **Setup Python App**
2. Find your **hawladaragro.farm** application
3. Click on **"Enter to virtual environment"** link
4. Copy the command shown:
   ```
   source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate && cd /home/kalobira/hawladeragro.farm
   ```
5. Paste this command in SSH terminal
6. Install dependencies:
   ```bash
   pip install -r requirements-cpanel.txt
   ```

### Option 2: Install via SSH in cPanel's Virtual Environment

1. Connect via SSH
2. Activate cPanel's virtual environment:
   ```bash
   source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
   cd /home/kalobira/hawladeragro.farm
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements-cpanel.txt
   ```

### Option 3: Install Each Package Individually via SSH

If the above doesn't work, install each package separately:

```bash
# Activate cPanel's virtual environment
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
cd /home/kalobira/hawladeragro.farm

# Install each package individually
pip install Django==4.2.11
pip install django-environ==0.11.2
pip install djangorestframework==3.14.0
pip install psycopg2-binary==2.9.9
pip install Pillow==10.2.0
pip install gunicorn==21.2.0
pip install whitenoise==6.6.0
pip install django-cors-headers==4.3.1
pip install django-anymail==10.2
```

### Option 4: Use requirements.txt File Instead

Try using the existing `requirements-py39-prod.txt` file:

```bash
# Activate cPanel's virtual environment
source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate
cd /home/kalobira/hawladeragro.farm

# Install using existing requirements file
pip install -r requirements-py39-prod.txt
```

---

## After Installing Dependencies

1. In cPanel, go to **Setup Python App**
2. Find your **hawladaragro.farm** application
3. Click **Restart** button
4. Wait for application to restart

## Test Deployment

Visit **https://hawladaragro.farm** - you should now see the Django application!

---

## Troubleshooting

### Error: "ModuleNotFoundError: No module named 'django'"

This means Django is not installed in cPanel's virtual environment. Use Option 1, 2, or 3 above to install it.

### Error: "ModuleNotFoundError: No module named 'environ'"

This means django-environ is not installed. Use Option 1, 2, or 3 above to install it.

### Error: "Permission denied" when installing

You may need to use `sudo`:
```bash
sudo pip install -r requirements-cpanel.txt
```

### Error: Still showing directory listing

Check Passenger logs:
1. In cPanel Python App page, scroll down to **Logs** section
2. Click on **passenger.log** or **passenger_error.log**
3. Look for error messages

---

## Quick Reference

### Recommended Approach (Option 1):

1. Copy the "Enter to virtual environment" command from cPanel
2. Paste it in SSH terminal
3. Run: `pip install -r requirements-cpanel.txt`
4. Restart application in cPanel
5. Test deployment

### Alternative (Option 3):

1. Connect via SSH
2. Activate cPanel's virtual environment
3. Install each package individually
4. Restart application in cPanel
5. Test deployment

---

**Last Updated:** 2026-03-09
**Status:** Fix for cPanel pip install error
