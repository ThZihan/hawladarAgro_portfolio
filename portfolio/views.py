from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView
from .models import (
    Project, BlogPost, TeamMember, MediaAppearance,
    InvestmentOpportunity, GalleryImage
)


def home(request):
    """
    Homepage view displaying featured content.
    """
    # Get featured projects
    featured_projects = Project.objects.filter(is_featured=True)[:3]
    
    # Get latest blog posts
    latest_blogs = BlogPost.objects.filter(status='published')[:3]
    
    # Get featured team members
    featured_team = TeamMember.objects.filter(is_featured=True)[:3]
    
    # Get media appearances
    media_appearances = MediaAppearance.objects.filter(is_featured=True)[:6]
    
    # Get gallery images
    gallery_images = GalleryImage.objects.filter(is_featured=True)[:6]
    
    # Get investment opportunities
    investment_opportunities = InvestmentOpportunity.objects.filter(is_active=True, featured=True)[:2]
    
    context = {
        'featured_projects': featured_projects,
        'latest_blogs': latest_blogs,
        'featured_team': featured_team,
        'media_appearances': media_appearances,
        'gallery_images': gallery_images,
        'investment_opportunities': investment_opportunities,
    }
    
    return render(request, 'portfolio/home.html', context)


class ProjectListView(ListView):
    """
    List view for all projects.
    """
    model = Project
    template_name = 'portfolio/project_list.html'
    context_object_name = 'projects'
    paginate_by = 9
    
    def get_queryset(self):
        return Project.objects.filter(status='active')


class ProjectDetailView(DetailView):
    """
    Detail view for a single project.
    """
    model = Project
    template_name = 'portfolio/project_detail.html'
    context_object_name = 'project'
    slug_url_kwarg = 'slug'


class BlogListView(ListView):
    """
    List view for all blog posts.
    """
    model = BlogPost
    template_name = 'portfolio/blog_list.html'
    context_object_name = 'posts'
    paginate_by = 6
    
    def get_queryset(self):
        return BlogPost.objects.filter(status='published')


class BlogDetailView(DetailView):
    """
    Detail view for a single blog post.
    """
    model = BlogPost
    template_name = 'portfolio/blog_detail.html'
    context_object_name = 'post'
    slug_url_kwarg = 'slug'


class TeamListView(ListView):
    """
    List view for all team members.
    """
    model = TeamMember
    template_name = 'portfolio/team_list.html'
    context_object_name = 'team_members'


class GalleryListView(ListView):
    """
    List view for gallery images.
    """
    model = GalleryImage
    template_name = 'portfolio/gallery.html'
    context_object_name = 'images'
    paginate_by = 12


def about(request):
    """
    About page view.
    """
    team_members = TeamMember.objects.all()
    context = {
        'team_members': team_members,
    }
    return render(request, 'portfolio/about.html', context)


def investment(request):
    """
    Investment opportunities page.
    """
    opportunities = InvestmentOpportunity.objects.filter(is_active=True)
    context = {
        'opportunities': opportunities,
    }
    return render(request, 'portfolio/investment.html', context)


def contact(request):
    """
    Contact page view.
    """
    return render(request, 'portfolio/contact.html')
