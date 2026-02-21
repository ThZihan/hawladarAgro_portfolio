from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('', views.home, name='home'),
    path('projects/', views.ProjectListView.as_view(), name='project_list'),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project_detail'),
    path('blog/', views.BlogListView.as_view(), name='blog_list'),
    path('blog/<slug:slug>/', views.BlogDetailView.as_view(), name='blog_detail'),
    path('team/', views.TeamListView.as_view(), name='team_list'),
    path('gallery/', views.GalleryListView.as_view(), name='gallery'),
    path('about/', views.about, name='about'),
    path('investment/', views.investment, name='investment'),
    path('contact/', views.contact, name='contact'),
]
