from django.contrib import admin
from .models import (
    Project, BlogPost, TeamMember, MediaAppearance,
    InvestmentOpportunity, GalleryImage
)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'acreage', 'status', 'is_featured', 'order', 'created_at']
    list_filter = ['status', 'is_featured', 'created_at']
    search_fields = ['name', 'location', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_featured', 'order']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'location', 'acreage', 'status', 'description')
        }),
        ('Details', {
            'fields': ('details', 'crops', 'livestock')
        }),
        ('Images', {
            'fields': ('hero_image', 'overview_image')
        }),
        ('Investment', {
            'fields': ('total_shares', 'share_price')
        }),
        ('Uganda Project', {
            'fields': ('lease_years',)
        }),
        ('Display', {
            'fields': ('order', 'is_featured')
        }),
    )


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'order', 'published_at', 'created_at']
    list_filter = ['status', 'published_at', 'created_at']
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['status', 'order']
    date_hierarchy = 'published_at'
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'excerpt', 'content')
        }),
        ('Media', {
            'fields': ('featured_image',)
        }),
        ('Publication', {
            'fields': ('status', 'published_at')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description')
        }),
        ('Display', {
            'fields': ('order',)
        }),
    )


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'role_display', 'is_featured', 'order']
    list_filter = ['role', 'is_featured']
    search_fields = ['name', 'role_display', 'bio']
    list_editable = ['is_featured', 'order']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'role', 'role_display', 'bio')
        }),
        ('Photo', {
            'fields': ('photo',)
        }),
        ('Display', {
            'fields': ('is_featured', 'order')
        }),
    )


@admin.register(MediaAppearance)
class MediaAppearanceAdmin(admin.ModelAdmin):
    list_display = ['outlet_name', 'media_type', 'coverage_date', 'is_featured', 'order']
    list_filter = ['media_type', 'is_featured', 'coverage_date']
    search_fields = ['outlet_name', 'description']
    list_editable = ['is_featured', 'order']
    fieldsets = (
        ('Basic Information', {
            'fields': ('outlet_name', 'media_type', 'description')
        }),
        ('Media', {
            'fields': ('logo', 'article_url')
        }),
        ('Details', {
            'fields': ('coverage_date',)
        }),
        ('Display', {
            'fields': ('is_featured', 'order')
        }),
    )


@admin.register(InvestmentOpportunity)
class InvestmentOpportunityAdmin(admin.ModelAdmin):
    list_display = ['title', 'project', 'total_shares', 'available_shares', 'price_per_share', 'is_active', 'featured', 'order']
    list_filter = ['is_active', 'featured', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_active', 'featured', 'order']
    readonly_fields = ['percentage_sold']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'project')
        }),
        ('Investment Details', {
            'fields': ('total_shares', 'available_shares', 'price_per_share', 'minimum_investment')
        }),
        ('Returns', {
            'fields': ('expected_return', 'investment_duration')
        }),
        ('Documents', {
            'fields': ('terms_document',)
        }),
        ('Status', {
            'fields': ('is_active', 'featured', 'order')
        }),
        ('Statistics', {
            'fields': ('percentage_sold',)
        }),
    )


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_featured', 'order', 'created_at']
    list_filter = ['category', 'is_featured', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_featured', 'order']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'category')
        }),
        ('Image', {
            'fields': ('image',)
        }),
        ('Display', {
            'fields': ('is_featured', 'order')
        }),
    )
