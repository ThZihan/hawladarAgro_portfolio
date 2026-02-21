# HawladarAgro Portfolio - UI/UX Implementation Plan

**Document Version:** 1.0  
**Created:** February 19, 2026  
**Based On:** UI/UX Audit Report

---

## Overview

This implementation plan provides step-by-step, actionable recommendations to transform the HawladarAgro portfolio website into a polished, modern, and user-centric experience. Each step includes specific code changes, styling adjustments, and modern design principles.

---

## Phase 1: Foundation & Design System (Week 1)

### Step 1.1: Update CSS Design Tokens

**File:** `static/css/styles.css`

Replace the existing design tokens with a modernized system:

```css
:root {
    /* ===================================
       MODERNIZED COLOR PALETTE
       =================================== */
    
    /* Primary Colors - Vibrant Emerald */
    --primary-green: #10B981;
    --primary-green-dark: #059669;
    --primary-green-light: #34D399;
    --primary-green-pale: #D1FAE5;
    
    /* Secondary Colors - Trust Blue */
    --primary-blue: #3B82F6;
    --primary-blue-dark: #2563EB;
    --primary-blue-light: #60A5FA;
    
    /* Accent Colors */
    --accent-amber: #F59E0B;
    --accent-amber-dark: #D97706;
    --accent-orange: #F97316;
    --accent-orange-dark: #EA580C;
    --accent-red: #EF4444;
    
    /* Neutral Scale */
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;
    --gray-900: #111827;
    
    /* Semantic Colors */
    --success: #10B981;
    --warning: #F59E0B;
    --error: #EF4444;
    --info: #3B82F6;
    
    /* Background Colors */
    --white: #ffffff;
    --off-white: #F9FAFB;
    --light-bg: #F3F4F6;
    
    /* Text Colors */
    --text-primary: #111827;
    --text-secondary: #4B5563;
    --text-tertiary: #6B7280;
    --text-muted: #9CA3AF;
    --text-inverse: #ffffff;
    
    /* ===================================
       MODERNIZED TYPOGRAPHY SYSTEM
       =================================== */
    
    /* Font Families */
    --font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-body: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-bengali: 'Hind Siliguri', 'Noto Sans Bengali', sans-serif;
    
    /* Font Sizes - Modular Scale */
    --font-size-xs: 0.75rem;      /* 12px */
    --font-size-sm: 0.875rem;     /* 14px */
    --font-size-base: 1rem;       /* 16px */
    --font-size-lg: 1.125rem;     /* 18px */
    --font-size-xl: 1.25rem;      /* 20px */
    --font-size-2xl: 1.5rem;      /* 24px */
    --font-size-3xl: 1.875rem;    /* 30px */
    --font-size-4xl: 2.25rem;     /* 36px */
    --font-size-5xl: 3rem;        /* 48px */
    --font-size-6xl: 3.75rem;     /* 60px */
    
    /* Responsive Font Sizes */
    --font-size-h1: clamp(2.5rem, 5vw, 4rem);
    --font-size-h2: clamp(2rem, 4vw, 3rem);
    --font-size-h3: clamp(1.5rem, 3vw, 2rem);
    --font-size-h4: clamp(1.25rem, 2.5vw, 1.5rem);
    --font-size-body: clamp(1rem, 1.25vw, 1.125rem);
    
    /* Font Weights */
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    
    /* Line Heights */
    --line-height-tight: 1.1;
    --line-height-snug: 1.25;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.75;
    --line-height-loose: 2;
    
    /* Letter Spacing */
    --letter-spacing-tight: -0.025em;
    --letter-spacing-normal: 0;
    --letter-spacing-wide: 0.025em;
    --letter-spacing-wider: 0.05em;
    --letter-spacing-widest: 0.1em;
    
    /* ===================================
       MODERNIZED SPACING SYSTEM (8px grid)
       =================================== */
    
    --space-0: 0;
    --space-1: 0.25rem;   /* 4px */
    --space-2: 0.5rem;    /* 8px */
    --space-3: 0.75rem;   /* 12px */
    --space-4: 1rem;      /* 16px */
    --space-5: 1.25rem;   /* 20px */
    --space-6: 1.5rem;    /* 24px */
    --space-8: 2rem;      /* 32px */
    --space-10: 2.5rem;   /* 40px */
    --space-12: 3rem;     /* 48px */
    --space-16: 4rem;     /* 64px */
    --space-20: 5rem;     /* 80px */
    --space-24: 6rem;     /* 96px */
    --space-32: 8rem;     /* 128px */
    
    /* Section Spacing */
    --section-padding-sm: var(--space-12);
    --section-padding-md: var(--space-20);
    --section-padding-lg: var(--space-24);
    --section-padding-xl: var(--space-32);
    
    /* ===================================
       MODERNIZED BORDER RADIUS
       =================================== */
    
    --radius-none: 0;
    --radius-sm: 0.25rem;   /* 4px */
    --radius-md: 0.5rem;    /* 8px */
    --radius-lg: 0.75rem;   /* 12px */
    --radius-xl: 1rem;      /* 16px */
    --radius-2xl: 1.5rem;   /* 24px */
    --radius-3xl: 2rem;     /* 32px */
    --radius-full: 9999px;
    
    /* ===================================
       MODERNIZED SHADOWS
       =================================== */
    
    --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    
    /* Colored Shadows */
    --shadow-green: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
    --shadow-blue: 0 10px 15px -3px rgba(59, 130, 246, 0.2);
    --shadow-amber: 0 10px 15px -3px rgba(245, 158, 11, 0.2);
    
    /* ===================================
       MODERNIZED GRADIENTS
       =================================== */
    
    --gradient-primary: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%);
    --gradient-secondary: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-dark) 100%);
    --gradient-accent: linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-amber-dark) 100%);
    --gradient-hero: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.9) 100%);
    --gradient-mesh: 
        radial-gradient(at 40% 20%, rgba(16, 185, 129, 0.3) 0px, transparent 50%),
        radial-gradient(at 80% 0%, rgba(59, 130, 246, 0.2) 0px, transparent 50%),
        radial-gradient(at 0% 50%, rgba(245, 158, 11, 0.2) 0px, transparent 50%),
        radial-gradient(at 80% 50%, rgba(16, 185, 129, 0.15) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.2) 0px, transparent 50%);
    
    /* ===================================
       MODERNIZED TRANSITIONS
       =================================== */
    
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-bounce: 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    
    /* ===================================
       Z-INDEX SCALE
       =================================== */
    
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
    --z-toast: 1080;
}
```

