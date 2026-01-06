// Loading Screen Animation
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Cursor Follower
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;
    
    cursorX += diffX * 0.1;
    cursorY += diffY * 0.1;
    
    cursorFollower.style.left = cursorX + 'px';
    cursorFollower.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}

// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Coffee Enthusiast',
    'Code Architect'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation after page load
setTimeout(typeWriter, 3000);

// Smooth Scrolling for Navigation Links
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

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeTypingEffect();
    initializeCounters();
    initializeParallax();
    initializeSkillsAnimation();
    initializeProjectsFilter();
    initializeContactForm();
    initializeSocialLinks();
    initializeContactCards();
    initializeEnhancedForm();
    initializeEnhancedProjects();
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
    
    // Observe skill bars
    document.querySelectorAll('.skill-progress').forEach(el => {
        observer.observe(el);
    });
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                card.style.display = 'block';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Floating Elements Animation
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach((element, index) => {
    const speed = element.getAttribute('data-speed') || 1;
    
    function animate() {
        const time = Date.now() * 0.001 * speed;
        const x = Math.sin(time) * 30;
        const y = Math.cos(time * 0.7) * 20;
        
        element.style.transform = translate(${x}px, ${y}px) rotate(${time * 10}deg);
        requestAnimationFrame(animate);
    }
    
    // Start animation with delay
    setTimeout(animate, index * 200);
});

// Interactive Name Letters
document.querySelectorAll('.name-letter').forEach((letter, index) => {
    letter.addEventListener('mouseenter', () => {
        letter.style.transform = 'translateY(-10px) rotate(5deg)';
        letter.style.color = '#888';
    });
    
    letter.addEventListener('mouseleave', () => {
        letter.style.transform = 'translateY(0) rotate(0deg)';
        letter.style.color = '';
    });
    
    // Add stagger animation on page load
    setTimeout(() => {
        letter.style.animation = 'fadeInUp 0.6s ease forwards';
    }, index * 100);
});

// Profile Card Interactions
const profileCard = document.querySelector('.github-profile-card');
const followBtn = document.querySelector('.follow-btn');
const messageBtn = document.querySelector('.message-btn');

followBtn.addEventListener('click', () => {
    const isFollowing = followBtn.textContent.includes('Following');
    
    if (isFollowing) {
        followBtn.innerHTML = '<i class="fas fa-user-plus"></i> Follow';
        followBtn.classList.remove('following');
    } else {
        followBtn.innerHTML = '<i class="fas fa-user-check"></i> Following';
        followBtn.classList.add('following');
    }
});

messageBtn.addEventListener('click', () => {
    // Simulate opening a message modal or redirect
    alert('Message feature coming soon! 📧');
});

// Tech Stack Hover Effects
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const techName = item.getAttribute('data-tech');
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = techName;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.8rem;
            pointer-events: none;
            z-index: 1000;
            transform: translateX(-50%);
            white-space: nowrap;
        `;
        
        item.appendChild(tooltip);
        
        // Position tooltip
        const rect = item.getBoundingClientRect();
        tooltip.style.left = '50%';
        tooltip.style.top = '-40px';
    });
    
    item.addEventListener('mouseleave', () => {
        const tooltip = item.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Contact Form Enhancement
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#00ff00';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 2000);
    });
}

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ffffff, #888888);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = body.classList.contains('light-theme') 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = body.classList.contains('light-theme') 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(10, 10, 10, 0.95)';
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes loading {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    .following {
        background: #00ff00 !important;
        color: #000 !important;
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
        .skills-container {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
        }
        
        .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
        }
        
        .about-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
        }
        
        .tech-stack {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1rem !important;
        }
        
        .skills-visual {
            position: static !important;
        }
    }
    
    @media (max-width: 480px) {
        .about-stats {
            grid-template-columns: 1fr !important;
        }
        
        .tech-stack {
            grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .skill-category {
            padding: 1.5rem !important;
        }
        
        .tech-item {
            padding: 1rem !important;
        }
        
        .tech-item i {
            font-size: 2rem !important;
        }
    }
`;
document.head.appendChild(style);

