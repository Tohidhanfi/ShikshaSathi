// Global variables to prevent flickering
let blogLoaded = false;

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
        
        // Also handle any remaining .html in URL after page load
        setTimeout(() => {
            if (window.location.pathname.includes('.html')) {
                const cleanPath = window.location.pathname.replace('.html', '');
                window.history.replaceState({}, document.title, cleanPath);
            }
        }, 100);
        
        // Load live blog posts
        loadBlogPosts();
    });
});

// Load live blog posts from RSS feeds and news APIs
function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid || blogLoaded) return; // Only load once
    
    blogLoaded = true; // Mark as loaded
    
    // Show loading state
    blogGrid.innerHTML = `
        <div class="blog-card loading">
            <div class="loading-placeholder">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
            </div>
        </div>
        <div class="blog-card loading">
            <div class="loading-placeholder">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
            </div>
        </div>
        <div class="blog-card loading">
            <div class="loading-placeholder">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
            </div>
        </div>
    `;
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        // Try to load live content first, fallback to curated
        loadLiveBlogContent();
        
        // Add refresh button functionality
        const refreshButton = document.querySelector('.blog-refresh');
        if (refreshButton) {
            // Remove any existing event listeners to prevent duplicates
            const newRefreshButton = refreshButton.cloneNode(true);
            refreshButton.parentNode.replaceChild(newRefreshButton, refreshButton);
            
            newRefreshButton.addEventListener('click', function() {
                console.log('Refresh button clicked - loading fresh external content');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
                this.disabled = true;
                
                // Reset blog loaded flag to allow fresh load
                blogLoaded = false;
                
                // Force immediate refresh with new external content
                setTimeout(() => {
                    loadLiveBlogContent();
                    this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh News';
                    this.disabled = false;
                }, 300);
            });
        }
    }, 1500);
}

// Load live blog content with better API - only education topics
function loadLiveBlogContent() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    // Education-specific RSS feeds
    const educationFeeds = [
        {
            url: 'https://api.allorigins.win/raw?url=https://www.edutopia.org/rss.xml',
            source: 'Edutopia',
            sourceUrl: 'https://www.edutopia.org'
        },
        {
            url: 'https://api.allorigins.win/raw?url=https://www.tes.com/rss',
            source: 'TES',
            sourceUrl: 'https://www.tes.com'
        },
        {
            url: 'https://api.allorigins.win/raw?url=https://feeds.feedburner.com/education-news',
            source: 'Education News',
            sourceUrl: 'https://feeds.feedburner.com'
        },
        {
            url: 'https://api.allorigins.win/raw?url=https://www.edweek.org/rss',
            source: 'Education Week',
            sourceUrl: 'https://www.edweek.org'
        },
        {
            url: 'https://api.allorigins.win/raw?url=https://www.chronicle.com/rss',
            source: 'Chronicle',
            sourceUrl: 'https://www.chronicle.com'
        }
    ];
    
    // Try each feed until we get content
    const tryFeeds = async () => {
        for (let i = 0; i < educationFeeds.length; i++) {
            try {
                const feed = educationFeeds[i];
                console.log(`Trying feed: ${feed.source}`);
                
                const response = await fetch(feed.url);
                const xmlText = await response.text();
                
                const parser = new DOMParser();
                const xml = parser.parseFromString(xmlText, 'text/xml');
                const items = xml.querySelectorAll('item');
                
                if (items.length > 0) {
                    // Filter for education-related content only
                    const educationPosts = Array.from(items)
                        .filter(item => {
                            const title = item.querySelector('title')?.textContent || '';
                            const description = item.querySelector('description')?.textContent || '';
                            const content = (title + ' ' + description).toLowerCase();
                            
                            // Only include education-related content
                            return content.includes('education') || 
                                   content.includes('teaching') || 
                                   content.includes('learning') || 
                                   content.includes('student') || 
                                   content.includes('teacher') || 
                                   content.includes('school') || 
                                   content.includes('classroom') ||
                                   content.includes('tutor') ||
                                   content.includes('training');
                        })
                        .slice(0, 3)
                        .map(item => {
                            const title = item.querySelector('title')?.textContent || 'Education News';
                            const description = item.querySelector('description')?.textContent || 'Latest education updates.';
                            const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
                            const link = item.querySelector('link')?.textContent || '';
                            
                            // Map to our specific categories
                            const category = mapToCategory(title, description);
                            
                            return {
                                title: title,
                                description: description,
                                date: new Date(pubDate),
                                category: category,
                                link: link,
                                source: feed.source,
                                sourceUrl: feed.sourceUrl
                            };
                        });
                    
                    if (educationPosts.length > 0) {
                        displayBlogPosts(educationPosts);
                        console.log(`Education content loaded from: ${feed.source}`);
                        return; // Success, exit
                    }
                }
            } catch (error) {
                console.log(`Feed ${educationFeeds[i].source} failed:`, error);
                continue; // Try next feed
            }
        }
        
        // If no education content found, show error message
        console.log('No education content found from external sources');
        displayNoContentMessage();
    };
    
    tryFeeds();
}