### Step 1.2: Update Font Loading in HTML

**File:** `portfolio/templates/base.html`

Replace the existing font loading with modern fonts:

```html
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.gstatic.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Open+Sans:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Step 1.3: Update Base Typography Styles

**File:** `static/css/styles.css`

Replace the base typography section:

```css
/* ===================================
   BASE TYPOGRAPHY
   =================================== */
body {
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-normal);
    color: var(--text-primary);
    background-color: var(--white);
    letter-spacing: var(--letter-spacing-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Bengali Text */
[data-lang="bn"] {
    font-family: var(--font-bengali);
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
}

h1 {
    font-size: var(--font-size-h1);
    font-weight: var(--font-weight-extrabold);
    letter-spacing: var(--letter-spacing-tight);
}

h2 {
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-tight);
}

h3 {
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-semibold);
}

h4 {
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-semibold);
}

/* Paragraphs */
p {
    font-size: var(--font-size-body);
    line-height: var(--line-height-relaxed);
    color: var(--text-secondary);
    margin-bottom: var(--space-4);
}

/* Links */
a {
    color: var(--primary-green);
    text-decoration: none;
    transition: color var(--transition-fast);
}

a:hover {
    color: var(--primary-green-dark);
}

/* Strong/Bold */
strong, b {
    font-weight: var(--font-weight-semibold);
    color: var(--text-primary);
}

