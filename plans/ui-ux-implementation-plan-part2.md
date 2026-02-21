# HawladarAgro Portfolio - UI/UX Implementation Plan (Part 2)

**Continuation of implementation plan for remaining sections**

---

## Phase 5: Section Titles & Visual Hierarchy (Week 3)

### Step 5.1: Create Varied Section Title Styles

**File:** `static/css/styles.css`

Add varied section title styles:

```css
/* ===================================
   MODERNIZED SECTION TITLES
   =================================== */
.section-title {
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    text-align: center;
    margin-bottom: var(--space-4);
    position: relative;
    display: inline-block;
}

/* Default underline style */
.section-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: var(--gradient-primary);
    margin: var(--space-4) auto 0;
    border-radius: var(--radius-full);
}

/* Centered wrapper for section titles */
.section-title-wrapper {
    text-align: center;
    margin-bottom: var(--space-12);
}

/* Badge style section title */
.section-title-badge {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
}

.section-title-badge .badge {
    padding: var(--space-2) var(--space-4);
    background: var(--primary-green-pale);
    color: var(--primary-green);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
}

.section-title-badge .section-title::after {
    margin: var(--space-4) auto 0;
}

/* Pill background style */
.section-title-pill {
    display: inline-block;
    padding: var(--space-3) var(--space-8);
    background: var(--gradient-primary);
    color: var(--white);
    border-radius: var(--radius-full);
    margin-bottom: var(--space-8);
}

.section-title-pill .section-title {
    color: var(--white);
    margin-bottom: 0;
}

.section-title-pill .section-title::after {
    background: var(--white);
}

/* Left aligned style */
.section-title-left {
    text-align: left;
}

.section-title-left::after {
    margin: var(--space-4) 0 0;
}

/* With icon */
.section-title-with-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
}

.section-title-with-icon .icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-green-pale);
    color: var(--primary-green);
    border-radius: var(--radius-xl);
}

.section-title-with-icon .section-title::after {
    display: none;
}
```

---

## Phase 6: Buttons & Interactive Elements (Week 3)

### Step 6.1: Modernize Button Styles

**File:** `static/css/styles.css`

Replace button styles with modern variants:

```css
/* ===================================
   MODERNIZED BUTTONS
   =================================== */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    border-radius: var(--radius-lg);
    border: none;
    cursor: pointer;
    transition: all var(--transition-base);
    text-decoration: none;
    position: relative;
    overflow: hidden;
    font-family: inherit;
    line-height: 1;
}

.btn:focus {
    outline: 2px solid var(--primary-green);
    outline-offset: 2px;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

/* Button Sizes */
.btn-xs {
    padding: var(--space-1) var(--space-2);
    font-size: var(--font-size-xs);
}

.btn-sm {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-sm);
}

.btn-lg {
    padding: var(--space-4) var(--space-8);
    font-size: var(--font-size-lg);
}

.btn-xl {
    padding: var(--space-5) var(--space-10);
    font-size: var(--font-size-xl);
}

/* Primary Button */
.btn-primary {
    background: var(--gradient-primary);
    color: var(--white);
    box-shadow: var(--shadow-green);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(16, 185, 129, 0.4);
}

.btn-primary:active {
    transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
    background: var(--white);
    color: var(--primary-green);
    border: 2px solid var(--primary-green);
    box-shadow: var(--shadow-sm);
}

.btn-secondary:hover {
    background: var(--primary-green-pale);
    border-color: var(--primary-green-dark);
    transform: translateY(-2px);
}

/* Outline Button */
.btn-outline {
    background: transparent;
    color: var(--primary-green);
    border: 2px solid var(--primary-green);
}

.btn-outline:hover {
    background: var(--primary-green);
    color: var(--white);
    transform: translateY(-2px);
}

/* Ghost Button */
.btn-ghost {
    background: transparent;
    color: var(--text-secondary);
    border: none;
}

.btn-ghost:hover {
    background: var(--gray-100);
    color: var(--text-primary);
}

/* Text Button */
.btn-text {
    background: transparent;
    color: var(--primary-green);
    border: none;
    padding: 0;
    gap: var(--space-1);
}

.btn-text:hover {
    color: var(--primary-green-dark);
    text-decoration: underline;
}

/* Danger Button */
.btn-danger {
    background: var(--error);
    color: var(--white);
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.btn-danger:hover {
    background: #DC2626;
    transform: translateY(-2px);
}

/* Success Button */
.btn-success {
    background: var(--success);
    color: var(--white);
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.btn-success:hover {
    background: #059669;
    transform: translateY(-2px);
}

/* Button with Icon */
.btn-icon {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: var(--radius-full);
}

.btn-icon-lg {
    width: 48px;
    height: 48px;
}

/* Loading State */
.btn-loading {
    position: relative;
    color: transparent !important;
    pointer-events: none;
}

.btn-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Ripple Effect */
.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
}

.btn:active::before {
    width: 300px;
    height: 300px;
}

/* Full Width */
.btn-block {
    width: 100%;
    display: flex;
}

/* Button Group */
.btn-group {
    display: flex;
    gap: var(--space-2);
}

.btn-group .btn {
    flex: 1;
}

.btn-group .btn:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.btn-group .btn:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 0;
}
```