// Display message when no external content is available
function displayNoContentMessage() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = `
        <div class="blog-card" style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 3rem; color: #6b7280; margin-bottom: 20px;">
                <i class="fas fa-wifi-slash"></i>
            </div>
            <h3 style="color: #374151; margin-bottom: 10px;">Unable to Load News</h3>
            <p style="color: #6b7280; margin-bottom: 20px;">We're currently unable to fetch the latest education news from external sources.</p>
            <button onclick="loadLiveBlogContent()" style="background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">
                <i class="fas fa-sync-alt"></i> Try Again
            </button>
        </div>
    `;
}

// Map live content to our categories
function mapToCategory(title, description) {
    const text = (title + ' ' + description).toLowerCase();
    
    if (text.includes('community') || text.includes('impact') || text.includes('local')) return 'Community Impact';
    if (text.includes('teaching') || text.includes('classroom') || text.includes('lesson')) return 'Teaching Tips';
    if (text.includes('career') || text.includes('job') || text.includes('profession')) return 'Career Development';
    if (text.includes('digital') || text.includes('technology') || text.includes('online')) return 'Digital Education';
    if (text.includes('success') || text.includes('story') || text.includes('graduate')) return 'Success Stories';
    if (text.includes('parent') || text.includes('family') || text.includes('collaboration')) return 'Parent Engagement';
    if (text.includes('innovation') || text.includes('modern') || text.includes('new')) return 'Innovation';
    if (text.includes('future') || text.includes('trend') || text.includes('next')) return 'Future of Education';
    
    // Default categories based on content
    const categories = ['Community Impact', 'Teaching Tips', 'Career Development', 'Digital Education', 'Success Stories', 'Parent Engagement', 'Innovation', 'Future of Education'];
    return categories[Math.floor(Math.random() * categories.length)];
}

// Fetch live content with better error handling
async function fetchLiveContent() {
    try {
        // Try multiple sources with timeout
        const timeout = 5000; // 5 second timeout
        
        const promises = [
            fetchWithTimeout('https://api.allorigins.win/raw?url=https://feeds.feedburner.com/education-news', timeout),
            fetchWithTimeout('https://api.allorigins.win/raw?url=https://www.edutopia.org/rss.xml', timeout),
            fetchWithTimeout('https://api.allorigins.win/raw?url=https://www.tes.com/rss', timeout)
        ];
        
        const results = await Promise.allSettled(promises);
        const successfulResults = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
        
        if (successfulResults.length === 0) {
            return [];
        }
        
        // Parse successful results
        const allPosts = [];
        for (const text of successfulResults) {
            try {
                const parser = new DOMParser();
                const xml = parser.parseFromString(text, 'text/xml');
                const items = xml.querySelectorAll('item');
                
                const posts = Array.from(items).slice(0, 1).map(item => ({
                    title: item.querySelector('title')?.textContent || 'Education News',
                    description: item.querySelector('description')?.textContent || 'Latest education updates.',
                    pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
                    link: item.querySelector('link')?.textContent || ''
                }));
                
                allPosts.push(...posts);
            } catch (parseError) {
                console.log('Parse error:', parseError);
            }
        }
        
        return allPosts.slice(0, 3);
    } catch (error) {
        console.log('Fetch error:', error);
        return [];
    }
}

// Fetch with timeout
function fetchWithTimeout(url, timeout) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]).then(response => response.text());
}