/* Small Text */
small {
    font-size: var(--font-size-sm);
    color: var(--text-tertiary);
}
```

---

## Phase 2: Hero Section Redesign (Week 1-2)

### Step 2.1: Redesign Hero Section HTML

**File:** `portfolio/templates/portfolio/home.html`

Replace the hero section with a modern layout:

```html
<!-- Hero Section -->
<section class="hero-section">
    <div class="hero-background">
        <div class="hero-gradient-mesh"></div>
        <div class="hero-pattern"></div>
    </div>
    <div class="hero-overlay"></div>
    
    <div class="container">
        <div class="hero-content">
            <!-- Left Column: Text Content -->
            <div class="hero-text">
                <!-- Trust Badges -->
                <div class="hero-badges">
                    <span class="badge badge-shariah">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        Shariah Compliant
                    </span>
                    <span class="badge badge-insured">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                        </svg>
                        Fully Insured
                    </span>
                    <span class="badge badge-verified">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Government Certified
                    </span>
                </div>
                
                <!-- Main Heading -->
                <h1 class="hero-title" data-lang-en="Project Amar: Your Cow, Our Care, Shared Prosperity" data-lang-bn="প্রজেক্ট আমার: আপনার খামার, আমাদের যত্ন, সমৃদ্ধি সবার।">
                    প্রজেক্ট আমার:<br>
                    <span class="highlight">আপনার গরু, আমাদের যত্ন, সমৃদ্ধি সবার</span>
                </h1>
                
                <!-- Subtitle with Bullet Points -->
                <div class="hero-subtitle">
                    <p class="hero-tagline" data-lang-en="The First Shariah-Compliant 'Cow Hotel' in Bangladesh" data-lang-bn="বাংলাদেশের প্রথম শরীয়াহ সম্মত 'কাউ হোটেল'">
                        বাংলাদেশের প্রথম শরীয়াহ সম্মত 'কাউ হোটেল'
                    </p>
                    <ul class="hero-features">
                        <li data-lang-en="Invest from home with live monitoring" data-lang-bn="ঘর বসে বিনিয়োগ, লাইভ মনিটরিং">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                            ঘর বসে বিনিয়োগ, লাইভ মনিটরিং
                        </li>
                        <li data-lang-en="Transparent 3-way profit sharing" data-lang-bn="স্বচ্ছ ৩-মুখী মুনাফা বন্টন">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                            </svg>
                            স্বচ্ছ ৩-মুখী মুনাফা বন্টন
                        </li>
                        <li data-lang-en="Ethical halal returns guaranteed" data-lang-bn="নিশ্চিত হালাল আয়">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            নিশ্চিত হালাল আয়
                        </li>
                    </ul>
                </div>
                
                <!-- CTA Buttons -->
                <div class="hero-buttons">
                    <a href="{% url 'portfolio:investment' %}" class="btn btn-primary btn-lg" data-lang-en="Start Halal Investment" data-lang-bn="হালাল বিনিয়োগ শুরু করুন">
                        <span>হালাল বিনিয়োগ শুরু করুন</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                    <a href="#dashboard" class="btn btn-secondary btn-lg" data-lang-en="View Live Dashboard" data-lang-bn="লাইভ ড্যাশবোর্ড দেখুন">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                            <line x1="8" y1="21" x2="16" y2="21"/>
                            <line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                        <span>লাইভ ড্যাশবোর্ড দেখুন</span>
                    </a>
                </div>
                
                <!-- Social Proof -->
                <div class="hero-social-proof">
                    <div class="social-proof-item">
                        <span class="social-proof-number">500+</span>
                        <span class="social-proof-label" data-lang-en="Happy Investors" data-lang-bn="সন্তুষ্ট বিনিয়োগকারী">সন্তুষ্ট বিনিয়োগকারী</span>
                    </div>
                    <div class="social-proof-divider"></div>
                    <div class="social-proof-item">
                        <span class="social-proof-number">৳৫০M+</span>
                        <span class="social-proof-label" data-lang-en="Total Investment" data-lang-bn="মোট বিনিয়োগ">মোট বিনিয়োগ</span>
                    </div>
                    <div class="social-proof-divider"></div>
                    <div class="social-proof-item">
                        <span class="social-proof-number">98%</span>
                        <span class="social-proof-label" data-lang-en="Success Rate" data-lang-bn="সাফল্যের হার">সাফল্যের হার</span>
                    </div>
                </div>
            </div>
            
            <!-- Right Column: Visual Element -->
            <div class="hero-visual">
                <div class="hero-card hero-card-main">
                    <div class="hero-card-header">
                        <span class="hero-card-badge">Live</span>
                        <span class="hero-card-title">আপনার গরুর অবস্থা</span>
                    </div>
                    <div class="hero-card-body">
                        <div class="hero-card-stats">
                            <div class="stat-item">
                                <span class="stat-label">বর্তমান ওজন</span>
                                <span class="stat-value">৪৮৫ কেজি</span>
                                <span class="stat-change positive">+১২ কেজি</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">স্বাস্থ্য স্কোর</span>
                                <span class="stat-value">৯৫%</span>
                                <span class="stat-change positive">চমৎকার</span>
                            </div>
                        </div>
                        <div class="hero-card-graph">
                            <!-- Mini graph visualization -->
                            <svg viewBox="0 0 200 80" class="mini-graph">
                                <defs>
                                    <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style="stop-color:var(--primary-green);stop-opacity:0.3" />
                                        <stop offset="100%" style="stop-color:var(--primary-green);stop-opacity:0" />
                                    </linearGradient>
                                </defs>
                                <path d="M0,60 Q20,55 40,50 T80,40 T120,35 T160,25 T200,20" 
                                      fill="none" stroke="var(--primary-green)" stroke-width="3"/>
                                <path d="M0,60 Q20,55 40,50 T80,40 T120,35 T160,25 T200,20 L200,80 L0,80 Z" 
                                      fill="url(#graphGradient)"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="hero-card hero-card-secondary">
                    <div class="hero-card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 10l5 5-5 5"/>
                            <path d="M4 4v7a4 4 0 0 0 4 4h12"/>
                        </svg>
                    </div>
                    <div class="hero-card-text">
                        <span class="hero-card-label">পরবর্তী ফিডিং</span>
                        <span class="hero-card-value">আজ সন্ধ্যা ৬টা</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="hero-scroll-indicator">
        <span class="scroll-text" data-lang-en="Scroll to explore" data-lang-bn="নিচে স্ক্রল করুন">নিচে স্ক্রল করুন</span>
        <div class="scroll-mouse">
            <div class="scroll-wheel"></div>
        </div>
    </div>
