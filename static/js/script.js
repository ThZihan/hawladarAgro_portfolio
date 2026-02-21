/* ===================================
   HAWLADAR AGRO - FARM PORTFOLIO
   Enhanced JavaScript Interactivity
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
    
    function closeMobileMenu() {
        if (navMenu && mobileMenuToggle) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    // ===================================
    // Language Toggle System
    // ===================================
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const langCurrent = document.querySelector('.lang-current');
    const htmlElement = document.documentElement;
    
    // Initialize language from localStorage or default to Bengali
    let currentLang = localStorage.getItem('preferredLanguage') || 'bn';
    
    // Function to apply language to all elements
    function applyLanguage(lang) {
        // Update HTML lang attribute
        htmlElement.setAttribute('lang', lang === 'bn' ? 'bn-BD' : 'en');
        htmlElement.setAttribute('data-lang', lang);
        
        // Update all elements with data-lang attributes
        const elements = document.querySelectorAll('[data-lang-en], [data-lang-bn]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-lang-${lang}`);
            if (text) {
                // Check if element has a span child (for buttons with icons)
                const span = element.querySelector('span');
                if (span) {
                    span.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // Update current language display
        if (langCurrent) {
            langCurrent.textContent = lang === 'bn' ? 'বাং' : 'Eng';
        }
        
        // Save preference to localStorage
        localStorage.setItem('preferredLanguage', lang);
        
        // Close dropdown
        if (langDropdown) {
            langDropdown.classList.remove('active');
        }
    }
    
    // Apply saved language on page load
    applyLanguage(currentLang);
    
    // Toggle dropdown when clicking language button
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (langDropdown) {
                langDropdown.classList.toggle('active');
            }
        });
    }
    
    // Handle language option clicks
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const selectedLang = this.getAttribute('data-lang');
            if (selectedLang && selectedLang !== currentLang) {
                currentLang = selectedLang;
                applyLanguage(currentLang);
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (langDropdown && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });
    
    // ===================================
    // Scroll to Top Button
    // ===================================
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', throttle(function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, 100));
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===================================
    // Header Background & Scroll Effects
    // ===================================
    const header = document.querySelector('#main-header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for shadow and background
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, 100));
    }
    
    // ===================================
    // Smooth Scrolling for Navigation Links
    // ===================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Intersection Observer for Scroll Animations
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: [0.1, 0.25, 0.5]
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = element.dataset.animation || 'scroll-reveal';
                
                element.classList.add('visible');
                
                // Add staggered animation delay if specified
                if (element.dataset.delay) {
                    element.style.transitionDelay = element.dataset.delay;
                }
                
                // Unobserve after animation
                scrollObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, ' +
        '.project-card, .investment-card, .blog-card, .team-card, .facility-card, ' +
        '.stat-card, .gallery-item, .media-logo-item, .opportunity-card, ' +
        '.facility-item, .stat-item, .trust-content, .livestock-content, .about-content'
    );
    
    animatedElements.forEach((element, index) => {
        // Add stagger delay based on index
        const staggerDelay = (index % 6) * 0.1;
        element.style.transitionDelay = staggerDelay + 's';
        scrollObserver.observe(element);
    });
    
    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const heroSection = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroSection && heroBackground) {
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.4;
            
            if (scrolled < heroSection.offsetHeight) {
                heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        }, 16)); // ~60fps
    }
    
    // ===================================
    // Counter Animation for Stats
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();
        const isBengali = element.textContent.includes('০') || element.textContent.includes('১');
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            if (isBengali) {
                element.textContent = toBengaliNumber(current);
            } else {
                element.textContent = current;
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    };
    
    // Convert English numbers to Bengali
    function toBengaliNumber(num) {
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().replace(/[0-9]/g, d => bengaliDigits[d]);
    }
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.count) || parseInt(element.textContent.replace(/[^\d]/g, ''));
                
                if (!isNaN(target)) {
                    animateCounter(element, target);
                }
                
                counterObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // ===================================
    // Active Navigation Link on Scroll
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks2 = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    if (sections.length > 0 && navLinks2.length > 0) {
        window.addEventListener('scroll', throttle(function() {
            let current = '';
            const scrollPosition = window.pageYOffset + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks2.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }, 100));
    }
    
    // ===================================
    // Image Lazy Loading with Fade-in Effect
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.classList.add('lazy-loading');
            imageObserver.observe(img);
        });
    }
    
    // ===================================
    // Card Hover Effects with 3D Tilt
    // ===================================
    const cards = document.querySelectorAll('.project-card, .investment-card, .blog-card, .team-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ===================================
    // Image Lightbox (for gallery and blog images)
    // ===================================
    const lightboxImages = document.querySelectorAll('.gallery-item img, .blog-card img');
    
    lightboxImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });
    
    function createLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img src="${src}" alt="${alt}">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox on button click
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        
        // Close lightbox on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close lightbox on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
        
        function closeLightbox() {
            lightbox.classList.add('closing');
            setTimeout(() => {
                if (lightbox.parentNode) {
                    document.body.removeChild(lightbox);
                }
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // ===================================
    // Form Validation with Real-time Feedback
    // ===================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateInput(this);
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Form submission logic here
                showNotification('ফর্ম সফলভাবে জমা হয়েছে!', 'success');
                form.reset();
            } else {
                showNotification('অনুগ্রহ করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন।', 'error');
            }
        });
    });
    
    function validateInput(input) {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            return false;
        }
        
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                return false;
            }
        }
        
        input.classList.remove('error');
        return true;
    }
    
    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // ===================================
    // Progress Bar Animation
    // ===================================
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease-out';
                    progressBar.style.width = width;
                }, 200);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // ===================================
    // Floating Elements Animation
    // ===================================
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.5;
        element.style.animationDelay = delay + 's';
    });
    
    // ===================================
    // Typing Effect for Hero Title
    // ===================================
    const titleTyping = document.querySelector('.title-typing');
    
    if (titleTyping && window.innerWidth > 768) {
        // Get the text based on current language
        const currentLang = document.documentElement.lang || 'bn';
        const text = titleTyping.getAttribute(`data-lang-${currentLang}`) || titleTyping.textContent;
        
        // Clear the typing span content
        titleTyping.textContent = '';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                titleTyping.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // ===================================
    // Console Message
    // ===================================
    console.log('%c হাওলাদার এগ্রো - Hawladar Agro ', 'background: #017B46; color: #ffffff; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Built with Django, HTML, CSS, and JavaScript ', 'color: #017B46; font-size: 14px;');
    console.log('%c 🌾 Sustainable Farming for a Better Future ', 'color: #FECE00; font-size: 12px;');
    
    // ===================================
    // Pie Chart & Card Interaction
    // ===================================
    const pieSlices = document.querySelectorAll('.pie-slice');
    const profitCards = document.querySelectorAll('.profit-card');
    
    // Map slice classes to card classes
    const sliceCardMap = {
        'pie-slice-investor': 'profit-card-investor',
        'pie-slice-manager': 'profit-card-manager',
        'pie-slice-caretaker': 'profit-card-caretaker'
    };
    
    // Add hover interactions for pie slices
    pieSlices.forEach(slice => {
        slice.addEventListener('mouseenter', function() {
            // Get the corresponding card class
            const sliceClass = Array.from(this.classList).find(cls => cls.startsWith('pie-slice-') && cls !== 'pie-slice' && cls !== 'pie-slice-extended');
            const cardClass = sliceCardMap[sliceClass];
            
            if (cardClass) {
                // Add hover class to enlarge slice
                this.classList.add('slice-hover');
                
                // Highlight the corresponding card
                const correspondingCard = document.querySelector(`.${cardClass}`);
                if (correspondingCard) {
                    correspondingCard.classList.add('card-highlight');
                }
            }
        });
        
        slice.addEventListener('mouseleave', function() {
            // Get the corresponding card class
            const sliceClass = Array.from(this.classList).find(cls => cls.startsWith('pie-slice-') && cls !== 'pie-slice' && cls !== 'pie-slice-extended');
            const cardClass = sliceCardMap[sliceClass];
            
            if (cardClass) {
                // Remove hover class
                this.classList.remove('slice-hover');
                
                // Remove highlight from card
                const correspondingCard = document.querySelector(`.${cardClass}`);
                if (correspondingCard) {
                    correspondingCard.classList.remove('card-highlight');
                }
            }
        });
    });
    
    // Add hover interactions for profit cards
    profitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Get the corresponding slice class
            const cardClass = Array.from(this.classList).find(cls => cls.startsWith('profit-card-') && cls !== 'profit-card' && cls !== 'profit-card-highlighted');
            const sliceClass = cardClass ? cardClass.replace('profit-card-', 'pie-slice-') : null;
            
            if (sliceClass) {
                // Highlight the card
                this.classList.add('card-highlight');
                
                // Enlarge the corresponding slice
                const correspondingSlice = document.querySelector(`.${sliceClass}`);
                if (correspondingSlice) {
                    correspondingSlice.classList.add('slice-hover');
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Get the corresponding slice class
            const cardClass = Array.from(this.classList).find(cls => cls.startsWith('profit-card-') && cls !== 'profit-card' && cls !== 'profit-card-highlighted');
            const sliceClass = cardClass ? cardClass.replace('profit-card-', 'pie-slice-') : null;
            
            if (sliceClass) {
                // Remove highlight from card
                this.classList.remove('card-highlight');
                
                // Reset slice
                const correspondingSlice = document.querySelector(`.${sliceClass}`);
                if (correspondingSlice) {
                    correspondingSlice.classList.remove('slice-hover');
                }
            }
        });
    });
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get element offset
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

// Check if element is in viewport
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(element, offset = 80) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Add CSS for lightbox and notifications
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Lightbox Styles */
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.show {
        opacity: 1;
    }
    
    .lightbox.closing {
        opacity: 0;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .lightbox-close:hover {
        transform: scale(1.1);
    }
    
    /* Notification Styles */
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease, opacity 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: linear-gradient(135deg, #28a745, #20c997);
    }
    
    .notification-error {
        background: linear-gradient(135deg, #dc3545, #c82333);
    }
    
    .notification-info {
        background: linear-gradient(135deg, #17a2b8, #138496);
    }
    
    /* Mobile Menu Open State */
    body.menu-open {
        overflow: hidden;
    }
    
    /* Lazy Loading Styles */
    .lazy-loading {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy-loading.loaded {
        opacity: 1;
    }
    
    /* Form Error Styles */
    .error {
        border-color: #dc3545 !important;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
        .lightbox,
        .notification,
        .lazy-loading {
            transition: none;
        }
    }
`;
document.head.appendChild(additionalStyles);
