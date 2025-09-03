/**
 * Abel Parlor Portfolio - Main JavaScript File
 * Handles 3D effects, animations, and interactive features
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});

/**
 * Initialize all components and event listeners
 */
function initializeComponents() {
    setupNavigation();
    setupScrollAnimations();
    setupSkillBars();
    setupContactForm(); // Enhanced with client-side validation
    setupParallaxEffects();
    setupMobileMenu(); // Mobile menu setup
    setup3DEffects();
    setupPerformanceOptimizations();
}

/**
 * Navigation functionality
 */
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollTop = 0;

    // Only use smooth scrolling for anchor links (href starting with #)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // Update active link
                    updateActiveNavLink(href);
                }
            }
            // For normal links (like about.html), let the browser handle navigation
        });
    });

    // Navbar scroll effects
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolling down
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavOnScroll();
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = '#' + section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavLink(sectionId);
        }
    });
}

/**
 * Scroll animations using Intersection Observer
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
                
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.skill-item, .service-card, .portfolio-card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

/**
 * Skill bar animations
 */
function setupSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const skillLevel = item.getAttribute('data-skill');
        const progressBar = item.querySelector('.skill-progress');
        
        if (progressBar) {
            // Set initial state
            progressBar.style.transform = 'scaleX(0)';
            
            // Store skill level for animation
            progressBar.setAttribute('data-width', skillLevel);
        }
    });
}

/**
 * Animate individual skill bar
 */
function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    if (progressBar) {
        const skillLevel = progressBar.getAttribute('data-width');
        const scaleX = skillLevel / 100;
        
        setTimeout(() => {
            progressBar.style.transform = `scaleX(${scaleX})`;
        }, 200);
    }
}

/**
 * Animate service card with 3D effect
 */
function animateServiceCard(serviceCard) {
    serviceCard.style.opacity = '0';
    serviceCard.style.transform = 'perspective(1000px) rotateX(-30deg) translateY(50px)';
    
    setTimeout(() => {
        serviceCard.style.transition = 'all 0.8s ease';
        serviceCard.style.opacity = '1';
        serviceCard.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
    }, 100);
}

