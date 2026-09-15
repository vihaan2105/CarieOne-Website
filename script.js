// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Subscribe Form Handler
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(subscribeForm);
        const name = subscribeForm.querySelector('input[placeholder="Your Name"]').value;
        const email = subscribeForm.querySelector('input[placeholder="Your Email"]').value;
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!name.trim()) {
            showMessage('subscribeForm', 'Please enter your name', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showMessage('subscribeForm', 'Please enter a valid email', 'error');
            return;
        }
        
        // Simulate form submission
        console.log('Subscription:', { name, email });
        
        // Show success message
        showMessage('subscribeForm', '✓ Thank you! You have been added to our mailing list.', 'success');
        
        // Reset form
        subscribeForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            document.getElementById('formMessage').textContent = '';
        }, 5000);
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea[placeholder="Your Message"]').value;
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!name.trim()) {
            showContactMessage('Please enter your name', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showContactMessage('Please enter a valid email', 'error');
            return;
        }
        
        if (!subject.trim()) {
            showContactMessage('Please enter a subject', 'error');
            return;
        }
        
        if (!message.trim()) {
            showContactMessage('Please enter your message', 'error');
            return;
        }
        
        // Simulate form submission
        console.log('Contact:', { name, email, subject, message });
        
        // Show success message
        showContactMessage('✓ Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            document.querySelector('.contact-form .form-message')?.remove();
        }, 5000);
    });
}

// Helper function to show subscription message
function showMessage(formId, text, type) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = text;
    messageElement.className = `form-message ${type}`;
}

// Helper function to show contact message
function showContactMessage(text, type) {
    let messageElement = document.querySelector('.contact-form .form-message');
    
    if (!messageElement) {
        messageElement = document.createElement('p');
        messageElement.className = 'form-message';
        contactForm.appendChild(messageElement);
    }
    
    messageElement.textContent = text;
    messageElement.className = `form-message ${type}`;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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
document.querySelectorAll('.step, .feature-item, .feature-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add fade-in animation to sections on page load
window.addEventListener('load', () => {
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animation = `fadeIn 0.6s ease ${index * 0.1}s forwards`;
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);