</section>
```

### Step 2.2: Redesign Hero Section CSS

**File:** `static/css/styles.css`

Add the new hero section styles:

```css
/* ===================================
   MODERNIZED HERO SECTION
   =================================== */
.hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 80px;
    overflow: hidden;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 50%, #FEF3C7 100%);
    z-index: 0;
}

.hero-gradient-mesh {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-mesh);
    opacity: 0.6;
    animation: meshMove 20s ease-in-out infinite;
}

@keyframes meshMove {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(5deg); }
    66% { transform: translate(-20px, 20px) rotate(-5deg); }
}

.hero-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    background-size: 60px 60px;
}

.hero-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top, var(--white) 0%, transparent 100%);
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;
}

/* Hero Text Column */
.hero-text {
    animation: fadeInUp 0.8s ease-out 0.2s forwards;
    opacity: 0;
}

/* Trust Badges */
.hero-badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-bottom: var(--space-8);
}

.badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: var(--white);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-base);
}

.badge:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.badge-shariah {
    color: var(--primary-green);
    border: 1px solid var(--primary-green-pale);
}

.badge-insured {
    color: var(--primary-blue);
    border: 1px solid rgba(59, 130, 246, 0.2);
}

.badge-verified {
    color: var(--accent-amber);
    border: 1px solid rgba(245, 158, 11, 0.2);
}

/* Hero Title */
.hero-title {
    font-size: var(--font-size-h1);
    font-weight: var(--font-weight-extrabold);
    line-height: var(--line-height-tight);
    margin-bottom: var(--space-8);
    color: var(--text-primary);
}

.hero-title .highlight {
    background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-blue) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Hero Subtitle */
.hero-subtitle {
    margin-bottom: var(--space-10);
}

.hero-tagline {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-medium);
    color: var(--text-secondary);
    margin-bottom: var(--space-6);
}

.hero-features {
    list-style: none;
    padding: 0;
    margin: 0;
}

.hero-features li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) 0;
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
}

.hero-features li svg {
    flex-shrink: 0;
    color: var(--primary-green);
}

/* Hero Buttons */
.hero-buttons {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
    margin-bottom: var(--space-12);
}

.btn-lg {
    padding: var(--space-4) var(--space-8);
    font-size: var(--font-size-lg);
}

.btn-primary {
    background: var(--gradient-primary);
    color: var(--white);
    border: none;
    box-shadow: var(--shadow-green);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px -5px rgba(16, 185, 129, 0.4);
}

.btn-secondary {
    background: var(--white);
    color: var(--primary-green);
    border: 2px solid var(--primary-green);
    box-shadow: var(--shadow-sm);
}

.btn-secondary:hover {
    background: var(--primary-green-pale);
    border-color: var(--primary-green-dark);
}

/* Social Proof */
.hero-social-proof {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    padding: var(--space-6);
    background: var(--white);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
}

.social-proof-item {
    text-align: center;
}

.social-proof-number {
    display: block;
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
    line-height: 1;
}

.social-proof-label {
    font-size: var(--font-size-sm);
    color: var(--text-tertiary);
    margin-top: var(--space-1);
}

.social-proof-divider {
    width: 1px;
    height: 40px;
    background: var(--gray-200);
}

/* Hero Visual Column */
.hero-visual {
    position: relative;
    animation: fadeInRight 0.8s ease-out 0.4s forwards;
    opacity: 0;
}

.hero-card {
    background: var(--white);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-xl);
    padding: var(--space-6);
    position: absolute;
    transition: all var(--transition-base);
}

.hero-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-2xl);
}

.hero-card-main {
    width: 100%;
    max-width: 400px;
    top: 0;
    right: 0;
    animation: float 6s ease-in-out infinite;
}

.hero-card-secondary {
    width: 280px;
    bottom: -40px;
    left: 0;
    display: flex;
    align-items: center;
    gap: var(--space-4);
    animation: float 6s ease-in-out infinite 1s;
}

.hero-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-6);
}

.hero-card-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-1) var(--space-3);
    background: rgba(16, 185, 129, 0.1);
    color: var(--primary-green);
    border-radius: var(--radius-full);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
}

.hero-card-badge::before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--success);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
}

.hero-card-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--text-primary);
}

.hero-card-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
}