// Display blog posts
function displayBlogPosts(posts) {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    if (posts.length === 0) {
        displayNoContentMessage();
        return;
    }
    
    blogGrid.innerHTML = posts.map(post => {
        // Truncate description to ~5 lines (approximately 200 characters)
        const fullDescription = post.description || post.content || 'Latest updates from the education sector.';
        const truncatedDescription = fullDescription.length > 200 ? 
            fullDescription.substring(0, 200) + '...' : 
            fullDescription;
        
        return `
            <div class="blog-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="background: ${getCategoryColor(post.category)}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">${post.category || 'Education News'}</span>
                    <span style="font-size: 0.8rem; color: #6b7280;">${formatDate(post.date || post.pubDate)}</span>
                </div>
                <h3>${post.title || 'Education News'}</h3>
                <p style="line-height: 1.6; margin-bottom: 15px;">${truncatedDescription}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.8rem; color: #6b7280;">
                        <i class="fas fa-globe"></i> Source: ${post.source || 'Education News'}
                    </div>
                    ${post.link ? `
                        <a href="${post.link}" target="_blank" rel="noopener noreferrer" style="background: #2563eb; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 0.9rem; font-weight: 500; display: inline-flex; align-items: center; gap: 6px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#1d4ed8'" onmouseout="this.style.backgroundColor='#2563eb'">
                            <i class="fas fa-external-link-alt"></i> Read More
                        </a>
                    ` : `
                        <span style="background: #6b7280; color: white; padding: 8px 16px; border-radius: 6px; font-size: 0.9rem; font-weight: 500; display: inline-flex; align-items: center; gap: 6px;">
                            <i class="fas fa-link-slash"></i> No Link
                        </span>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

// Manual refresh function for testing
function forceRefreshBlog() {
    console.log('Force refreshing blog content...');
    displayCuratedPosts();
}

// Display curated posts with dynamic content
function displayCuratedPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    console.log('displayCuratedPosts called - generating fresh content');
    
    const allPosts = [
        {
            title: "How Local Tutors are Changing Education in Maharashtra",
            description: "Discover the transformative impact of local tutors on education quality and accessibility across Maharashtra. Our community-driven approach is revolutionizing how students access quality education.",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            category: "Community Impact"
        },
        {
            title: "5 Ways to Make Home Tuition More Effective",
            description: "Learn proven strategies to maximize the effectiveness of home-based learning. From personalized lesson plans to interactive teaching methods, discover how to create engaging learning experiences.",
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            category: "Teaching Tips"
        },
        {
            title: "Building Careers through Teaching: A Lifelong Profession",
            description: "Explore how teaching can become a rewarding and sustainable career path with proper training and support. Join thousands of educators who have found their calling in the noble profession of teaching.",
            date: new Date(),
            category: "Career Development"
        },
        {
            title: "The Rise of Digital Learning in Rural Maharashtra",
            description: "How technology is bridging the educational gap in remote areas. Discover innovative approaches to bring quality education to every corner of Maharashtra through digital platforms and local partnerships.",
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            category: "Digital Education"
        },
        {
            title: "Success Stories: From Graduate to Professional Tutor",
            description: "Real stories from our training program graduates who have successfully transitioned into full-time teaching careers. Learn how our comprehensive training opens doors to new opportunities.",
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            category: "Success Stories"
        },
        {
            title: "Parent-Teacher Collaboration: The Key to Student Success",
            description: "Understanding the importance of strong communication between parents and tutors. Discover strategies for building effective partnerships that enhance student learning outcomes.",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            category: "Parent Engagement"
        },
        {
            title: "Innovative Teaching Methods for the Modern Classroom",
            description: "Explore cutting-edge teaching techniques that make learning more engaging and effective. From gamification to project-based learning, discover methods that work in today's educational landscape.",
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            category: "Innovation"
        },
        {
            title: "The Future of Education: Personalized Learning Paths",
            description: "How individualized learning approaches are transforming education. Learn about adaptive teaching methods that cater to each student's unique learning style and pace.",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            category: "Future of Education"
        }
    ];
    
    // Force fresh randomization with multiple random factors
    const timestamp = Date.now();
    const randomSeed = Math.random() * timestamp;
    
    const shuffledPosts = allPosts
        .map((post, index) => ({ 
            ...post, 
            originalIndex: index,
            randomValue: Math.random() * randomSeed + index
        }))
        .sort((a, b) => a.randomValue - b.randomValue)
        .slice(0, 3);
    
    console.log('Selected posts:', shuffledPosts.map(p => p.title));
    
    // Add some random variation to dates
    const postsWithVariation = shuffledPosts.map(post => ({
        ...post,
        date: new Date(post.date.getTime() + (Math.random() - 0.5) * 24 * 60 * 60 * 1000) // ±12 hours variation
    }));
    
    blogGrid.innerHTML = postsWithVariation.map(post => `
        <div class="blog-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="background: ${getCategoryColor(post.category)}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">${post.category}</span>
                <span style="font-size: 0.8rem; color: #6b7280;">${formatDate(post.date)}</span>
            </div>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 0.8rem; color: #6b7280;">
                    <i class="fas fa-star"></i> Source: ShikshaSathi Curated
                </div>
                <span style="background: #10b981; color: white; padding: 8px 16px; border-radius: 6px; font-size: 0.9rem; font-weight: 500; display: inline-flex; align-items: center; gap: 6px;">
                    <i class="fas fa-star"></i> Featured
                </span>
            </div>
        </div>
    `).join('');
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        "Community Impact": "#059669",
        "Teaching Tips": "#2563eb", 
        "Career Development": "#7c3aed",
        "Digital Education": "#dc2626",
        "Success Stories": "#ea580c",
        "Parent Engagement": "#0891b2",
        "Innovation": "#16a34a",
        "Future of Education": "#9333ea"
    };
    return colors[category] || "#2563eb";
}

// Format date for display
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    } catch (error) {
        return 'Recent';
    }
}

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