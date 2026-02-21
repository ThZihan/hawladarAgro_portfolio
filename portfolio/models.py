from django.db import models
from django.utils.text import slugify


class TimeStampedModel(models.Model):
    """
    Abstract base class for models that need created_at and updated_at fields.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Project(TimeStampedModel):
    """
    Farm project model for tracking different agricultural projects.
    """
    PROJECT_STATUS_CHOICES = [
        ('active', 'Active'),
        ('planning', 'Planning'),
        ('completed', 'Completed'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True)
    location = models.CharField(max_length=200)
    acreage = models.DecimalField(max_digits=10, decimal_places=2, help_text="Total acreage")
    status = models.CharField(max_length=20, choices=PROJECT_STATUS_CHOICES, default='active')
    description = models.TextField()
    details = models.TextField(blank=True)
    hero_image = models.ImageField(upload_to='projects/hero/', blank=True, null=True)
    overview_image = models.ImageField(upload_to='projects/overview/', blank=True, null=True)
    
    # Project specific details
    crops = models.CharField(max_length=500, blank=True, help_text="Comma-separated list of crops")
    livestock = models.CharField(max_length=500, blank=True, help_text="Comma-separated list of livestock")
    
    # Investment details
    total_shares = models.IntegerField(default=0, help_text="Total number of shares available")
    share_price = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    
    # Uganda project specific
    lease_years = models.IntegerField(blank=True, null=True, help_text="Lease duration in years")
    
    order = models.IntegerField(default=0, help_text="Display order")
    is_featured = models.BooleanField(default=False, help_text="Feature on homepage")

    class Meta:
        ordering = ['-is_featured', 'order', '-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class BlogPost(TimeStampedModel):
    """
    Blog post model for farm-related articles and writings.
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True)
    excerpt = models.TextField(max_length=300, help_text="Short description for cards")
    content = models.TextField()
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    published_at = models.DateTimeField(blank=True, null=True)
    
    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.status == 'published' and not self.published_at:
            from django.utils import timezone
            self.published_at = timezone.now()
        super().save(*args, **kwargs)


class TeamMember(TimeStampedModel):
    """
    Team member model for farm experts and management.
    """
    ROLE_CHOICES = [
        ('owner', 'Owner'),
        ('expert', 'Expert'),
        ('manager', 'Manager'),
        ('veterinarian', 'Veterinarian'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    role_display = models.CharField(max_length=100, blank=True, help_text="Custom role title")
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='team/', blank=True, null=True)
    is_featured = models.BooleanField(default=False, help_text="Feature on homepage")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-is_featured', 'order', 'name']
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"

    def __str__(self):
        return f"{self.name} - {self.get_role_display()}"


class MediaAppearance(TimeStampedModel):
    """
    Media appearance model for tracking press and media coverage.
    """
    MEDIA_TYPE_CHOICES = [
        ('newspaper', 'Newspaper'),
        ('tv', 'TV'),
        ('online', 'Online'),
        ('radio', 'Radio'),
    ]

    outlet_name = models.CharField(max_length=200)
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPE_CHOICES)
    logo = models.ImageField(upload_to='media/', blank=True, null=True)
    article_url = models.URLField(blank=True, help_text="Link to the article/coverage")
    description = models.TextField(blank=True)
    coverage_date = models.DateField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-is_featured', 'order', '-coverage_date']
        verbose_name = "Media Appearance"
        verbose_name_plural = "Media Appearances"

    def __str__(self):
        return self.outlet_name


class InvestmentOpportunity(TimeStampedModel):
    """
    Investment opportunity model for crowdfunding and investment details.
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True)
    description = models.TextField()
    total_shares = models.IntegerField(help_text="Total shares available")
    available_shares = models.IntegerField(default=0, help_text="Shares currently available")
    price_per_share = models.DecimalField(max_digits=12, decimal_places=2)
    minimum_investment = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    expected_return = models.CharField(max_length=200, blank=True, help_text="Expected ROI description")
    investment_duration = models.CharField(max_length=100, blank=True, help_text="Duration of investment")
    
    # Project association
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='investment_opportunities')
    
    # Status
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    
    # Additional info
    terms_document = models.FileField(upload_to='investment/documents/', blank=True, null=True)
    
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-featured', 'order', '-created_at']
        verbose_name = "Investment Opportunity"
        verbose_name_plural = "Investment Opportunities"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def percentage_sold(self):
        if self.total_shares > 0:
            return ((self.total_shares - self.available_shares) / self.total_shares) * 100
        return 0


class GalleryImage(TimeStampedModel):
    """
    Gallery image model for showcasing farm photos.
    """
    CATEGORY_CHOICES = [
        ('cattle', 'Cattle'),
        ('crops', 'Crops'),
        ('farm_overview', 'Farm Overview'),
        ('team', 'Team'),
        ('events', 'Events'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='other')
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-is_featured', 'order', '-created_at']
        verbose_name = "Gallery Image"
        verbose_name_plural = "Gallery Images"

    def __str__(self):
        return self.title