.stat-item {
    padding: var(--space-4);
    background: var(--gray-50);
    border-radius: var(--radius-lg);
}

.stat-label {
    display: block;
    font-size: var(--font-size-sm);
    color: var(--text-tertiary);
    margin-bottom: var(--space-2);
}

.stat-value {
    display: block;
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    line-height: 1;
}

.stat-change {
    display: block;
    font-size: var(--font-size-sm);
    margin-top: var(--space-1);
}

.stat-change.positive {
    color: var(--success);
}

.hero-card-graph {
    height: 80px;
    position: relative;
}

.mini-graph {
    width: 100%;
    height: 100%;
}

.hero-card-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-blue);
    color: var(--white);
    border-radius: var(--radius-lg);
}

.hero-card-text {
    flex: 1;
}

.hero-card-label {
    display: block;
    font-size: var(--font-size-sm);
    color: var(--text-tertiary);
    margin-bottom: var(--space-1);
}

.hero-card-value {
    display: block;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--text-primary);
}

/* Scroll Indicator */
.hero-scroll-indicator {
    position: absolute;
    bottom: var(--space-8);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    z-index: 2;
    animation: fadeInUp 1s ease-out 1s forwards;
    opacity: 0;
}

.scroll-text {
    font-size: var(--font-size-sm);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
}

.scroll-mouse {
    width: 24px;
    height: 40px;
    border: 2px solid var(--text-tertiary);
    border-radius: var(--radius-full);
    position: relative;
}

.scroll-wheel {
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: var(--text-tertiary);
    border-radius: var(--radius-full);
    animation: scrollWheel 2s ease-in-out infinite;
}

@keyframes scrollWheel {
    0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
    50% { transform: translateX(-50%) translateY(12px); opacity: 0; }
}

/* Responsive */
@media (max-width: 1024px) {
    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .hero-badges {
        justify-content: center;
    }
    
    .hero-buttons {
        justify-content: center;
    }
    
    .hero-social-proof {
        justify-content: center;
    }
    
    .hero-visual {
        display: none;
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: var(--font-size-4xl);
    }
    
    .hero-social-proof {
        flex-direction: column;
        gap: var(--space-4);
    }
    
    .social-proof-divider {
        width: 40px;
        height: 1px;
    }
}
```

---

## Phase 3: Navigation & Header Redesign (Week 2)

### Step 3.1: Redesign Header HTML

**File:** `portfolio/templates/base.html`

Update the header section:

```html
<!-- Header / Navigation -->
<header id="main-header">
    <div class="container">
        <nav class="main-navigation">
            <!-- Logo -->
            <div class="logo">
                <a href="{% url 'portfolio:home' %}" aria-label="Hawlader Agro Home">
                    <img src="{% static 'images/logo.svg' %}" alt="Hawlader Agro" class="logo-light">
                    <img src="{% static 'images/logo-dark.svg' %}" alt="Hawlader Agro" class="logo-dark">
                </a>
            </div>
            
            <!-- Navigation Links -->
            <ul class="nav-menu">
                <li>
                    <a href="{% url 'portfolio:home' %}" class="nav-link active" data-lang-en="Home" data-lang-bn="হোম">
                        <span>হোম</span>
                    </a>
                </li>
                <li>
                    <a href="{% url 'portfolio:project_list' %}" class="nav-link" data-lang-en="Projects" data-lang-bn="প্রজেক্ট">
                        <span>প্রজেক্ট</span>
                    </a>
                </li>
                <li>
                    <a href="{% url 'portfolio:about' %}" class="nav-link" data-lang-en="About Us" data-lang-bn="আমাদের সম্পর্কে">
                        <span>আমাদের সম্পর্কে</span>
                    </a>
                </li>
                <li>
                    <a href="{% url 'portfolio:investment' %}" class="nav-link" data-lang-en="Investment" data-lang-bn="বিনিয়োগ">
                        <span>বিনিয়োগ</span>
                    </a>
                </li>
                <li>
                    <a href="{% url 'portfolio:blog_list' %}" class="nav-link" data-lang-en="Blog" data-lang-bn="ব্লগ">
                        <span>ব্লগ</span>
                    </a>
                </li>
                <li>
                    <a href="{% url 'portfolio:contact' %}" class="nav-link" data-lang-en="Contact" data-lang-bn="যোগাযোগ">
                        <span>যোগাযোগ</span>
                    </a>
                </li>
            </ul>
            
            <!-- Header Actions -->
            <div class="nav-actions">
                <!-- Search Button -->
                <button class="nav-action-btn search-toggle" aria-label="Search">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                </button>
                
                <!-- Language Toggle -->
                <div class="lang-dropdown">
                    <button class="lang-toggle" id="langToggle" aria-label="Change Language">
                        <span class="lang-current">বাং</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m6 9 6 6 6-6"/>
                        </svg>
                    </button>
                    <div class="lang-menu">
                        <button class="lang-option" data-lang="bn">বাংলা</button>
                        <button class="lang-option" data-lang="en">English</button>
                    </div>
                </div>
                
                <!-- CTA Button -->
                <a href="{% url 'portfolio:investment' %}" class="btn btn-primary btn-sm nav-cta" data-lang-en="Invest Now" data-lang-bn="বিনিয়োগ করুন">
                    বিনিয়োগ করুন
                </a>
                
                <!-- Mobile Menu Toggle -->
                <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle Menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    </div>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <div class="mobile-logo">
                <img src="{% static 'images/logo.svg' %}" alt="Hawlader Agro">
            </div>
            <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close Menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <div class="mobile-menu-body">
            <ul class="mobile-nav-links">
                <li><a href="{% url 'portfolio:home' %}">হোম</a></li>
                <li><a href="{% url 'portfolio:project_list' %}">প্রজেক্ট</a></li>
                <li><a href="{% url 'portfolio:about' %}">আমাদের সম্পর্কে</a></li>
                <li><a href="{% url 'portfolio:investment' %}">বিনিয়োগ</a></li>
                <li><a href="{% url 'portfolio:blog_list' %}">ব্লগ</a></li>
                <li><a href="{% url 'portfolio:contact' %}">যোগাযোগ</a></li>
            </ul>
            <div class="mobile-menu-cta">
                <a href="{% url 'portfolio:investment' %}" class="btn btn-primary btn-block">বিনিয়োগ শুরু করুন</a>
            </div>
        </div>
    </div>
