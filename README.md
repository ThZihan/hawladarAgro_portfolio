# Hawladar Agro - Project Amar

A Django-based portfolio website for Hawladar Agro's "Project Amar" - Bangladesh's first Shariah-compliant cow hotel investment platform. This platform enables transparent, halal investment opportunities with live monitoring capabilities.

## 🌟 Features

### Core Functionality
- **Bilingual Support**: Full Bengali and English language support with easy switching
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Investment Opportunities**: Display of various investment plans with transparent profit sharing
- **Project Showcase**: Detailed information about ongoing and completed projects
- **Blog System**: News and updates about the agricultural investment sector
- **Team Profiles**: Information about the expert team behind the project
- **Gallery**: Visual showcase of farm facilities and cattle
- **Contact Form**: Easy way for visitors to get in touch

### Technical Features
- **Django 5.0.1**: Built with the latest Django framework
- **Django REST Framework**: API-ready architecture
- **SQLite Database**: Lightweight database for easy local development
- **Static Asset Management**: Organized CSS, JavaScript, and image files
- **Environment Configuration**: Secure configuration using environment variables

## 🎨 Design Specifications

### Typography
- **Primary Fonts**: Inter, Open Sans, Hind Siliguri (for Bengali)
- **Font Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- **Headings**: h1 (48px), h2 (36px), h3 (28px)
- **Body Text**: 16-18px with 1.7 line height

### Color Palette
```css
--primary-green: #017B46
--primary-yellow: #FECE00
--accent-yellow: #FFCC00
--text-dark: #333333
--text-light: #666666
--white: #ffffff
--border-color: #d8d8d8
```

### Layout Structure
1. **Header/Navigation** - Fixed position with logo, navigation menu, and language toggle
2. **Hero Section** - Trust badges, main heading, and call-to-action buttons
3. **About Section** - Company overview and mission
4. **Projects Section** - Grid of investment projects
5. **Investment Section** - Investment opportunities and plans
6. **Blog Section** - Latest news and updates
7. **Team Section** - Team member profiles
8. **Gallery Section** - Image gallery
9. **Contact Section** - Contact form and information
10. **Footer** - Links, social media, and company info

### Responsive Breakpoints
- **Desktop**: 981px and above
- **Tablet**: 768px - 980px
- **Mobile**: 479px - 767px
- **Small Mobile**: Below 479px

## 📁 Project Structure

```
hawladarAgro_portfolio/
├── hawladar_agro/           # Django project settings
│   ├── __init__.py
│   ├── settings.py          # Main settings file
│   ├── urls.py              # Main URL configuration
│   ├── asgi.py              # ASGI config
│   └── wsgi.py              # WSGI config
├── portfolio/               # Main Django app
│   ├── models.py            # Database models
│   ├── views.py             # View functions
│   ├── urls.py              # App URL configuration
│   ├── admin.py             # Admin configuration
│   ├── migrations/          # Database migrations
│   └── templates/           # HTML templates
│       ├── base.html         # Base template
│       └── portfolio/       # Page templates
│           ├── home.html
│           ├── about.html
│           ├── investment.html
│           ├── project_list.html
│           ├── project_detail.html
│           ├── blog_list.html
│           ├── blog_detail.html
│           ├── team_list.html
│           ├── gallery.html
│           └── contact.html
├── static/                  # Static files
│   ├── css/
│   │   ├── styles.css       # Main stylesheet
│   │   └── custom-sections.css
│   ├── js/
│   │   └── script.js        # JavaScript functionality
│   └── images/              # Image assets
├── manage.py                # Django management script
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ThZihan/hawladarAgro_portfolio.git
cd hawladarAgro_portfolio
```

2. **Create a virtual environment** (recommended)
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
# Copy the example .env file
copy .env.example .env  # Windows
cp .env.example .env     # macOS/Linux
```

5. **Run migrations**
```bash
python manage.py migrate
```

6. **Create a superuser** (optional, for admin access)
```bash
python manage.py createsuperuser
```

7. **Run the development server**
```bash
python manage.py runserver
```

8. **Open your browser**
Navigate to `http://127.0.0.1:8000` to view the website.

### Accessing the Admin Panel
After creating a superuser, access the admin panel at `http://127.0.0.1:8000/admin/`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Generate a new secret key using:
# python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
SECRET_KEY=your-secret-key-here

# DEBUG mode - Set to False in production
DEBUG=True

# ALLOWED_HOSTS - Comma-separated list of allowed hostnames
# For production: yourdomain.com,www.yourdomain.com
# For development: localhost,127.0.0.1
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database Configuration

By default, the project uses SQLite for easy local development. The database file (`db.sqlite3`) is created automatically when you run migrations.

For production, consider using PostgreSQL or MySQL. Update the `DATABASES` setting in `hawladar_agro/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_database_name',
        'USER': 'your_database_user',
        'PASSWORD': 'your_database_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 📝 Available Commands

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

## 🎯 Customization

### Adding Content

1. **Projects**: Use the Django admin panel to add projects
2. **Blog Posts**: Use the Django admin panel to add blog posts
3. **Team Members**: Use the Django admin panel to add team members
4. **Gallery Images**: Use the Django admin panel to add gallery images

### Modifying Styles

Edit the CSS files in `static/css/`:
- `styles.css` - Main stylesheet
- `custom-sections.css` - Section-specific styles

### Modifying Templates

Edit the HTML templates in `portfolio/templates/`:
- `base.html` - Base template with common elements
- `portfolio/*.html` - Page-specific templates

## 🔒 Security for Production

Before deploying to production:

1. **Set DEBUG to False** in your `.env` file
2. **Generate a secure SECRET_KEY** and add it to your `.env` file
3. **Configure ALLOWED_HOSTS** with your domain name(s)
4. **Use HTTPS** for all connections
5. **Set up a production database** (PostgreSQL recommended)
6. **Configure static files serving** properly
7. **Set up proper logging**

## 📦 Dependencies

See `requirements.txt` for the full list of dependencies:
- Django==5.0.1
- djangorestframework==3.14.0
- psycopg2-binary==2.9.9
- Pillow==10.2.0
- django-environ==0.11.2

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is the property of Hawladar Agro. All rights reserved.

## 📞 Contact

For questions or support, please contact the Hawladar Agro team.

---

**Note**: This is a Django web application. For production deployment, use a hosting service that supports Django (e.g., Heroku, Render, Railway, DigitalOcean, AWS, etc.). GitHub Pages is not suitable for Django applications as it only supports static sites.
