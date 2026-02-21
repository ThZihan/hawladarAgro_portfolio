# Hawladar Agro - Project Amar

A Django-based portfolio website for Hawladar Agro, featuring Bangladesh's first Shariah-compliant "Cow Hotel" investment platform. The platform offers transparent, halal investment opportunities with live monitoring capabilities.

## 🎨 Features

### Core Functionality
- **Bilingual Support**: Full Bengali and English language support with easy switching
- **Shariah-Compliant Investment**: Ethical halal returns guaranteed
- **Live Monitoring**: Real-time tracking of invested cattle
- **Transparent Profit Sharing**: 3-way profit distribution model
- **Government Certified**: Fully insured and verified operations

### Technical Features
- **Django 5.0.1**: Modern Python web framework
- **Django REST Framework**: API capabilities for future integrations
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Accessibility**: ARIA labels and keyboard navigation support

## 📁 Project Structure

```
hawladarAgro_portfolio/
├── manage.py                 # Django management script
├── requirements.txt          # Python dependencies
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # This file
├── hawladar_agro/           # Main Django project settings
│   ├── __init__.py
│   ├── asgi.py              # ASGI config
│   ├── settings.py          # Project settings
│   ├── urls.py              # Main URL configuration
│   └── wsgi.py              # WSGI config
├── portfolio/               # Main Django app
│   ├── __init__.py
│   ├── admin.py             # Django admin configuration
│   ├── apps.py              # App configuration
│   ├── models.py            # Database models
│   ├── views.py             # View functions
│   ├── urls.py              # App URL configuration
│   ├── tests.py             # Unit tests
│   └── migrations/          # Database migrations
├── portfolio/templates/     # HTML templates
│   ├── base.html            # Base template
│   └── portfolio/           # Page templates
│       ├── home.html
│       ├── about.html
│       ├── contact.html
│       ├── investment.html
│       ├── project_list.html
│       ├── project_detail.html
│       ├── blog_list.html
│       ├── blog_detail.html
│       ├── gallery.html
│       └── team_list.html
├── static/                  # Static files
│   ├── css/
│   │   ├── styles.css       # Main stylesheet
│   │   └── custom-sections.css  # Custom section styles
│   ├── js/
│   │   └── script.js        # JavaScript functionality
│   └── images/              # Image assets
└── plans/                   # Project planning documents
    ├── portfolio-improvement-plan.md
    ├── ui-ux-audit-report.md
    └── ui-ux-implementation-plan.md
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
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

# macOS/Linux
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
cp .env.example .env     # macOS/Linux

# Edit .env and set your values:
# - Generate a secret key: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
# - Set DEBUG=True for development, DEBUG=False for production
# - Set ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com for production
```

5. **Run database migrations**
```bash
python manage.py migrate
```

6. **Create a superuser (optional, for admin access)**
```bash
python manage.py createsuperuser
```

7. **Collect static files (for production)**
```bash
python manage.py collectstatic
```

8. **Run the development server**
```bash
python manage.py runserver
```

9. **Access the application**
- Open your browser and navigate to `http://127.0.0.1:8000`
- Admin panel: `http://127.0.0.1:8000/admin`

## 🎨 Design Specifications

### Color Palette
```css
--primary-green: #017B46
--primary-yellow: #FECE00
--accent-yellow: #FFCC00
--text-dark: #333333
--text-light: #666666
--white: #ffffff
```

### Typography
- **Primary Font**: Inter, Open Sans, Hind Siliguri (Google Fonts)
- **Language Support**: Bengali and English
- **Responsive Typography**: Scales appropriately across devices

### Responsive Breakpoints
- **Desktop**: 981px and above
- **Tablet**: 768px - 980px
- **Mobile**: 479px - 767px
- **Small Mobile**: Below 479px

## 📱 Pages & Sections

1. **Home Page**
   - Hero section with trust badges
   - Featured projects showcase
   - Investment opportunities
   - Media appearances
   - Latest blog posts

2. **Projects Page**
   - Project listing with filters
   - Individual project details
   - Project gallery

3. **About Page**
   - Company information
   - Team members
   - Mission and values

4. **Investment Page**
   - Investment opportunities
   - ROI information
   - Investment process

5. **Blog Page**
   - Blog listing
   - Individual blog posts
   - Categories and tags

6. **Contact Page**
   - Contact form
   - Location information
   - Social media links

7. **Gallery Page**
   - Image gallery
   - Video content

## 🔧 Development

### Running Tests
```bash
python manage.py test
```

### Creating New Migrations
```bash
python manage.py makemigrations
```

### Applying Migrations
```bash
python manage.py migrate
```

### Django Shell
```bash
python manage.py shell
```

## 📦 Dependencies

See [`requirements.txt`](requirements.txt) for the complete list:
- Django 5.0.1
- Django REST Framework 3.14.0
- psycopg2-binary 2.9.9 (PostgreSQL adapter)
- Pillow 10.2.0 (Image handling)
- django-environ 0.11.2 (Environment variables)

## 🔒 Security

- **Environment Variables**: Sensitive data stored in `.env` (not committed to git)
- **DEBUG Mode**: Set to `False` in production
- **ALLOWED_HOSTS**: Configure properly for production domains
- **Secret Key**: Generate a unique secret key for production

## 🌐 Deployment

This Django project requires a proper hosting platform that supports Python/Django:

### Recommended Platforms
- **Render**: Free tier available, easy Django deployment
- **Vercel**: Supports Django with some configuration
- **Railway**: Simple deployment with PostgreSQL
- **Heroku**: Industry-standard Django hosting
- **PythonAnywhere**: Django-focused hosting

### Production Checklist
- [ ] Set `DEBUG=False` in `.env`
- [ ] Set `ALLOWED_HOSTS` to your domain
- [ ] Generate a strong `SECRET_KEY`
- [ ] Configure a production database (PostgreSQL recommended)
- [ ] Set up static file serving (whitenoise or CDN)
- [ ] Configure HTTPS/SSL
- [ ] Set up logging
- [ ] Configure email backend (if needed)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software for Hawladar Agro. All rights reserved.

## 📞 Contact

For inquiries about this project, please contact the development team.

---

**Note**: This is a Django web application. It requires a Python/Django hosting environment and cannot be deployed to GitHub Pages (which only supports static sites).