</header>
```

### Step 3.2: Redesign Header CSS

**File:** `static/css/styles.css`

Replace the header styles:

```css
/* ===================================
   MODERNIZED HEADER
   =================================== */
#main-header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-sm);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-fixed);
    transition: all var(--transition-base);
    border-bottom: 1px solid var(--gray-100);
}

#main-header.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: var(--shadow-md);
}

.main-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-4) 0;
    transition: padding var(--transition-base);
}

#main-header.scrolled .main-navigation {
    padding: var(--space-3) 0;
}

/* Logo */
.logo a {
    display: flex;
    align-items: center;
}

.logo img {
    max-height: 50px;
    transition: all var(--transition-base);
}

#main-header.scrolled .logo img {
    max-height: 42px;
}

.logo-dark {
    display: none;
}

/* Navigation Links */
.nav-menu {
    display: flex;
    gap: var(--space-2);
    align-items: center;
}

.nav-link {
    display: flex;
    align-items: center;
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-secondary);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
    position: relative;
}

.nav-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 80%;
    height: 2px;
    background: var(--primary-green);
    transition: transform var(--transition-base);
}

.nav-link:hover {
    color: var(--primary-green);
    background: var(--primary-green-pale);
}

.nav-link:hover::before {
    transform: translateX(-50%) scaleX(1);
}

.nav-link.active {
    color: var(--primary-green);
    background: var(--primary-green-pale);
}

.nav-link.active::before {
    transform: translateX(-50%) scaleX(1);
}

/* Header Actions */
.nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
}

.nav-action-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gray-100);
    border: none;
    border-radius: var(--radius-lg);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.nav-action-btn:hover {
    background: var(--gray-200);
    color: var(--text-primary);
}

/* Language Dropdown */
.lang-dropdown {
    position: relative;
}

.lang-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: var(--gray-100);
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.lang-toggle:hover {
    background: var(--gray-200);
}

.lang-current {
    color: var(--text-primary);
}

.lang-menu {
    position: absolute;
    top: calc(100% + var(--space-2));
    right: 0;
    min-width: 120px;
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: var(--space-2);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all var(--transition-fast);
}

.lang-dropdown:hover .lang-menu,
.lang-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.lang-option {
    display: block;
    width: 100%;
    padding: var(--space-2) var(--space-3);
    text-align: left;
    background: none;
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.lang-option:hover {
    background: var(--gray-100);
    color: var(--text-primary);
}

/* Navigation CTA */
.nav-cta {
    display: none;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    background: var(--gray-100);
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.mobile-menu-toggle span {
    width: 20px;
    height: 2px;
    background: var(--text-secondary);
    border-radius: var(--radius-full);
    transition: all var(--transition-base);
}

.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Menu */
.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: var(--white);
    z-index: var(--z-modal);
    transform: translateX(-100%);
    transition: transform var(--transition-base);
}

.mobile-menu.active {
    transform: translateX(0);
}

.mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4);
    border-bottom: 1px solid var(--gray-100);
}

.mobile-logo img {
    max-height: 40px;
}

