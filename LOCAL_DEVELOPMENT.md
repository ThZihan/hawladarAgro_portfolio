# Local Development Guide - Hawladar Agro

This guide helps you set up and run the Hawladar Agro Django project locally for development and debugging.

## Prerequisites

- Python 3.11 or higher
- pip (Python package manager)
- Git
- Virtual environment (venv)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd hawladarAgro_portfolio
```

### 2. Create Virtual Environment

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

```bash
# Copy the example file
copy .env.example .env

# Edit .env with your settings
# For local development, you can use the defaults
```

### 5. Run Database Migrations

```bash
python manage.py migrate
```

### 6. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 7. Run Development Server

```bash
# Using default settings (development)
python manage.py runserver

# Or explicitly specify development settings
set DJANGO_SETTINGS_MODULE=hawladar_agro.settings_dev  # Windows
export DJANGO_SETTINGS_MODULE=hawladar_agro.settings_dev  # macOS/Linux
python manage.py runserver
```

### 8. Access the Application

Open your browser and navigate to:
- **Website:** http://localhost:8000
- **Admin Panel:** http://localhost:8000/admin

## Development Settings

The project uses separate settings files for development and production:

- **`settings.py`** - Base settings (shared)
- **`settings_dev.py`** - Development settings (SQLite, DEBUG=True)
- **`settings_prod.py`** - Production settings (PostgreSQL, DEBUG=False)

### Using Development Settings

```bash
# Windows
set DJANGO_SETTINGS_MODULE=hawladar_agro.settings_dev

# macOS/Linux
export DJANGO_SETTINGS_MODULE=hawladar_agro.settings_dev
```

### Using Production Settings Locally

```bash
# Windows
set DJANGO_SETTINGS_MODULE=hawladar_agro.settings_prod

# macOS/Linux
export DJANGO_SETTINGS_MODULE=hawladar_agro.settings_prod
```

## Common Development Tasks

### Create New Migrations

```bash
python manage.py makemigrations
```

### Apply Migrations

```bash
python manage.py migrate
```

### Collect Static Files (for testing)

```bash
python manage.py collectstatic --noinput
```

### Open Django Shell

```bash
python manage.py shell
```

### Create Django App

```bash
python manage.py startapp <app_name>
```

### Run Tests

```bash
python manage.py test
```

### Check for Issues

```bash
python manage.py check
```

## Project Structure

```
hawladarAgro_portfolio/
├── manage.py                  # Django management script
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── requirements.txt          # Python dependencies
├── requirements-prod.txt    # Production dependencies
├── hawladar_agro/          # Project configuration
│   ├── settings.py          # Base settings
│   ├── settings_dev.py     # Development settings
│   ├── settings_prod.py    # Production settings
│   ├── urls.py            # Main URL configuration
│   └── wsgi.py           # WSGI configuration
├── portfolio/              # Main Django app
│   ├── models.py          # Database models
│   ├── views.py           # View functions
│   ├── urls.py           # App URL configuration
│   ├── admin.py          # Admin configuration
│   └── templates/        # HTML templates
├── static/               # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── media/                # User uploaded files (created by Django)
├── db.sqlite3           # SQLite database (development)
└── plans/               # Planning documents
```

## Troubleshooting

### Port 8000 Already in Use

```bash
# Use a different port
python manage.py runserver 8080
```

### Database Migration Errors

```bash
# Reset database (WARNING: This deletes all data)
rm db.sqlite3
python manage.py migrate
```

### Static Files Not Loading

```bash
# Collect static files
python manage.py collectstatic --noinput

# Ensure DEBUG=True in settings_dev.py
```

### Import Errors

```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

## Git Workflow

### Check Status

```bash
git status
```

### Add Changes

```bash
git add .
```

### Commit Changes

```bash
git commit -m "Your commit message"
```

### Push to Remote

```bash
git push origin main
```

### Pull Latest Changes

```bash
git pull origin main
```

## Environment Variables

The `.env` file contains:

| Variable | Description | Default (Dev) |
|----------|-------------|----------------|
| `SECRET_KEY` | Django secret key | Auto-generated |
| `DEBUG` | Debug mode | True |
| `ALLOWED_HOSTS` | Allowed hostnames | localhost,127.0.0.1 |
| `DB_NAME` | Database name | (SQLite - not used) |
| `DB_USER` | Database user | (SQLite - not used) |
| `DB_PASSWORD` | Database password | (SQLite - not used) |
| `DB_HOST` | Database host | (SQLite - not used) |
| `DB_PORT` | Database port | (SQLite - not used) |

## Useful Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Python Virtual Environments](https://docs.python.org/3/library/venv.html)

## Support

For issues or questions, refer to:
- [`plans/deployment-plan.md`](plans/deployment-plan.md) - Full deployment guide
- [`plans/deployment-checklist.md`](plans/deployment-checklist.md) - Deployment checklist

---

*Last Updated: 2026-03-04*