---

## Phase 7: Footer Redesign (Week 3-4)

### Step 7.1: Redesign Footer HTML

**File:** `portfolio/templates/base.html`

Replace footer with modern design:

```html
<!-- Footer -->
<footer class="footer">
    <div class="footer-top">
        <div class="container">
            <div class="footer-content">
                <!-- Brand Column -->
                <div class="footer-brand">
                    <div class="footer-logo">
                        <img src="{% static 'images/logo.svg' %}" alt="Hawlader Agro">
                    </div>
                    <p class="footer-tagline" data-lang-en="Your trusted partner in halal livestock investment" data-lang-bn="আপনার বিশ্বস্ত হালাল পশুপালন বিনিয়োগ অংশীদার">
                        আপনার বিশ্বস্ত হালাল পশুপালন বিনিয়োগ অংশীদার
                    </p>
                    <div class="footer-social">
                        <a href="https://www.facebook.com/HawladerAgro.bd" target="_blank" class="social-link" aria-label="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" class="social-link" aria-label="YouTube">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                        <a href="#" class="social-link" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <!-- Quick Links -->
                <div class="footer-links">
                    <h4 data-lang-en="Quick Links" data-lang-bn="দ্রুত লিংক">দ্রুত লিংক</h4>
                    <ul>
                        <li><a href="{% url 'portfolio:home' %}">হোম</a></li>
                        <li><a href="{% url 'portfolio:project_list' %}">প্রজেক্ট</a></li>
                        <li><a href="{% url 'portfolio:about' %}">আমাদের সম্পর্কে</a></li>
                        <li><a href="{% url 'portfolio:investment' %}">বিনিয়োগ</a></li>
                        <li><a href="{% url 'portfolio:blog_list' %}">ব্লগ</a></li>
                        <li><a href="{% url 'portfolio:contact' %}">যোগাযোগ</a></li>
                    </ul>
                </div>
                
                <!-- Services -->
                <div class="footer-links">
                    <h4 data-lang-en="Services" data-lang-bn="সেবাসমূহ">সেবাসমূহ</h4>
                    <ul>
                        <li><a href="#">কাউ হোটেল</a></li>
                        <li><a href="#">লাইভ মনিটরিং</a></li>
                        <li><a href="#">ডিজিটাল হেলথ কার্ড</a></li>
                        <li><a href="#">বীমা সেবা</a></li>
                        <li><a href="#">ভেটেরিনারি সাপোর্ট</a></li>
                    </ul>
                </div>
                
                <!-- Contact -->
                <div class="footer-contact">
                    <h4 data-lang-en="Contact Us" data-lang-bn="যোগাযোগ করুন">যোগাযোগ করুন</h4>
                    <div class="contact-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span data-lang-en="Patuakhali, Barishal, Bangladesh" data-lang-bn="পটুয়াখালী, বরিশাল, বাংলাদেশ">পটুয়াখালী, বরিশাল, বাংলাদেশ</span>
                    </div>
                    <div class="contact-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <a href="mailto:info@hawladaragro.com">info@hawladaragro.com</a>
                    </div>
                    <div class="contact-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <a href="tel:+8801XXXXXXXXX">+880 1XXX-XXXXXX</a>
                    </div>
                    
                    <!-- Newsletter -->
                    <div class="footer-newsletter">
                        <p data-lang-en="Subscribe for updates" data-lang-bn="আপডেট পেতে সাবস্ক্রাইব করুন">আপডেট পেতে সাবস্ক্রাইব করুন</p>
                        <form class="newsletter-form">
                            <input type="email" placeholder="আপনার ইমেইল" required>
                            <button type="submit" class="btn btn-primary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Footer Bottom -->
    <div class="footer-bottom">
        <div class="container">
            <div class="footer-bottom-content">
                <p data-lang-en="&copy; {% now "Y" %} Hawlader Agro. All Rights Reserved." data-lang-bn="&copy; {% now "Y" %} হাওলাদার এগ্রো। সর্বস্বত্ব সংরক্ষিত।">
                    &copy; {% now "Y" %} হাওলাদার এগ্রো। সর্বস্বত্ব সংরক্ষিত।
                </p>
                <div class="footer-legal">
                    <a href="#">গোপনীয়তা নীতি</a>
                    <a href="#">ব্যবহারের শর্তাবলী</a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/8801XXXXXXXXX" target="_blank" class="whatsapp-float" aria-label="Chat on WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
    </a>
</footer>
```

