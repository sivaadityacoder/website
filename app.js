/* ═══════════════════════════════════════
   ADITYA SECURITY LABS — APP.JS
   Professional Cybersecurity Company Website
   ═══════════════════════════════════════ */

(function() {
    'use strict';

    /* ═══════════════════════════════════════
       NAVIGATION
       ═══════════════════════════════════════ */
    
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            const spans = hamburger.querySelectorAll('span');
            
            if (navLinks.classList.contains('open')) {
                spans[0].style.transform = 'translateY(7px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
                hamburger.querySelectorAll('span').forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }

    /* ═══════════════════════════════════════
       SMOOTH SCROLL
       ═══════════════════════════════════════ */
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ═══════════════════════════════════════
       CONTACT FORM
       ═══════════════════════════════════════ */
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                role: document.getElementById('role').value,
                service: document.getElementById('service').value,
                details: document.getElementById('details').value
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.company) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In production, send to backend API
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your request. We will contact you within 24 business hours.');
            
            // Reset form
            contactForm.reset();
            
            // In production, you would send this to your backend:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Thank you! We will contact you soon.');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     alert('Sorry, there was an error. Please email us directly.');
            // });
        });
    }

    /* ═══════════════════════════════════════
       INTERSECTION OBSERVER (FADE-IN ANIMATIONS)
       ═══════════════════════════════════════ */
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.service-card, .principle-card, .differentiator-card, .case-study-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    /* ═══════════════════════════════════════
       ANALYTICS HELPERS
       ═══════════════════════════════════════ */
    
    // Track CTA clicks
    document.querySelectorAll('.btn-primary, .btn-ghost, .btn-primary-large').forEach(button => {
        button.addEventListener('click', function() {
            const ctaText = this.textContent.trim();
            const ctaLocation = this.closest('section')?.id || 'unknown';
            
            // Log for development
            console.log('CTA clicked:', {
                text: ctaText,
                location: ctaLocation,
                timestamp: new Date().toISOString()
            });
            
            // In production, send to analytics:
            // gtag('event', 'cta_click', {
            //     cta_text: ctaText,
            //     cta_location: ctaLocation
            // });
        });
    });

    /* ═══════════════════════════════════════
       INITIALIZATION
       ═══════════════════════════════════════ */
    
    // Check initial scroll position
    handleScroll();
    
    // Log page load (for development)
    console.log('Aditya Security Labs - Website Initialized');
    console.log('Professional Cybersecurity Services');

})();
