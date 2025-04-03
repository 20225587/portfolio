// DOM Elements
const themeToggle = document.getElementById('theme-toggle-checkbox');
const body = document.body;
const typedElement = document.getElementById('typed-text');
const aboutTextContainer = document.getElementById('about-text-container');
const skillsContainer = document.getElementById('skills-container');
const projectsContainer = document.getElementById('projects-container');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content-container');
const closeModal = document.querySelector('.close-modal');
const accordionItems = document.querySelectorAll('.accordion-item');

// Initialize ScrollReveal
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    delay: 200,
    easing: 'ease-in-out'
});

// Initialize Typed.js
let typed;

// Load data from JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

// Initialize the website
async function initWebsite() {
    // Load data
    const data = await loadData();
    if (!data) return;

    // Initialize theme from localStorage
    initTheme();
    
    // Initialize typed.js
    initTypedJs();
    
    // Load about section
    loadAboutSection(data.about);
    
    // Load skills section
    loadSkillsSection(data.skills);
    
    // Load projects section
    loadProjectsSection(data.projects);
    
    // Initialize ScrollReveal animations
    initScrollReveal();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize accordion
    initAccordion();
    
    // Initialize event listeners
    initEventListeners(data);
}

// Initialize theme
function initTheme() {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
}

// Initialize Typed.js
function initTypedJs() {
    typed = new Typed('#typed-text', {
        strings: [
            'Backend Developer',
            'Blockchain Enthusiast',
            'Problem Solver',
            'Creative Thinker',
            'Dapps Developer'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 500,
        loop: true
    });
}

// Load About Section
function loadAboutSection(aboutData) {
    if (!aboutData) return;
    
    const aboutHTML = `
        <p>${aboutData.intro}</p>
        <p>${aboutData.description}</p>
        <p>${aboutData.passion}</p>
        <p>${aboutData.philosophy}</p>
    `;
    
    aboutTextContainer.innerHTML = aboutHTML;
}

// Load Skills Section
function loadSkillsSection(skills) {
    if (!skills || !skills.length) return;
    
    let skillsHTML = '';
    
    skills.forEach(skill => {
        skillsHTML += `
            <div class="skill-item">
                <div class="skill-icon">
                    <i class="fab ${skill.icon}"></i>
                </div>
                <h3 class="skill-name">${skill.name}</h3>
                <div class="progress-container">
                    <div class="progress-bar" data-level="${skill.level}"></div>
                </div>
                <p class="skill-level">${skill.level}%</p>
            </div>
        `;
    });
    
    skillsContainer.innerHTML = skillsHTML;
    
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
        });
    };
    
    // Use Intersection Observer to trigger animation when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateProgressBars, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(skillsContainer);
}

// Load Projects Section
function loadProjectsSection(projects) {
    if (!projects || !projects.length) return;
    
    let projectsHTML = '';
    
    projects.forEach((project, index) => {
        projectsHTML += `
            <div class="project-card" data-project-id="${index}">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <a href="#" class="project-link">View Details</a>
                </div>
            </div>
        `;
    });
    
    projectsContainer.innerHTML = projectsHTML;
}

// Initialize ScrollReveal animations
function initScrollReveal() {
    // Reveal elements with ScrollReveal
    sr.reveal('.about-content', { origin: 'left' });
    sr.reveal('.timeline-item', { interval: 200 });
    sr.reveal('.skill-item', { interval: 100 });
    sr.reveal('.interest-card', { interval: 100 });
    sr.reveal('.project-card', { interval: 200 });
    sr.reveal('.contact-info', { origin: 'left' });
    sr.reveal('.contact-form', { origin: 'right' });
    sr.reveal('.collaboration-text', { origin: 'left' });
    sr.reveal('.collaboration-badges', { origin: 'right' });
    sr.reveal('.badge', { interval: 100 });
}

// Initialize form validation
function initFormValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    
    // Validate name
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
        } else {
            nameError.style.display = 'none';
        }
    });
    
    // Validate email
    emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });
    
    // Validate subject
    subjectInput.addEventListener('blur', () => {
        if (subjectInput.value.trim() === '') {
            subjectError.textContent = 'Subject is required';
            subjectError.style.display = 'block';
        } else {
            subjectError.style.display = 'none';
        }
    });
    
    // Validate message
    messageInput.addEventListener('blur', () => {
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
            messageError.style.display = 'block';
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageError.style.display = 'block';
        } else {
            messageError.style.display = 'none';
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        // Check if all fields are valid
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            isValid = false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            isValid = false;
        }
        
        if (subjectInput.value.trim() === '') {
            subjectError.textContent = 'Subject is required';
            subjectError.style.display = 'block';
            isValid = false;
        }
        
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
            messageError.style.display = 'block';
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageError.style.display = 'block';
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
        } else {
            // Form action with the user's email
            const formAction = contactForm.getAttribute('action');
            if (formAction.includes('jtimzatim@example.com')) {
                
                contactForm.setAttribute('action', formAction.replace('jtimzatim@example.com', 'user@example.com'));
            }
            
            
            // e.preventDefault();
            
            formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
}

// Initialize accordion
function initAccordion() {
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current accordion item
            item.classList.toggle('active');
        });
    });
}

// Initialize event listeners
function initEventListeners(data) {
    // Theme toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Project modal
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            const project = data.projects[projectId];
            
            // Populate modal content
            modalContent.innerHTML = `
                <h2 class="modal-project-title">${project.title}</h2>
                <img src="${project.image}" alt="${project.title}" class="modal-project-image">
                <div class="modal-project-description">
                    <p>${project.fullDescription}</p>
                    <div class="technologies">
                        <h3>Technologies Used:</h3>
                        <ul>
                            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <a href="${project.link}" target="_blank" class="btn primary-btn modal-project-link">View Live Project</a>
            `;
            
            // Show modal
            modal.style.display = 'block';
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', initWebsite);