### Step 7.2: Redesign Footer CSS

**File:** `static/css/styles.css`

Replace footer styles:

```css
/* ===================================
   MODERNIZED FOOTER
   =================================== */
.footer {
    background: var(--gray-900);
    color: var(--white);
    padding: 0;
}

.footer-top {
    padding: var(--section-padding-xl) 0;
}

.footer-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
    gap: var(--space-12);
}

.footer-brand {
    max-width: 300px;
}

.footer-logo {
    margin-bottom: var(--space-4);
}

.footer-logo img {
    max-height: 50px;
}

.footer-tagline {
    font-size: var(--font-size-base);
    color: var(--gray-400);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-6);
}

.footer-social {
    display: flex;
    gap: var(--space-3);
}

.social-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gray-800);
    border-radius: var(--radius-lg);
    color: var(--gray-400);
    transition: all var(--transition-fast);
}

.social-link:hover {
    background: var(--primary-green);
    color: var(--white);
    transform: translateY(-3px);
}

.footer-links h4,
.footer-contact h4 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--white);
    margin-bottom: var(--space-6);
}

.footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: var(--space-3);
}

.footer-links a {
    color: var(--gray-400);
    font-size: var(--font-size-base);
    transition: all var(--transition-fast);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
}

.footer-links a:hover {
    color: var(--primary-green);
    padding-left: var(--space-2);
}

.footer-links a::before {
    content: '';
    width: 4px;
    height: 4px;
    background: var(--primary-green);
    border-radius: 50%;
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.footer-links a:hover::before {
    opacity: 1;
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
    color: var(--gray-400);
    font-size: var(--font-size-base);
}

.contact-item svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--primary-green);
}

.contact-item a {
    color: var(--gray-400);
    transition: color var(--transition-fast);
}

.contact-item a:hover {
    color: var(--primary-green);
}

.footer-newsletter {
    margin-top: var(--space-8);
    padding-top: var(--space-6);
    border-top: 1px solid var(--gray-800);
}

.footer-newsletter p {
    font-size: var(--font-size-sm);
    color: var(--gray-400);
    margin-bottom: var(--space-3);
}

.newsletter-form {
    display: flex;
    gap: var(--space-2);
}

.newsletter-form input {
    flex: 1;
    padding: var(--space-3) var(--space-4);
    background: var(--gray-800);
    border: 1px solid var(--gray-700);
    border-radius: var(--radius-lg);
    color: var(--white);
    font-size: var(--font-size-sm);
    transition: all var(--transition-fast);
}

.newsletter-form input:focus {
    outline: none;
    border-color: var(--primary-green);
}

.newsletter-form input::placeholder {
    color: var(--gray-500);
}

.newsletter-form button {
    padding: var(--space-3);
}

.footer-bottom {
    background: var(--gray-950);
    padding: var(--space-6) 0;
}

.footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-bottom p {
    font-size: var(--font-size-sm);
    color: var(--gray-500);
    margin: 0;
}

.footer-legal {
    display: flex;
    gap: var(--space-6);
}

.footer-legal a {
    font-size: var(--font-size-sm);
    color: var(--gray-500);
    transition: color var(--transition-fast);
}

.footer-legal a:hover {
    color: var(--primary-green);
}

/* WhatsApp Floating Button */
.whatsapp-float {
    position: fixed;
    bottom: var(--space-6);
    right: var(--space-6);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #25D366;
    color: var(--white);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-xl);
    z-index: var(--z-tooltip);
    transition: all var(--transition-base);
}

.whatsapp-float:hover {
    transform: scale(1.1);
    box-shadow: 0 20px 40px -5px rgba(37, 211, 102, 0.4);
}

/* Responsive */
@media (max-width: 1024px) {
    .footer-content {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        gap: var(--space-8);
    }
    
    .footer-brand {
        max-width: 100%;
    }
    
    .footer-bottom-content {
        flex-direction: column;
        gap: var(--space-4);
        text-align: center;
    }
    
    .whatsapp-float {
        width: 50px;
        height: 50px;
        bottom: var(--space-4);
        right: var(--space-4);
    }
}
```