/**
 * Enhanced contact form handling with validation and accessibility
 */
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) {
        console.warn('Contact form not found');
        return;
    }

    console.log('Setting up contact form...');

    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitIcon = document.getElementById('submit-icon');
    const submitStatus = document.getElementById('submit-status');

    // Check if all required elements exist
    if (!submitBtn || !submitText || !submitIcon || !submitStatus) {
        console.error('Some form elements are missing:', {
            submitBtn: !!submitBtn,
            submitText: !!submitText,
            submitIcon: !!submitIcon,
            submitStatus: !!submitStatus
        });
        return;
    }

    console.log('Form action URL:', form.action);

    // Mark form as enhanced
    form.setAttribute('data-enhanced', 'true');

    // Form state management
    let isSubmitting = false;
    let formData = {};

    // Load saved form data from localStorage
    loadFormData();

    // Real-time validation on blur
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
            saveFormData();
        });

        input.addEventListener('input', function() {
            // Clear errors when user starts typing
            if (this.classList.contains('border-red-500')) {
                clearFieldError(this);
            }
            saveFormData();
        });
    });

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        console.log('Form submit event triggered');

        // Check if form has been enhanced by JavaScript
        if (form.getAttribute('data-enhanced') !== 'true') {
            console.log('Form not enhanced, allowing default submission');
            return; // Allow default form submission
        }

        e.preventDefault();
        console.log('Preventing default form submission');

        if (isSubmitting) {
            console.log('Already submitting, ignoring');
            return;
        }

        // Validate entire form
        if (!validateFormFields()) {
            console.log('Form validation failed');
            showFormMessage('Please correct the errors above and try again.', 'error');
            return;
        }

        console.log('Form validation passed, proceeding with submission');

        // Set submitting state
        setSubmittingState(true);

        try {
            // Prepare form data
            const formData = new FormData(form);

            // Debug: Log form data (remove in production)
            console.log('Submitting form data:', Object.fromEntries(formData));

            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log('Formspree response status:', response.status);

            if (response.ok) {
                // Success
                console.log('Form submitted successfully');
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                clearFormData();
                form.reset();
                setTimeout(() => {
                    window.location.href = 'thankyou.html';
                }, 2000);
            } else {
                // Handle Formspree errors
                const errorText = await response.text();
                console.error('Formspree error response:', errorText);

                let errorMessage = 'Failed to send message';
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    // If response is not JSON, use the text as error message
                    errorMessage = errorText || errorMessage;
                }

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage(`Sorry, there was an error sending your message: ${error.message}. Please try again or contact me directly.`, 'error');
        } finally {
            setSubmittingState(false);
        }
    });

    /**
     * Set form submitting state
     */
    function setSubmittingState(submitting) {
        isSubmitting = submitting;

        if (submitting) {
            submitBtn.disabled = true;
            submitBtn.classList.add('disabled:opacity-50');
            submitText.textContent = 'Sending...';
            submitIcon.setAttribute('data-feather', 'loader');
            submitStatus.textContent = 'Sending your message, please wait...';
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('disabled:opacity-50');
            submitText.textContent = 'Send Message';
            submitIcon.setAttribute('data-feather', 'send');
            submitStatus.textContent = 'Click to send your message';
        }

        // Re-initialize feather icons
        if (window.feather) feather.replace();
    }

    /**
     * Save form data to localStorage
     */
    function saveFormData() {
        const data = {};
        inputs.forEach(input => {
            if (input.name && input.value) {
                data[input.name] = input.value;
            }
        });
        localStorage.setItem('contactFormData', JSON.stringify(data));
    }

    /**
     * Load form data from localStorage
     */
    function loadFormData() {
        try {
            const savedData = localStorage.getItem('contactFormData');
            if (savedData) {
                const data = JSON.parse(savedData);
                inputs.forEach(input => {
                    if (data[input.name]) {
                        input.value = data[input.name];
                    }
                });
            }
        } catch (error) {
            console.warn('Failed to load saved form data:', error);
        }
    }

    /**
     * Clear saved form data
     */
    function clearFormData() {
        localStorage.removeItem('contactFormData');
    }

    /**
     * Enhanced form message display
     */
    function showFormMessage(message, type = 'success') {
        const messageContainer = document.getElementById('form-messages');
        const existingMessage = messageContainer.querySelector('.form-message');

        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message p-4 rounded-lg mb-4 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`;
        messageElement.setAttribute('role', 'alert');
        messageElement.setAttribute('aria-live', 'assertive');
        messageElement.textContent = message;

        messageContainer.appendChild(messageElement);
        messageContainer.classList.remove('sr-only');

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
            messageContainer.classList.add('sr-only');
        }, 5000);
    }
}

/**
 * Validate all form fields before submission
 */
function validateFormFields() {
    const form = document.getElementById('contact-form');
    if (!form) return false;

    let isValid = true;

    // Clear previous errors
    clearFormErrors();

    // Get form field values
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Validate name
    if (!name || name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (!subject || subject.length < 5) {
        showFieldError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
    }

    // Validate message
    if (!message || message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

/**
 * Validate form data (legacy function for backward compatibility)
 */
function validateForm(data) {
    if (!data) return false;

    let isValid = true;

    // Clear previous errors
    clearFormErrors();

    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (!data.subject || data.subject.trim().length < 5) {
        showFieldError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
    }

    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError('email', 'Please enter a valid email address');
                return false;
            }
            break;
        case 'subject':
            if (value.length < 5) {
                showFieldError('subject', 'Subject must be at least 5 characters long');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
                return false;
            }
            break;
    }
    
    return true;
}

/**
 * Show field error with accessibility support
 */
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    const errorContainer = document.getElementById(`${fieldName}-error`);

    if (!field || !errorContainer) return;

    // Remove existing error
    const existingError = errorContainer.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add error styling
    field.classList.add('border-red-500', 'focus:border-red-500');
    field.classList.remove('border-gray-600', 'focus:border-primary');
    field.setAttribute('aria-invalid', 'true');

    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message text-red-400 text-sm mt-1 block';
    errorElement.setAttribute('role', 'alert');
    errorElement.textContent = message;
    errorContainer.appendChild(errorElement);
    errorContainer.classList.remove('sr-only');
}

/**
 * Clear field error with accessibility support
 */
function clearFieldError(field) {
    const errorContainer = document.getElementById(`${field.name}-error`);
    const errorMessage = errorContainer?.querySelector('.error-message');

    if (errorMessage) {
        errorMessage.remove();
        errorContainer.classList.add('sr-only');
    }

    // Reset field styling
    field.classList.remove('border-red-500', 'focus:border-red-500');
    field.classList.add('border-gray-600', 'focus:border-primary');
    field.setAttribute('aria-invalid', 'false');
}

/**
 * Clear all form errors with accessibility support
 */
function clearFormErrors() {
    // Clear field-specific errors
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());

    // Reset error containers
    const errorContainers = document.querySelectorAll('[id$="-error"]');
    errorContainers.forEach(container => container.classList.add('sr-only'));

    // Reset field styling
    const errorFields = document.querySelectorAll('.border-red-500');
    errorFields.forEach(field => {
        field.classList.remove('border-red-500', 'focus:border-red-500');
        field.classList.add('border-gray-600', 'focus:border-primary');
        field.setAttribute('aria-invalid', 'false');
    });
}

// Old showFormMessage function removed - now handled in setupContactForm

/**
 * Parallax effects for hero section
 */
function setupParallaxEffects() {
    const heroSection = document.getElementById('home');
    const floatingShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        // Move floating shapes
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = scrolled * speed;
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Hero content parallax
        const heroContent = heroSection.querySelector('.relative.z-10');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

/**
 * Mobile menu functionality
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Prevent multiple initializations
    if (!mobileMenuBtn || !mobileMenu || mobileMenuBtn.hasAttribute('data-initialized')) {
        return;
    }

    // Mark as initialized
    mobileMenuBtn.setAttribute('data-initialized', 'true');

    let isOpen = false;
    let lastFocusedElement = null;

    function openMenu() {
        console.log('openMenu called');
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('-translate-y-4', 'opacity-0');
            mobileMenu.classList.add('translate-y-0', 'opacity-100');
        }, 10);
        mobileMenuBtn.innerHTML = '<i data-feather="x" class="w-6 h-6"></i>';
        feather.replace();
        isOpen = true;
        console.log('Menu opened, isOpen:', isOpen);
        // Trap focus
        lastFocusedElement = document.activeElement;
        const firstLink = mobileMenu.querySelector('.nav-link');
        if (firstLink) firstLink.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        console.log('closeMenu called');
        mobileMenu.classList.remove('translate-y-0', 'opacity-100');
        mobileMenu.classList.add('-translate-y-4', 'opacity-0');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 250);
        mobileMenuBtn.innerHTML = '<i data-feather="menu" class="w-6 h-6"></i>';
        feather.replace();
        isOpen = false;
        console.log('Menu closed, isOpen:', isOpen);
        // Restore focus
        if (lastFocusedElement) lastFocusedElement.focus();
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn && mobileMenu) {
        console.log('Setting up mobile menu click handler');

        mobileMenuBtn.addEventListener('click', function(e) {
            console.log('Mobile menu button clicked, isOpen:', isOpen);
            e.preventDefault();
            e.stopPropagation();

            if (isOpen) {
                console.log('Closing menu');
                closeMenu();
            } else {
                console.log('Opening menu');
                openMenu();
            }
        });

        // Close mobile menu when clicking on links
        const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close on outside click (with small delay to prevent immediate triggering)
        document.addEventListener('click', function(e) {
            setTimeout(() => {
                if (isOpen &&
                    !mobileMenu.contains(e.target) &&
                    e.target !== mobileMenuBtn &&
                    !mobileMenuBtn.contains(e.target)) {
                    console.log('Outside click detected, closing menu');
                    closeMenu();
                }
            }, 10);
        });

        // Keyboard accessibility: Escape to close, Tab trap
        document.addEventListener('keydown', function(e) {
            if (isOpen) {
                if (e.key === 'Escape') {
                    closeMenu();
                }
                // Trap tab focus inside menu
                if (e.key === 'Tab') {
                    const focusableEls = mobileMenu.querySelectorAll('a, button');
                    const firstEl = focusableEls[0];
                    const lastEl = focusableEls[focusableEls.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === firstEl) {
                            e.preventDefault();
                            lastEl.focus();
                        }
                    } else {
                        if (document.activeElement === lastEl) {
                            e.preventDefault();
                            firstEl.focus();
                        }
                    }
                }
            }
        });
    }
}

/**
 * Setup 3D effects and interactions
 */
function setup3DEffects() {
    // Portfolio card 3D hover effects
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg) translateZ(50px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
        });
        
        // Touch support for mobile
        card.addEventListener('touchstart', function() {
            this.classList.toggle('touched');
        });
    });
    
    // Service card 3D effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // CTA button 3D effects
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(-10deg) translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px) scale(1)';
        });
    });
}

/**
 * Performance optimizations
 */
function setupPerformanceOptimizations() {
    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                if (originalScrollHandler) {
                    originalScrollHandler();
                }
            }, 16); // ~60fps
        }
    });
    
    // Lazy load animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const lazyAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('will-change-transform');
                setTimeout(() => {
                    entry.target.classList.remove('will-change-transform');
                }, 1000);
            }
        });
    }, observerOptions);
    
    // Observe elements that will animate
    const animatedElements = document.querySelectorAll('.portfolio-card, .service-card, .cta-button');
    animatedElements.forEach(el => {
        lazyAnimationObserver.observe(el);
    });
    
    // Preload critical assets
    preloadCriticalAssets();
}

/**
 * Preload critical assets
 */
function preloadCriticalAssets() {
    // Preload fonts
    const fontUrls = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'
    ];
    
    fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
    
    // Preload Feather Icons
    const featherScript = document.createElement('link');
    featherScript.rel = 'preload';
    featherScript.as = 'script';
    featherScript.href = 'https://unpkg.com/feather-icons';
    document.head.appendChild(featherScript);
}

/**
 * Utility function to debounce events
 */
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

/**
 * Utility function to throttle events
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Handle keyboard navigation for accessibility
 */
document.addEventListener('keydown', function(e) {
    // Handle escape key to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '<i data-feather="menu" class="w-6 h-6"></i>';
            feather.replace();
        }
    }
    
    // Handle enter/space for card interactions
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('portfolio-card')) {
            e.preventDefault();
            focusedElement.classList.toggle('touched');
        }
    }
});

/**
 * Handle reduced motion preferences
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Error handling for failed resource loads
 */
window.addEventListener('error', function(e) {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
    
    // Handle specific error cases
    if (e.target.tagName === 'SCRIPT' && e.target.src.includes('feather-icons')) {
        console.warn('Feather icons failed to load. Using fallback.');
        // You could implement fallback icons here
    }
});

/**
 * Initialize on page load if DOM is already ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
    initializeComponents();
}

// Export functions for testing or external use
window.PortfolioApp = {
    initializeComponents,
    setupNavigation,
    setupScrollAnimations,
    setupMobileMenu,
    validateForm,
    debounce,
    throttle
};
