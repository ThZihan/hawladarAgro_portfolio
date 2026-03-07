"""
Passenger WSGI configuration for cPanel deployment.
This file is used by Passenger to serve the Django application.
"""
import os
import sys

# Set the path to your project directory
# Adjust this path based on your actual cPanel home directory
project_path = '/home/kalobira/hawladaragro.farm'

# Add project path to Python path if not already there
if project_path not in sys.path:
    sys.path.insert(0, project_path)

# Set Django settings module to production settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hawladar_agro.settings_prod')

# Import Django and get the WSGI application
import django
from django.core.wsgi import get_wsgi_application

# Setup Django
django.setup()

# Get the WSGI application
application = get_wsgi_application()
