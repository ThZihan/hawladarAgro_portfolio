# Fix cPanel Application Restart Error

## Error Messages

1. **"No such application (or application not configured) 'hawladeragro.farm'"**
2. **"Unable to set environment variables in htaccess file for application.Error: [Errno 2] No such file or directory: '/home/kalobira/hawladeragro.farm/public_html/.htaccess'"**

## Root Cause

The cPanel Python application configuration may have been corrupted or deleted. The application needs to be recreated from scratch.

## Solution: Recreate Python Application

### Step 1: Delete Existing Application

1. In cPanel, go to **Setup Python App**
2. Find the **hawladaragro.farm** application (if it still exists)
3. Click **Destroy** or **Delete**
4. Confirm deletion

### Step 2: Create New Application

1. Click **Create Application**
2. Configure with these EXACT values:

   - **Python Version:** 3.9
   - **Application Root:** `hawladeragro.farm`
   - **Application URL:** `hawladaragro.farm`
   - **Application Entry Point:** `passenger_wsgi.py`
   - **Application Startup File:** `passenger_wsgi.py`
   - **Passenger Log File:** `logs/passenger.log`
   - **Passenger Error Log File:** `logs/passenger_error.log`

3. Click **Create**

### Step 3: Install Dependencies

After creating the application:

1. Click the **Configure** button (or gear icon)
2. Scroll down to **"Run Pip Install"** section
3. Enter: `requirements-cpanel.txt`
4. Click **Run Pip Install**
5. Wait for installation to complete

### Step 4: Create .htaccess File

The error indicates missing `.htaccess` file. Create it:

```bash
cd ~/hawladeragro.farm/public_html
cat > .htaccess << 'EOF'
PassengerEnabled on
PassengerAppRoot /home/kalobira/hawladeragro.farm
PassengerBaseURI /
EOF
```

### Step 5: Restart Application

1. Click the **Restart** button
2. Wait for application to restart

### Step 6: Test Deployment

Visit **https://hawladaragro.farm** - you should now see the Django application!

---

## Alternative: Use cPanel's Built-in Application Setup

If the above doesn't work, try using cPanel's alternative method:

1. In cPanel, go to **Setup Python App**
2. Click **Create Application**
3. Use the **"Enter to virtual environment"** command shown:
   ```
   source /home/kalobira/virtualenv/hawladeragro.farm/3.9/bin/activate && cd /home/kalobira/hawladeragro.farm
   ```
4. Then install dependencies:
   ```
   pip install -r requirements-cpanel.txt
   ```

---

## Troubleshooting

### Error: "Application not found"

This means the application was deleted. Use Step 1 above to recreate it.

### Error: "No such file or directory: .htaccess"

Create the .htaccess file using Step 4 above.

### Error: "ModuleNotFoundError: No module named 'django'"

Install dependencies using Step 3 above.

### Error: Directory listing still shows

Check the Passenger logs:
1. In cPanel Python App page, scroll down to **Logs** section
2. Click on **passenger.log** or **passenger_error.log**
3. Look for error messages

---

## Quick Reference

1. Delete existing application
2. Create new application with correct settings
3. Install dependencies using requirements-cpanel.txt
4. Create .htaccess file
5. Restart application
6. Test deployment at https://hawladaragro.farm

---

**Last Updated:** 2026-03-09
**Status:** Fix for cPanel application restart error