// Interactive Contact Cards
function initializeContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const contactType = this.getAttribute('data-contact');
            const cardContent = this.querySelector('.card-content p').textContent;
            
            switch(contactType) {
                case 'email':
                    // Copy email to clipboard
                    navigator.clipboard.writeText(cardContent).then(() => {
                        showNotification('Email copied to clipboard!', 'success');
                    }).catch(() => {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = cardContent;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        showNotification('Email copied to clipboard!', 'success');
                    });
                    break;
                    
                case 'phone':
                    // Try to initiate phone call
                    window.location.href = tel:${cardContent};
                    break;
                    
                case 'location':
                    // Open location in maps
                    const encodedLocation = encodeURIComponent(cardContent);
                    window.open(https://www.google.com/maps/search/?api=1&query=${encodedLocation}, '_blank');
                    break;
            }
        });
    });
}

// Enhanced Form Functionality
function initializeEnhancedForm() {
    const form = document.querySelector('.contact-form');
    const messageTextarea = document.getElementById('message');
    const charCount = document.querySelector('.char-count');
    const submitBtn = document.querySelector('.submit-btn');
    const formSuccess = document.querySelector('.form-success');
    
    // Character counter for message textarea
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 500;
            
            charCount.textContent = currentLength;
            
            // Change color based on character count
            if (currentLength > maxLength * 0.8) {
                charCount.style.color = '#ff6b6b';
            } else if (currentLength > maxLength * 0.6) {
                charCount.style.color = '#feca57';
            } else {
                charCount.style.color = '#ffffff';
            }
            
            // Prevent typing beyond limit
            if (currentLength >= maxLength) {
                this.value = this.value.substring(0, maxLength);
                charCount.textContent = maxLength;
            }
        });
    }
    
    // Enhanced form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                formSuccess.classList.add('show');
                form.reset();
                
                // Reset character counter
                if (charCount) {
                    charCount.textContent = '0';
                    charCount.style.color = '#ffffff';
                }
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
                
                showNotification('Message sent successfully!', 'success');
            }, 2000);
        });
    }
    
    // Floating label animation for select
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = notification notification-${type};
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 1rem;
            backdrop-filter: blur(20px);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-success {
            border-color: rgba(0, 255, 0, 0.3);
            background: rgba(0, 255, 0, 0.1);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
            color: #ffffff;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            padding: 0.2rem;
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        
        .notification-close:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
        }
        
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
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced Projects Functionality
function initializeEnhancedProjects() {
    // View toggle functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            if (view === 'list') {
                projectsGrid.classList.add('list-view');
            } else {
                projectsGrid.classList.remove('list-view');
            }
        });
    });
    
    // Enhanced filter functionality with stats update
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const activeFilterCount = document.getElementById('active-filter');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (activeFilterCount) {
                activeFilterCount.textContent = visibleCount;
            }
        });
    });
    
    // Like functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('.like-count');
            let count = parseInt(countSpan.textContent);
            
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                icon.classList.remove('fas');
                icon.classList.add('far');
                count--;
            } else {
                this.classList.add('liked');
                icon.classList.remove('far');
                icon.classList.add('fas');
                count++;
                
                // Add heart animation
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
            
            countSpan.textContent = count;
        });
    });
    
    // Preview functionality
    const previewButtons = document.querySelectorAll('.preview-btn');
    previewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-project');
            showProjectPreview(projectId);
        });
    });
    
    // Info modal functionality
    const infoButtons = document.querySelectorAll('.info-btn');
    infoButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-project');
            showProjectInfo(projectId);
        });
    });
    
    // Live demo and source code buttons
    const liveDemoButtons = document.querySelectorAll('.live-demo-btn');
    const sourceCodeButtons = document.querySelectorAll('.source-code-btn');
    
    liveDemoButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification('Live demo opening in new tab!', 'success');
            // In a real scenario, this would open the actual project URL
            window.open('#', '_blank');
        });
    });
    
    sourceCodeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification('Source code opening on GitHub!', 'success');
            // In a real scenario, this would open the GitHub repository
            window.open('#', '_blank');
        });
    });
}

