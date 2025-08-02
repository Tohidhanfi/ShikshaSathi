// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
const modals = {
    registration: document.getElementById('registrationModal'),
    partner: document.getElementById('partnerModal'),
    collaboration: document.getElementById('collaborationModal')
};

const closeButtons = document.querySelectorAll('.close');

// Open modal functions
function openRegistrationModal() {
    modals.registration.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openPartnerModal() {
    modals.partner.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openCollaborationModal() {
    modals.collaboration.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal functions
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking on close button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    Object.values(modals).forEach(modal => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        Object.values(modals).forEach(modal => {
            if (modal.style.display === 'block') {
                closeModal(modal);
            }
        });
    }
});

// Scroll to contact function
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Form submissions
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    this.reset();
});

document.getElementById('tutorRegistrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Thank you for registering! We will contact you soon with next steps.', 'success');
    
    // Close modal and reset form
    closeModal(modals.registration);
    this.reset();
});

document.getElementById('partnerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Thank you for your partnership request! We will contact you soon.', 'success');
    
    // Close modal and reset form
    closeModal(modals.partner);
    this.reset();
});

document.getElementById('collaborationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Thank you for your collaboration proposal! We will review and contact you soon.', 'success');
    
    // Close modal and reset form
    closeModal(modals.collaboration);
    this.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-card, .phase-card, .impact-card, .join-card, .blog-card, .gallery-item, .vision-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for impact numbers
function animateCounters() {
    const counters = document.querySelectorAll('.impact-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when impact section is visible
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const impactSection = document.querySelector('.impact');
if (impactSection) {
    impactObserver.observe(impactSection);
}

// Add loading animation for images (placeholder for future use)
function preloadImages() {
    // This function can be used to preload images when they are added
    console.log('Image preloading ready');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Add active class to current navigation item
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Remove .html from URL if present for clean URLs
        if (window.location.pathname.endsWith('.html')) {
            const cleanPath = window.location.pathname.replace('.html', '');
            window.history.replaceState({}, document.title, cleanPath);
        }
    });
});

// Add CSS for active navigation state
const navStyles = document.createElement('style');
navStyles.textContent = `
    .nav-menu a.active {
        color: #2563eb !important;
        font-weight: 600;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-top: 1px solid #e5e7eb;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex !important;
        }
    }
`;
document.head.appendChild(navStyles);

// Toggle functions for "Others" options in registration form
function toggleQualificationOther() {
    const qualificationSelect = document.getElementById('qualification');
    const qualificationOtherGroup = document.getElementById('qualificationOtherGroup');
    const qualificationOtherInput = document.getElementById('qualificationOther');
    
    if (qualificationSelect.value === 'other') {
        qualificationOtherGroup.style.display = 'block';
        qualificationOtherInput.required = true;
    } else {
        qualificationOtherGroup.style.display = 'none';
        qualificationOtherInput.required = false;
        qualificationOtherInput.value = '';
    }
}

function toggleSubjectsOther() {
    const subjectsOtherCheckbox = document.getElementById('subjectsOther');
    const subjectsOtherGroup = document.getElementById('subjectsOtherGroup');
    const subjectsOtherTextInput = document.getElementById('subjectsOtherText');
    
    if (subjectsOtherCheckbox.checked) {
        subjectsOtherGroup.style.display = 'block';
        subjectsOtherTextInput.required = true;
    } else {
        subjectsOtherGroup.style.display = 'none';
        subjectsOtherTextInput.required = false;
        subjectsOtherTextInput.value = '';
    }
}

function togglePartnerSubjectsOther() {
    const partnerSubjectsOtherCheckbox = document.getElementById('partnerSubjectsOther');
    const partnerSubjectsOtherGroup = document.getElementById('partnerSubjectsOtherGroup');
    const partnerSubjectsOtherTextInput = document.getElementById('partnerSubjectsOtherText');
    
    if (partnerSubjectsOtherCheckbox.checked) {
        partnerSubjectsOtherGroup.style.display = 'block';
        partnerSubjectsOtherTextInput.required = true;
    } else {
        partnerSubjectsOtherGroup.style.display = 'none';
        partnerSubjectsOtherTextInput.required = false;
        partnerSubjectsOtherTextInput.value = '';
    }
}

// Phone number validation
function validatePhoneNumber(input) {
    // Remove any non-numeric characters
    input.value = input.value.replace(/[^0-9]/g, '');
    
    // Limit to 10 digits
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

// Add form validation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add phone validation to all phone inputs
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            validatePhoneNumber(this);
        });
    });
    
    // Add validation for checkbox groups to ensure at least one is selected
    const checkboxGroups = document.querySelectorAll('.checkbox-group');
    checkboxGroups.forEach(group => {
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        const form = group.closest('form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                let hasChecked = false;
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        hasChecked = true;
                    }
                });
                
                if (!hasChecked) {
                    e.preventDefault();
                    alert('Please select at least one option.');
                    return false;
                }
            });
        }
    });
    
    // Track website analytics
    trackWebsiteAnalytics();
});

// Website analytics tracking
function trackWebsiteAnalytics() {
    // Get existing analytics data
    let analytics = JSON.parse(localStorage.getItem('shikshaSathiAnalytics')) || {
        totalVisitors: 0,
        pageViews: 0,
        todayVisitors: 0,
        avgTimeOnSite: 0,
        visitHistory: [],
        today: new Date().toDateString(),
        sessionStartTime: Date.now()
    };
    
    // Check if this is a new day
    if (analytics.today !== new Date().toDateString()) {
        analytics.todayVisitors = 0;
        analytics.today = new Date().toDateString();
    }
    
    // Check if this is a new visitor (no session in last 30 minutes)
    const lastVisit = localStorage.getItem('shikshaSathiLastVisit');
    const now = Date.now();
    const isNewVisitor = !lastVisit || (now - parseInt(lastVisit)) > 30 * 60 * 1000; // 30 minutes
    
    if (isNewVisitor) {
        analytics.totalVisitors++;
        analytics.todayVisitors++;
        localStorage.setItem('shikshaSathiLastVisit', now.toString());
        
        // Add to visit history
        analytics.visitHistory.push({
            timestamp: new Date().toLocaleString(),
            page: window.location.pathname || 'index.html',
            userAgent: navigator.userAgent.substring(0, 100) // Truncated for privacy
        });
        
        // Keep only last 100 visits
        if (analytics.visitHistory.length > 100) {
            analytics.visitHistory = analytics.visitHistory.slice(-100);
        }
    }
    
    // Increment page views
    analytics.pageViews++;
    
    // Calculate average time on site
    if (analytics.sessionStartTime) {
        const sessionTime = (now - analytics.sessionStartTime) / 1000 / 60; // in minutes
        analytics.avgTimeOnSite = (analytics.avgTimeOnSite + sessionTime) / 2;
    }
    
    // Save analytics data
    localStorage.setItem('shikshaSathiAnalytics', JSON.stringify(analytics));
    
    // Track time on page when user leaves
    window.addEventListener('beforeunload', function() {
        const endTime = Date.now();
        const timeOnPage = (endTime - now) / 1000 / 60; // in minutes
        
        let updatedAnalytics = JSON.parse(localStorage.getItem('shikshaSathiAnalytics')) || analytics;
        updatedAnalytics.avgTimeOnSite = (updatedAnalytics.avgTimeOnSite + timeOnPage) / 2;
        localStorage.setItem('shikshaSathiAnalytics', JSON.stringify(updatedAnalytics));
    });
} 