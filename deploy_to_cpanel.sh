#!/bin/bash
#
# Django Deployment Script for cPanel
# This script deploys the Hawladar Agro Django project to cPanel
#
# Usage: bash deploy_to_cpanel.sh
#

# Configuration
DOMAIN="hawladaragro.farm"
PROJECT_DIR="$HOME/hawladaragro.farm"
PUBLIC_HTML="$HOME/public_html"
PYTHON_VERSION="3.11"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Start deployment
echo "=========================================="
echo "Django Deployment to cPanel"
echo "=========================================="
echo "Domain: $DOMAIN"
echo "Project Directory: $PROJECT_DIR"
echo "Python Version: $PYTHON_VERSION"
echo "=========================================="
echo ""

# Step 1: Check project directory
print_step "Checking project directory..."
if [ ! -d "$PROJECT_DIR" ]; then
    print_error "Project directory not found: $PROJECT_DIR"
    print_info "Please clone or upload the project first."
    exit 1
fi
print_info "Project directory found"
cd "$PROJECT_DIR"

# Step 2: Create virtual environment
print_step "Creating/Updating virtual environment..."
if [ ! -d "venv" ]; then
    print_info "Creating new virtual environment..."
    /usr/bin/python$PYTHON_VERSION -m venv venv
else
    print_info "Virtual environment already exists"
fi

# Step 3: Activate virtual environment
print_step "Activating virtual environment..."
source venv/bin/activate
print_info "Virtual environment activated"

# Step 4: Upgrade pip
print_step "Upgrading pip..."
pip install --upgrade pip -q

# Step 5: Install requirements
print_step "Installing Python dependencies..."
if [ -f "requirements-prod.txt" ]; then
    pip install -r requirements-prod.txt
elif [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
else
    print_error "requirements.txt not found!"
    exit 1
fi

# Step 6: Check .env file
print_step "Checking environment configuration..."
if [ ! -f ".env" ]; then
    print_warning ".env file not found!"
    print_info "Creating .env from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warning "Please update .env with your production values!"
        print_info "Edit: nano $PROJECT_DIR/.env"
        exit 1
    else
        print_error ".env.example not found!"
        exit 1
    fi
fi
print_info ".env file found"

# Step 7: Run migrations
print_step "Running database migrations..."
python manage.py migrate --settings=hawladar_agro.settings_prod --noinput
if [ $? -eq 0 ]; then
    print_info "Migrations completed successfully"
else
    print_error "Migration failed!"
    exit 1
fi

# Step 8: Collect static files
print_step "Collecting static files..."
python manage.py collectstatic --settings=hawladar_agro.settings_prod --noinput --clear
if [ $? -eq 0 ]; then
    print_info "Static files collected successfully"
else
    print_error "Static files collection failed!"
    exit 1
fi

# Step 9: Create necessary directories
print_step "Creating necessary directories..."
mkdir -p logs
mkdir -p media
mkdir -p public_html/static
mkdir -p public_html/media

# Step 10: Set correct permissions
print_step "Setting file permissions..."
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod 600 .env 2>/dev/null
chmod +x passenger_wsgi.py 2>/dev/null
print_info "Permissions set"

# Step 11: Setup Passenger
print_step "Configuring Passenger..."
if [ -f "passenger_wsgi.py" ]; then
    print_info "passenger_wsgi.py found"
    
    # Create tmp directory for Passenger restart
    mkdir -p tmp
    touch tmp/restart.txt
    print_info "Passenger restart signal sent"
else
    print_warning "passenger_wsgi.py not found!"
fi

# Step 12: Configure domain document root
print_step "Configuring domain..."
print_info "Document root should be: $PROJECT_DIR/public_html"
print_warning "Please verify domain configuration in cPanel:"
print_warning "  Domains -> $DOMAIN -> Modify Document Root"
print_warning "  Set to: $PROJECT_DIR/public_html"

# Step 13: Create public_html symlink if needed
if [ ! -L "$PUBLIC_HTML/$DOMAIN" ]; then
    print_step "Creating public_html symlink..."
    ln -sfn "$PROJECT_DIR/public_html" "$PUBLIC_HTML/$DOMAIN"
    print_info "Symlink created: $PUBLIC_HTML/$DOMAIN -> $PROJECT_DIR/public_html"
fi

# Step 14: Summary
echo ""
echo "=========================================="
print_info "Deployment completed!"
echo "=========================================="
echo ""
print_info "Next steps:"
echo "  1. Verify domain configuration in cPanel"
echo "  2. Configure SSL certificate"
echo "  3. Test the site at https://$DOMAIN"
echo "  4. Check logs: tail -f $PROJECT_DIR/logs/django.log"
echo ""
print_info "Useful commands:"
echo "  - Restart Passenger: touch $PROJECT_DIR/tmp/restart.txt"
echo "  - View logs: tail -f $PROJECT_DIR/logs/django.log"
echo "  - Run management commands: cd $PROJECT_DIR && source venv/bin/activate && python manage.py <command> --settings=hawladar_agro.settings_prod"
echo ""
echo "=========================================="