// Project preview modal
function showProjectPreview(projectId) {
    const projectData = {
        taskflow: {
            title: 'TaskFlow - Project Management',
            image: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=TaskFlow+Dashboard',
            description: 'Interactive project management dashboard with real-time collaboration features, task tracking, and team analytics.',
            features: ['Real-time collaboration', 'Task tracking', 'Team analytics', 'File sharing', 'Time tracking', 'Gantt charts']
        },
        shopsphere: {
            title: 'ShopSphere - Online Store',
            image: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=ShopSphere+Store',
            description: 'Modern e-commerce platform with advanced filtering, payment integration, and inventory management.',
            features: ['Product catalog', 'Shopping cart', 'Payment gateway', 'Order tracking', 'Inventory management', 'Customer reviews']
        },
        fittracker: {
            title: 'FitTracker - Health & Fitness',
            image: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=FitTracker+App',
            description: 'AI-powered fitness tracking app with personalized workout recommendations and social features.',
            features: ['AI recommendations', 'Progress tracking', 'Social features', 'Workout plans', 'Nutrition tracking', 'Achievement system']
        }
    };
    
    const project = projectData[projectId];
    if (!project) return;
    
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${project.title}</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="preview-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="preview-info">
                    <p>${project.description}</p>
                    <div class="preview-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${project.features.map(feature => <li><i class="fas fa-check"></i> ${feature}</li>).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    [closeBtn, overlay].forEach(element => {
        element.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
    });
    
    // Animate modal
    setTimeout(() => modal.classList.add('show'), 10);
}

// Project info modal
function showProjectInfo(projectId) {
    const projectDetails = {
        taskflow: {
            title: 'TaskFlow - Project Management',
            client: 'TechCorp Solutions',
            duration: '3 months',
            team: '4 developers',
            technologies: 'React, Node.js, MongoDB, Socket.io',
            challenges: 'Real-time synchronization, scalable architecture',
            outcome: 'Increased team productivity by 40%'
        },
        shopsphere: {
            title: 'ShopSphere - Online Store',
            client: 'RetailMax Inc.',
            duration: '4 months',
            team: '5 developers',
            technologies: 'Vue.js, Laravel, MySQL, Stripe API',
            challenges: 'Payment security, inventory management',
            outcome: 'Boosted online sales by 60%'
        },
        fittracker: {
            title: 'FitTracker - Health & Fitness',
            client: 'HealthTech Startup',
            duration: '6 months',
            team: '3 developers',
            technologies: 'React Native, Python, TensorFlow, Firebase',
            challenges: 'AI integration, data privacy',
            outcome: '10K+ active users in beta'
        }
    };
    
    const project = projectDetails[projectId];
    if (!project) return;
    
    const modal = document.createElement('div');
    modal.className = 'project-modal info-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Project Details</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="project-details">
                    <h4>${project.title}</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-building"></i> Client:</span>
                            <span class="detail-value">${project.client}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-clock"></i> Duration:</span>
                            <span class="detail-value">${project.duration}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-users"></i> Team Size:</span>
                            <span class="detail-value">${project.team}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-code"></i> Technologies:</span>
                            <span class="detail-value">${project.technologies}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-exclamation-triangle"></i> Key Challenges:</span>
                            <span class="detail-value">${project.challenges}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-trophy"></i> Outcome:</span>
                            <span class="detail-value">${project.outcome}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    [closeBtn, overlay].forEach(element => {
        element.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
    });
    
    setTimeout(() => modal.classList.add('show'), 10);
}
