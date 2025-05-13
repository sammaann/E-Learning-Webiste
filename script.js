// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let slideWidth = 0;
    let autoSlideInterval;
    
    // Initialize slider
    function initSlider() {
        slideWidth = testimonialSlides[0].offsetWidth;
        updateSlider();
        startAutoSlide();
    }
    
    // Update slider position
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonialSlides.length;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
        updateSlider();
    }
    
    // Start auto slide
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop auto slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Event listeners for slider controls
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            startAutoSlide();
        });
    });
    
    // Pause auto slide on hover
    testimonialTrack.addEventListener('mouseenter', stopAutoSlide);
    testimonialTrack.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize slider
    initSlider();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = testimonialSlides[0].offsetWidth;
        updateSlider();
    });
    
    // Scroll animations for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animations on load
    animateOnScroll();
});