.mobile-menu-close {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gray-100);
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
}

.mobile-menu-body {
    padding: var(--space-6);
}

.mobile-nav-links {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--space-8);
}

.mobile-nav-links li {
    margin-bottom: var(--space-2);
}

.mobile-nav-links a {
    display: block;
    padding: var(--space-4);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    color: var(--text-primary);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
}

.mobile-nav-links a:hover,
.mobile-nav-links a.active {
    background: var(--primary-green-pale);
    color: var(--primary-green);
}

.mobile-menu-cta {
    padding-top: var(--space-4);
    border-top: 1px solid var(--gray-100);
}

/* Responsive */
@media (min-width: 1024px) {
    .nav-cta {
        display: inline-flex;
    }
}

@media (max-width: 1023px) {
    .nav-menu {
        display: none;
    }
    
    .mobile-menu-toggle {
        display: flex;
    }
}

@media (max-width: 768px) {
    .nav-actions .search-toggle,
    .nav-actions .lang-dropdown {
        display: none;
    }
}
```

---

## Phase 4: Investment Cards Redesign (Week 2-3)

### Step 4.1: Redesign Investment Cards HTML

**File:** `portfolio/templates/portfolio/home.html`

Update the investment cards section:

```html
<!-- Investment Models Section -->
<section class="investment-section">
    <div class="container">
        <div class="section-header">
            <span class="section-badge" data-lang-en="Choose Your Path" data-lang-bn="আপনার পছন্দ নির্বাচন করুন">আপনার পছন্দ নির্বাচন করুন</span>
            <h2 class="section-title" data-lang-en="Investment Models" data-lang-bn="বিনিয়োগ মডেল">বিনিয়োগ মডেল</h2>
            <p class="section-subtitle" data-lang-en="Select the investment model that suits your financial goals" data-lang-bn="আপনার আর্থিক লক্ষ্যের সাথে মিল রেখে বিনিয়োগ মডেল নির্বাচন করুন">
                আপনার আর্থিক লক্ষ্যের সাথে মিল রেখে বিনিয়োগ মডেল নির্বাচন করুন
            </p>
        </div>
        
        <div class="investment-content">
            <!-- Model A Card -->
            <div class="investment-card investment-card-featured scroll-reveal stagger-1">
                <div class="investment-card-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                    <span>জনপ্রিয় পছন্দ</span>
                </div>
                
                <div class="investment-card-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                    </svg>
                </div>
                
                <h3 class="investment-card-title" data-lang-en="Model A: Eid Fattening Project" data-lang-bn="মডেল এ: ঈদ মাটাতাজাকরণ প্রকল্প">
                    মডেল এ: ঈদ মাটাতাজাকরণ প্রকল্প
                </h3>
                
                <span class="investment-card-tag" data-lang-en="Short-Term" data-lang-bn="স্বল্পমেয়াদী">স্বল্পমেয়াদী</span>
                
                <div class="investment-card-stats">
                    <div class="stat-row">
                        <span class="stat-label" data-lang-en="Duration" data-lang-bn="মেয়াদ">মেয়াদ</span>
                        <span class="stat-value">৩-৪ মাস</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label" data-lang-en="Projected ROI" data-lang-bn="সম্ভাব্য মুনাফা">সম্ভাব্য মুনাফা</span>
                        <span class="stat-value highlight">১৫-২৫%</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label" data-lang-en="Daily Weight Gain" data-lang-bn="দৈনিক ওজন বৃদ্ধি">দৈনিক ওজন বৃদ্ধি</span>
                        <span class="stat-value">৮০০গ্রাম - ১.২কেজি</span>
                    </div>
                </div>
                
                <p class="investment-card-description" data-lang-en="Maximize returns with the Eid cycle through Mudarabah profit sharing structure" data-lang-bn="ঈদ চক্রের মাধ্যমে সর্বোচ্চ লাভ। কাঠামো: মুদারাবা (লাভ-ক্ষত বন্টন)">
                    ঈদ চক্রের মাধ্যমে সর্বোচ্চ লাভ। কাঠামো: মুদারাবা (লাভ-ক্ষত বন্টন)
                </p>
                
                <ul class="investment-card-features">
                    <li data-lang-en="Fast returns" data-lang-bn="দ্রুত রিটার্ন">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        দ্রুত রিটার্ন
                    </li>
                    <li data-lang-en="Lower risk profile" data-lang-bn="কম ঝুঁকি">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        কম ঝুঁকি
                    </li>
                    <li data-lang-en="Ideal for beginners" data-lang-bn="নতুনদের জন্য আদর্শ">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        নতুনদের জন্য আদর্শ
                    </li>
                </ul>
                
                <div class="investment-card-footer">
                    <div class="investment-progress">
                        <div class="progress-label">
                            <span data-lang-en="Available Slots" data-lang-bn="উপলব্ধ স্লট">উপলব্ধ স্লট</span>
                            <span>১২/৫০</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 76%"></div>
                        </div>
                    </div>
                    <a href="{% url 'portfolio:investment' %}" class="btn btn-primary btn-block" data-lang-en="Invest Now" data-lang-bn="বিনিয়োগ করুন">
                        বিনিয়োগ করুন
                    </a>
                </div>
            </div>
            
            <!-- Model B Card -->
            <div class="investment-card scroll-reveal stagger-2">
                <div class="investment-card-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                </div>
                
                <h3 class="investment-card-title" data-lang-en="Model B: Heritage Dairy Project" data-lang-bn="মডেল বি: হেরিটেজ ডেইরি ও প্রজনন প্রকল্প">
                    মডেল বি: হেরিটেজ ডেইরি ও প্রজনন প্রকল্প
                </h3>
                
                <span class="investment-card-tag" data-lang-en="Long-Term" data-lang-bn="দীর্ঘমেয়াদী">দীর্ঘমেয়াদী</span>
                
                <div class="investment-card-stats">
                    <div class="stat-row">
                        <span class="stat-label" data-lang-en="Duration" data-lang-bn="মেয়াদ">মেয়াদ</span>
                        <span class="stat-value">২-৩ বছর</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label" data-lang-en="Monthly Income" data-lang-bn="মাসিক আয়">মাসিক আয়</span>
                        <span class="stat-value highlight">৳২,০০০+</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label" data-lang-en="Final Return" data-lang-bn="চূড়ান্ত রিটার্ন">চূড়ান্ত রিটার্ন</span>
                        <span class="stat-value">বাছুর/গাভী বিক্রি</span>
                    </div>
                </div>
                
                <p class="investment-card-description" data-lang-en="Sustainable wealth through dairy and breeding with long-term Mudarabah structure" data-lang-bn="ডেইরি ও প্রজননের মাধ্যমে টেকসই সম্পদ। কাঠামো: দীর্ঘমেয়াদী মুদারাবা">
                    ডেইরি ও প্রজননের মাধ্যমে টেকসই সম্পদ। কাঠামো: দীর্ঘমেয়াদী মুদারাবা
                </p>
                
                <ul class="investment-card-features">
                    <li data-lang-en="Passive monthly income" data-lang-bn="মাসিক আয়">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        মাসিক আয়
                    </li>
                    <li data-lang-en="Asset appreciation" data-lang-bn="সম্পদের মূল্যবৃদ্ধি">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        সম্পদের মূল্যবৃদ্ধি
                    </li>
                    <li data-lang-en="Breeding returns" data-lang-bn="প্রজনন লাভ">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        প্রজনন লাভ
                    </li>
                </ul>
                
                <div class="investment-card-footer">
                    <div class="investment-progress">
                        <div class="progress-label">
                            <span data-lang-en="Available Slots" data-lang-bn="উপলব্ধ স্লট">উপলব্ধ স্লট</span>
                            <span>৮/৩০</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 73%"></div>
                        </div>
                    </div>
                    <a href="{% url 'portfolio:investment' %}" class="btn btn-outline btn-block" data-lang-en="Invest Now" data-lang-bn="বিনিয়োগ করুন">
                        বিনিয়োগ করুন
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Step 4.2: Redesign Investment Cards CSS

