/* main.js */

// Wait for DOM to load, then initialize all features
document.addEventListener('DOMContentLoaded', () => {
    updateYear();
    initScrollEffects();
    initHamburger();
    initAnimations();
    initProgressBar();
    initSlideshow(); // Initialize slideshow
});

// Remove preloader on full window load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('loaded'); // Trigger CSS fade-out effect
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Update the footer with the current year
function updateYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Initialize scroll effects for sticky navigation and back-to-top button
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
        updateProgressBar(); // Update scroll progress
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize hamburger menu toggle for mobile devices
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Initialize IntersectionObserver for animations
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.logo, .nav-links a, .hero-content, .hero h1, .tagline, .hero-text p, ' +
        '.page-header, .project-info h2, .project-info p, .contact-section, .contact-info li, ' +
        '.cta-text, footer, .about, .about h2, .about p, .services, .services h2, ' +
        '.service, .service h3, .service p, .skills h2, .skills li, ' +
        '.testimonials, .testimonials h2, .testimonial, .testimonial cite, ' +
        '.process, .process h2, .process p, .process li, ' +
        '.contact-form, .contact-form h2, .form-group label, .form-group input, .form-group textarea, ' +
        '.additional-info, .additional-info h2, .additional-info p, .additional-info li'
    );

    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

// Initialize and update the scroll progress bar
function initProgressBar() {
    updateProgressBar();
}

// Update progress bar width based on scroll position
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
}

// Initialize Slideshow for the Projects Page
function initSlideshow() {
    const slidesContainer = document.getElementById('slides');
    if (!slidesContainer) return; // If no slideshow exists, skip

    const totalSlides = slidesContainer.children.length;
    let currentSlide = 0;
    let canSlide = true;

    function updateSlide() {
        slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
    }

    function slideNext() {
        if (currentSlide < totalSlides - 1 && canSlide) {
            canSlide = false;
            currentSlide++;
            updateSlide();
            setTimeout(() => { canSlide = true; }, 600);
        }
    }

    function slidePrev() {
        if (currentSlide > 0 && canSlide) {
            canSlide = false;
            currentSlide--;
            updateSlide();
            setTimeout(() => { canSlide = true; }, 600);
        }
    }

    // Auto-slide every 4 seconds
    setInterval(() => {
        slideNext();
        if (currentSlide === totalSlides - 1) {
            setTimeout(() => {
                currentSlide = 0;
                updateSlide();
            }, 4000);
        }
    }, 4000);

    // Hover zones for manual slide navigation
    const leftZone = document.getElementById('leftZone');
    const rightZone = document.getElementById('rightZone');

    if (leftZone && rightZone) {
        rightZone.addEventListener('mouseenter', slideNext);
        leftZone.addEventListener('mouseenter', slidePrev);
    }
}
