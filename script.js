// Download PDF functionality
document.getElementById('downloadBtn').addEventListener('click', function() {
    window.print();
});

// Smooth scroll reveal for elements
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate stats counter
            if (entry.target.classList.contains('stat-box')) {
                animateCounter(entry.target);
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-card')) {
                animateSkillBars(entry.target);
            }
        }
    });
}, observerOptions);

// Observe stat boxes
document.querySelectorAll('.stat-box').forEach(box => {
    observer.observe(box);
});

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Counter animation for stats
function animateCounter(element) {
    const targetCount = parseInt(element.getAttribute('data-count'));
    const numberElement = element.querySelector('.stat-number');
    const duration = 2000; // 2 seconds
    const increment = targetCount / (duration / 16); // 60fps
    let currentCount = 0;
    
    const counter = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(counter);
        }
        
        // Format the number
        if (targetCount === 100) {
            numberElement.textContent = Math.floor(currentCount) + '%';
        } else {
            numberElement.textContent = Math.floor(currentCount) + '+';
        }
    }, 16);
}

// Skill bars animation
function animateSkillBars(skillCard) {
    const skillBars = skillCard.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 100); // Stagger the animation
    });
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to artistic elements
document.addEventListener('mousemove', function(e) {
    const elements = document.querySelectorAll('.art-element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    elements.forEach((element, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX * speed) - (speed / 2);
        const y = (mouseY * speed) - (speed / 2);
        
        element.style.transform = `translate(${x}px, ${y}px) rotate(${element.classList.contains('pencil-1') ? '45deg' : element.classList.contains('pencil-2') ? '-30deg' : element.classList.contains('brush') ? '-45deg' : '0deg'})`;
    });
});

// Add click animation to tags
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'Bonjour';
    } else if (hour < 18) {
        greeting = 'Bon après-midi';
    } else {
        greeting = 'Bonsoir';
    }
    
    // You can use this greeting somewhere in the page if needed
    console.log(greeting + ' ! Bienvenue sur mon portfolio.');
}

updateGreeting();

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'P' to print/download
    if (e.key === 'p' || e.key === 'P') {
        if (e.ctrlKey || e.metaKey) {
            return; // Let browser handle Ctrl+P
        }
        e.preventDefault();
        document.getElementById('downloadBtn').click();
    }
});

// Console Easter Egg
console.log('%c👋 Salut ! Je vois que tu es curieux...', 'font-size: 20px; color: #ff8c00; font-weight: bold;');
console.log('%c🎨 Tu cherches un designer UI/UX passionné ?', 'font-size: 16px; color: #ff6600;');
console.log('%c📧 Contacte-moi : francismpangirwa13@gmail.com', 'font-size: 14px; color: #333;');
console.log('%c💼 LinkedIn: linkedin.com/in/francois-mpangirwa', 'font-size: 14px; color: #333;');

// Performance optimization: Lazy load images if needed
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff8c00, #ff6600);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});