**File:** `static/css/styles.css`

Replace the investment card styles:

```css
/* ===================================
   MODERNIZED INVESTMENT SECTION
   =================================== */
.investment-section {
    background: linear-gradient(180deg, var(--white) 0%, var(--off-white) 100%);
    padding: var(--section-padding-xl) 0;
}

.section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto var(--space-16);
}

.section-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: var(--primary-green-pale);
    color: var(--primary-green);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-4);
}

.section-title {
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
}

.section-subtitle {
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
}

.investment-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--space-8);
    max-width: 1200px;
    margin: 0 auto;
}

.investment-card {
    background: var(--white);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);
    position: relative;
    border: 2px solid transparent;
}

.investment-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-2xl);
}

.investment-card-featured {
    border-color: var(--primary-green);
    background: linear-gradient(180deg, var(--white) 0%, var(--primary-green-pale) 100%);
}

.investment-card-badge {
    position: absolute;
    top: var(--space-6);
    right: var(--space-6);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    background: var(--accent-amber);
    color: var(--white);
    border-radius: var(--radius-full);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-amber);
}

.investment-card-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-green-pale);
    color: var(--primary-green);
    border-radius: var(--radius-xl);
    margin-bottom: var(--space-6);
}

.investment-card-title {
    font-size: var(--font-size-xl);
    font-weight