---

## Phase 8: Accessibility Improvements (Week 4)

### Step 8.1: Add Skip to Content Link

**File:** `portfolio/templates/base.html`

Add skip link at the top of body:

```html
<body>
    <!-- Skip to Content -->
    <a href="#main-content" class="skip-link">মূল বিষয়বস্তুতে যান</a>
    
    <!-- Header / Navigation -->
    <header id="main-header">
        ...
    </header>
    
    <!-- Main Content -->
    <main id="main-content">
        {% block content %}{% endblock %}
    </main>
```

### Step 8.2: Add Skip Link CSS

**File:** `static/css/styles.css`

```css
/* ===================================
   ACCESSIBILITY - SKIP LINK
   =================================== */
.skip-link {
    position: absolute;
    top: -100%;
    left: var(--space-4);
    padding: var(--space-3) var(--space-6);
    background: var(--primary-green);
    color: var(--white);
    font-weight: var(--font-weight-semibold);
    border-radius: var(--radius-lg);
    z-index: 9999;
    transition: top var(--transition-base);
    text-decoration: none;
}

.skip-link:focus {
    top: var(--space-4);
    outline: 3px solid var(--accent-amber);
    outline-offset: 2px;
}

/* Focus Styles for All Interactive Elements */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
    outline: 3px solid var(--primary-green);
    outline-offset: 2px;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
    :root {
        --primary-green: #006400;
        --text-primary: #000000;
        --text-secondary: #1a1a1a;
    }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .scroll-reveal,
    .scroll-reveal-left,
    .scroll-reveal-right,
    .scroll-reveal-scale {
        opacity: 1;
        transform: none;
    }
}
```

---

## Phase 9: Mobile Responsiveness (Week 4)

### Step 9.1: Add Mobile-Specific Improvements

**File:** `static/css/styles.css`

Add comprehensive mobile styles:

