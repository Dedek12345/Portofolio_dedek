// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeContactForm();
    initializeDownloadCV();
    initializeSmoothScrolling();
    initializeNavbarScroll();
    initializeVisitorCounter();
    initializeImageFallbacks();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll reveal animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add staggered animation for skills and timeline items
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkills(entry.target);
                } else if (entry.target.classList.contains('timeline')) {
                    animateTimeline(entry.target);
                } else if (entry.target.classList.contains('about-stats')) {
                    animateStats(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Add reveal class to elements that should animate
    const elementsToReveal = [
        '.hero-content',
        '.section-header',
        '.about-content',
        '.about-stats',
        '.skills-grid',
        '.timeline',
        '.education-content',
        '.contact-content'
    ];

    elementsToReveal.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    });
}

// Animate skills with stagger effect
function animateSkills(skillsGrid) {
    const skillCategories = skillsGrid.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(30px)';
            category.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Animate timeline items
function animateTimeline(timeline) {
    const timelineItems = timeline.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 300);
    });
}

// Animate stats with counting effect
function animateStats(statsContainer) {
    const stats = statsContainer.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalNumber = stat.textContent;
        const number = parseInt(finalNumber.replace('+', ''));
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= number) {
                stat.textContent = finalNumber;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + (finalNumber.includes('+') ? '+' : '');
            }
        }, 16);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            // Create mailto link with form data
            const mailtoLink = `mailto:dedekrossi46@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message and reset form
            showNotification('Your message has been prepared in your email client. Please send it to complete the process.', 'success');
            contactForm.reset();
        }, 1000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                padding: 1rem;
                border-radius: 5px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-info {
                background: #112240;
                border-left: 4px solid #64FFDA;
                color: #8892B0;
            }
            
            .notification-success {
                background: #112240;
                border-left: 4px solid #00ff88;
                color: #8892B0;
            }
            
            .notification-error {
                background: #112240;
                border-left: 4px solid #ff6b6b;
                color: #8892B0;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .notification-message {
                flex: 1;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #FFD700;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Download CV functionality (direct link, no fetch to avoid file:// issues)
function initializeDownloadCV() {
    const downloadBtn = document.getElementById('download-cv');
    if (!downloadBtn) return;

    const cvPath = 'assets/Dedek_Rahmat_CV.pdf';
    // Set direct download attributes so the browser handles it natively
    downloadBtn.setAttribute('href', cvPath);
    downloadBtn.setAttribute('download', 'Dedek_Rahmat_CV.pdf');
    // Do not attach a click handler that prevents default; let the link work normally
}

// Typing animation for hero title
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const textToType = "Hi, I'm <span class=\"highlight\">Dedek Rahmat</span>";
    
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (i < textToType.length) {
            if (textToType.charAt(i) === '<') {
                // Handle HTML tags
                const tagEnd = textToType.indexOf('>', i);
                heroTitle.innerHTML += textToType.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                heroTitle.innerHTML += textToType.charAt(i);
                i++;
            }
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Parallax effect for hero section
function initializeParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize additional animations
function initializeAdditionalAnimations() {
    // Floating animation for profile picture
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = profilePicture.style.transform || 'translateY(0px)';
            const currentY = parseFloat(currentTransform.match(/translateY\(([-\d.]+)px\)/) || [0, 0])[1];
            const newY = currentY + (floatDirection * 2);
            
            if (Math.abs(newY) > 10) {
                floatDirection *= -1;
            }
            
            profilePicture.style.transform = `translateY(${newY}px)`;
        }, 100);
    }
}

// Mouse trail effect
function initializeMouseTrail() {
    const trail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > maxTrailLength) {
            trail.shift();
        }
        
        // Clean up old trail points
        trail.forEach((point, index) => {
            if (Date.now() - point.time > 1000) {
                trail.splice(index, 1);
            }
        });
    });
}

// Keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Navigation with arrow keys
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const sections = document.querySelectorAll('section[id]');
            const currentSection = getCurrentSection();
            const currentIndex = Array.from(sections).findIndex(section => section.id === currentSection);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % sections.length;
            } else {
                nextIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
            }
            
            const targetSection = sections[nextIndex];
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Toggle mobile menu with 'm' key
        if (e.key === 'm' || e.key === 'M') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (window.innerWidth <= 768) {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            }
        }
    });
}

// Get current section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = sections[0].id;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.id;
        }
    });
    
    return current;
}

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // This will run at most once every 16ms (60fps)
}, 16));

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeContactForm();
    initializeDownloadCV();
    initializeSmoothScrolling();
    initializeNavbarScroll();
    initializeVisitorCounter();
    initializeImageFallbacks();
    
    // Additional features
    initializeKeyboardNavigation();
    initializeAdditionalAnimations();
    initializeMouseTrail();
    
    // Optional: Initialize typing animation and parallax
    // initializeTypingAnimation();
    // initializeParallax();
});

// Handle page resize
window.addEventListener('resize', throttle(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}, 250));

// Page view counter using CountAPI (free, no auth)
// Setiap reload halaman akan menambah angka (page views).
let __visitorCounterInitialized = false;
function initializeVisitorCounter() {
    if (__visitorCounterInitialized) return; // idempotent
    __visitorCounterInitialized = true;

    const countEl = document.getElementById('visitor-count');
    if (!countEl) return;

    // Namespace the counter key with a stable identifier for this site
    // Use your domain if deployed (e.g., dedekrahmat.com). For local files, fall back to a custom key.
    const originKey = (location.hostname && location.hostname !== 'localhost') ? location.hostname : 'dedek-rahmat-portfolio-local';
    const pageKey = 'home';
    const counterNamespace = 'dedekrahmat_portfolio_visitors';
    // Fallback hosts: jika ISP/DNS memblokir host utama
    const countApiBases = [
        'https://api.countapi.xyz',
        'https://countapi.xyz'
    ];
    const counterKey = `${counterNamespace}:${originKey}:${pageKey}`;

    // Helper to set text with graceful fallback
    const setCountText = (val) => {
        countEl.textContent = typeof val === 'number' ? val.toLocaleString() : '—';
    };

    // If offline or file://, we can only show "—" or a locally cached number
    try {
        const cached = localStorage.getItem(`${counterKey}:cachedCount`);
        if (cached) setCountText(Number(cached));
    } catch (_) {
        // ignore
    }

    // Do nothing if running from file:// where fetch is often blocked; allow if http/https only
    if (!/^https?:$/i.test(location.protocol)) {
        setCountText('—');
        return;
    }

    // Helper fetch with timeout
    const fetchJSON = async (url, options = {}, timeoutMs = 5000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const res = await fetch(url, { ...options, signal: controller.signal, cache: 'no-store' });
            if (!res.ok) return null;
            const data = await res.json();
            return data;
        } catch (_) {
            return null;
        } finally {
            clearTimeout(id);
        }
    };

    // Ensure key exists on a given base
    const ensureKey = async (base) => {
        const keyPath = `${encodeURIComponent(counterNamespace)}/${encodeURIComponent(originKey)}_${encodeURIComponent(pageKey)}`;
        const got = await fetchJSON(`${base}/get/${keyPath}`);
        if (got && typeof got.value === 'number') return true;
        const created = await fetchJSON(`${base}/create?namespace=${encodeURIComponent(counterNamespace)}&key=${encodeURIComponent(originKey)}_${encodeURIComponent(pageKey)}&value=0`);
        return !!created;
    };

    const hit = async (base) => {
        const keyPath = `${encodeURIComponent(counterNamespace)}/${encodeURIComponent(originKey)}_${encodeURIComponent(pageKey)}`;
        const data = await fetchJSON(`${base}/hit/${keyPath}`);
        if (data && typeof data.value === 'number') return data.value;
        return null;
    };

    (async () => {
        for (const base of countApiBases) {
            const ok = await ensureKey(base);
            if (!ok) continue;
            const value = await hit(base);
            if (typeof value === 'number') {
                setCountText(value);
                try { localStorage.setItem(`${counterKey}:cachedCount`, String(value)); } catch (_) {}
                return;
            }
        }
        // If all bases fail, fallback to image badge counter (works via <img> increment)
        try {
            const labelEl = countEl.closest('.visitor-label');
            if (labelEl) {
                const badge = document.createElement('img');
                // Build a unique URL key for this page for the badge service
                const urlKey = encodeURIComponent(`${location.hostname}${location.pathname}` || 'portfolio');
                badge.src = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${urlKey}&count_bg=%2364FFDA&title_bg=%23112240&icon=&icon_color=%23E6F1FF&title=Visitors&edge_flat=false`;
                badge.alt = 'Visitors counter';
                badge.style.verticalAlign = 'middle';
                // Replace the numeric counter with badge
                countEl.replaceWith(badge);
            } else {
                setCountText('—');
            }
        } catch (_) {
            setCountText('—');
        }
    })();
}

// Fallback untuk gambar yang gagal (404), ganti dengan placeholder agar UI tidak rusak
function initializeImageFallbacks() {
    const placeholder = 'https://placehold.co/600x400?text=Image+not+found';
    const imgs = [
        document.querySelector('.about-picture img'),
        document.querySelector('.profile-picture img')
    ].filter(Boolean);
    imgs.forEach(img => {
        // Hindari loop jika placeholder juga gagal
        img.addEventListener('error', function onErr() {
            if (img.dataset.fallbackApplied === '1') return;
            img.dataset.fallbackApplied = '1';
            img.src = placeholder;
        });
    });
}
