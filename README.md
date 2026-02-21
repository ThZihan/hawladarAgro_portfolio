# Hawladar Agro - Project Amar

A Django-based portfolio website for Hawladar Agro, featuring Bangladesh's first Shariah-compliant "Cow Hotel" investment platform. The site provides transparent, ethical investment opportunities with live monitoring capabilities.

## 🌟 Features

- **Bilingual Support**: Bengali and English language toggle
- **Shariah-Compliant Investment**: Ethical, halal investment platform
- **Live Monitoring**: Real-time tracking of investments
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Project Showcase**: Display of agricultural projects
- **Blog Section**: News and updates
- **Contact Form**: Easy communication channel

## 🛠️ Tech Stack

- **Backend**: Django 5.0.1
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: SQLite (development), PostgreSQL (production recommended)
- **API**: Django REST Framework
- **Static Files**: Django's built-in static file handling

## 📁 Project Structure

```
hawladarAgro_portfolio/
├── hawladar_agro/           # Main Django project settings
│   ├── __init__.py
│   ├── settings.py          # Project configuration
│   ├── urls.py              # Main URL routing
│   ├── asgi.py              # ASGI config
│   └── wsgi.py              # WSGI config
├── portfolio/               # Main Django app
│   ├── models.py            # Database models
│   ├── views.py             # View functions
│   ├── urls.py              # App URL routing
│   ├── admin.py             # Django admin configuration
│   ├── migrations/          # Database migrations
│   └── templates/           # HTML templates
│       ├── base.html        # Base template
│       └── portfolio/       # App-specific templates
│           ├── home.html
│           ├── about.html
│           ├── contact.html
│           ├── blog_list.html
│           ├── project_list.html
│           └── ...
├── static/                  # Static files
│   ├── css/                 # Stylesheets
│   │   ├── styles.css
│   │   └── custom-sections.css
│   ├── js/                  # JavaScript files
│   │   └── script.js
│   └── images/              # Images
├── manage.py                # Django management script
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variables template
└── README.md               # This file
```

## 🚀 Installation & Setup

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)
- Virtual environment (recommended)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/ThZihan/hawladarAgro_portfolio.git
cd hawladarAgro_portfolio
```

2. **Create and activate a virtual environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
```bash
# Copy the example environment file
copy .env.example .env  # Windows
cp .env.example .env     # Linux/Mac

# Edit .env and set your values:
# - SECRET_KEY: Generate a new secret key
# - DEBUG: True for development, False for production
# - ALLOWED_HOSTS: Comma-separated list of allowed hosts
```

5. **Generate a secret key** (for production)
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

6. **Run migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

7. **Create a superuser** (optional, for admin access)
```bash
python manage.py createsuperuser
```

8. **Run the development server**
```bash
python manage.py runserver
```

9. **Access the application**
- Open your browser and navigate to: `http://127.0.0.1:8000`
- Admin panel: `http://127.0.0.1:8000/admin`

## 📝 Available Pages

- **Home**: Landing page with hero section and featured content
- **About**: Information about Hawladar Agro
- **Projects**: Showcase of agricultural projects
- **Investment**: Investment opportunities and details
- **Blog**: News and updates
- **Contact**: Contact form and information
- **Team**: Team members and experts
- **Gallery**: Image gallery

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `static/css/styles.css`:
```css
:root {
    --primary-green: #017B46;
    --primary-yellow: #FECE00;
    --text-dark: #333333;
    /* ... other variables */
}
```

### Modifying Content

- **Static Content**: Edit HTML templates in `portfolio/templates/`
- **Dynamic Content**: Use Django Admin at `/admin` to manage models

### Adding New Pages

1. Create a new template in `portfolio/templates/portfolio/`
2. Add a view function in `portfolio/views.py`
3. Add URL pattern in `portfolio/urls.py`

## 🔧 Management Commands

```bash
# Run development server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files (for production)
python manage.py collectstatic

# Start Django shell
python manage.py shell
```

## 🚀 Deployment

### Production Checklist

Before deploying to production:

1. **Set `DEBUG=False`** in `.env` file
2. **Set a strong `SECRET_KEY`** in `.env` file
3. **Configure `ALLOWED_HOSTS`** with your domain(s)
4. **Use a production database** (PostgreSQL recommended)
5. **Set up static file serving** (whitenoise or similar)
6. **Configure HTTPS/SSL**
7. **Set up proper logging**
8. **Use environment variables** for all sensitive data

### Recommended Hosting Platforms

- **Render**: https://render.com/ (Free tier available)
- **Railway**: https://railway.app/ (Free tier available)
- **Vercel**: https://vercel.com/ (With Django adapter)
- **Heroku**: https://www.heroku.com/ (Paid)
- **PythonAnywhere**: https://www.pythonanywhere.com/ (Free tier available)

## 📊 Database Models

The application includes the following models:
- `Project`: Agricultural projects
- `BlogPost`: Blog articles
- `TeamMember`: Team members
- `MediaAppearance`: Media features
- `InvestmentOpportunity`: Investment options
- `GalleryImage`: Gallery photos

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Contact

For questions or support, please contact the Hawladar Agro team.

---

**Note**: This is a Django web application. Ensure all security best practices are followed when deploying to production.