```css
/* ===================================
   MOBILE RESPONSIVENESS
   =================================== */

/* Tablet */
@media (max-width: 1024px) {
    .container {
        padding: 0 var(--space-6);
    }
    
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
    
    .project-content {
        grid-template-columns: 1fr;
    }
    
    .about-content {
        grid-template-columns: 1fr;
    }
    
    .footer-content {
        grid-template-columns: 1fr 1fr;
    }
}

/* Mobile */
@media (max-width: 768px) {
    /* Typography */
    .hero-title {
        font-size: var(--font-size-4xl);
    }
    
    .hero-tagline {
        font-size: var(--font-size-base);
    }
    
    .hero-features li {
        font-size: var(--font-size-base);
    }
    
    .section-title {
        font-size: var(--font-size-3xl);
    }
    
    /* Spacing */
    section {
        padding: var(--section-padding-md) 0;
    }
    
    /* Navigation */
    .nav-menu {
        display: none;
    }
    
    .mobile-menu-toggle {
        display: flex;
    }
    
    /* Hero */
    .hero-section {
        padding-top: 70px;
        min-height: auto;
        padding-bottom: var(--section-padding-md);
    }
    
    .hero-badges {
        flex-direction: column;
        align-items: center;
    }
    
    .hero-buttons {
        flex-direction: column;
        width: 100%;
    }
    
    .hero-buttons .btn {
        width: 100%;
    }
    
    .hero-social-proof {
        flex-direction: column;
        gap: var(--space-4);
    }
    
    .social-proof-divider {
        width: 40px;
        height: 1px;
    }
    
    /* Cards */
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .investment-content {
        grid-template-columns: 1fr;
    }
    
    .team-grid {
        grid-template-columns: 1fr;
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    /* Footer */
    .footer-content {
        grid-template-columns: 1fr;
        gap: var(--space-8);
    }
    
    .footer-brand {
        max-width: 100%;
    }
    
    .footer-bottom-content {
        flex-direction: column;
        gap: var(--space-4);
        text-align: center;
    }
    
    /* Touch Targets */
    .btn {
        min-height: 48px;
    }
    
    .nav-action-btn,
    .lang-toggle {
        min-width: 44px;
        min-height: 44px;
    }
    
    /* Scroll to Top */
    .scroll-top {
        width: 44px;
        height: 44px;
        bottom: var(--space-4);
        right: var(--space-4);
    }
    
    /* WhatsApp Button */
    .whatsapp-float {
        width: 50px;
        height: 50px;
        bottom: var(--space-4);
        right: var(--space-4);
    }
}

/* Small Mobile */
@media (max-width: 480px) {
    .container {
        padding: 0 var(--space-4);
    }
    
    .hero-title {
        font-size: var(--font-size-3xl);
    }
    
    .hero-tagline {
        font-size: var(--font-size-sm);
    }
    
    .section-title {
        font-size: var(--font-size-2xl);
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
    
    .investment-card {
        padding: var(--space-4);
    }
    
    .investment-card-stats {
        padding: var(--space-4);
    }
}
```

---

## Summary & Next Steps

This implementation plan provides a comprehensive roadmap for transforming the HawladarAgro portfolio website. The changes are organized into phases that can be implemented incrementally.

### Implementation Order:
1. **Phase 1:** Foundation & Design System (Week 1)
2. **Phase 2:** Hero Section Redesign (Week 1-2)
3. **Phase 3:** Navigation & Header Redesign (Week 2)
4. **Phase 4:** Investment Cards Redesign (Week 2-3)
5. **Phase 5:** Section Titles & Visual Hierarchy (Week 3)
6. **Phase 6:** Buttons & Interactive Elements (Week 3)
7. **Phase 7:** Footer Redesign (Week 3-4)
8. **Phase 8:** Accessibility Improvements (Week 4)
9. **Phase 9:** Mobile Responsiveness (Week 4)

### Key Improvements:
- **Modernized color palette** with better contrast and harmony
- **Professional typography system** with proper font pairing
- **Consistent spacing system** based on 8px grid
- **Enhanced visual hierarchy** through varied section styles
- **Improved accessibility** with WCAG compliance
- **Better mobile experience** with responsive design
- **Modern UI components** with smooth animations
- **Social proof elements** to build trust

### Testing Checklist:
- [ ] Test all color contrasts for WCAG AA compliance
- [ ] Verify keyboard navigation works throughout
- [ ] Test screen reader compatibility
- [ ] Validate responsive behavior on multiple devices
- [ ] Check performance metrics (Lighthouse)
- [ ] Test language toggle functionality
- [ ] Verify all animations respect reduced motion preferences
- [ ] Test form submissions and error handling
- [ ] Validate cross-browser compatibility
- [ ] Conduct user testing with real users

---

**End of Implementation Plan Part 2**
