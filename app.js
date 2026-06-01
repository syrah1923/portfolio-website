/**
 * Syrah Cansica Portfolio - Core JS Module
 * Highly interactive, accessible, and structured vanilla JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initSPASections();
    initSkillsGlow();
    initProjectModals();
    initContactForm();
});

/* ==========================================================================
   1. THEME SWITCHING (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        const defaultTheme = systemPrefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', defaultTheme);
        localStorage.setItem('theme', defaultTheme);
    }
    
    // Toggle Click Event
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Dynamic fade transition on body
        document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Show interactive feedback toast
        showToast(`Theme switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
    const trigger = document.getElementById('mobile-menu-trigger');
    const menu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', !isExpanded);
        trigger.classList.toggle('active');
        menu.classList.toggle('active');
    };
    
    trigger.addEventListener('click', toggleMenu);
    
    // Close drawer when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside of the drawer
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && 
            !menu.contains(e.target) && 
            !trigger.contains(e.target)) {
            toggleMenu();
        }
    });
}

/* ==========================================================================
   3. IN-PLACE SPA PAGE SECTION SWITCHER (NO WINDOW SCROLLING)
   ========================================================================== */
function initSPASections() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const heroCTA = document.querySelector('.hero-actions .btn-primary');
    const navLogo = document.getElementById('nav-logo');
    
    const switchSection = (targetId) => {
        // Toggle active states on sections
        sections.forEach(sec => {
            if (sec.getAttribute('id') === targetId) {
                sec.classList.add('active-section');
                // trigger entrance transition
                setTimeout(() => {
                    sec.classList.add('revealed');
                }, 50);
            } else {
                sec.classList.remove('active-section');
                sec.classList.remove('revealed');
            }
        });
        
        // Highlight active navbar link
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
        
        // Update URL state history
        window.history.pushState(null, null, `#${targetId}`);
    };
    
    // Setup navbar click events
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    });
    
    // Setup brand logo trigger
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('home');
        });
    }
    
    // Setup Hero primary CTA button
    if (heroCTA) {
        heroCTA.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = heroCTA.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    }
    
    // Initialize section based on URL hash or default to home
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        switchSection(initialHash);
    } else {
        switchSection('home');
    }
    
    // Listen to browser Back/Forward navigation triggers
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            switchSection(hash);
        } else {
            switchSection('home');
        }
    });
}

/* ==========================================================================
   5. INTERACTIVE SKILLS GRADIENT GLOWS
   ========================================================================== */
function initSkillsGlow() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate inside the card
            const y = e.clientY - rect.top;  // y coordinate inside the card
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
            
            // Set glowing tech brand color
            const color = card.getAttribute('data-color');
            card.style.setProperty('--active-border', color);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--x');
            card.style.removeProperty('--y');
            card.style.removeProperty('--active-border');
        });
    });
}

/* ==========================================================================
   6. DYNAMIC CASE STUDY MODAL SYSTEM
   ========================================================================== */
const projectData = {
    agetech: {
        title: "AgeTech: Bridging the Digital Divide for Seniors",
        tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "UI/UX Accessibility"],
        client: "Capstone / Thesis Project",
        duration: "4 Months",
        role: "Lead Front-End & System Designer",
        illustrationClass: "agetech-theme",
        illustrationHTML: `
            <div class="mockup-header-ring" style="margin-bottom: 15px;">
                <div class="dot-red"></div>
                <div class="dot-yellow"></div>
                <div class="dot-green"></div>
            </div>
            <div class="visual-interactive-screen" style="height: 100px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); border-radius: 8px;">
                <div class="screen-tutorial-box" style="text-align: center;">
                    <div class="tutorial-logo" style="font-weight: 700; color: var(--secondary-color); font-size: 1.1rem;">AgeTech</div>
                    <div class="tutorial-text-large" style="font-size: 0.8rem; opacity: 0.8; margin-top: 4px;">Lesson 1: Email Basics</div>
                </div>
            </div>
        `,
        overview: "AgeTech is an innovative web-based tutorial application created as a capstone thesis project to tackle digital isolation among elderly populations. By tailoring learning modules, high-contrast layouts, and scalable text properties directly to senior accessibility requirements, it creates a welcoming learning environment where senior citizens can master essential online tools.",
        solutions: [
            "Co-authored highly structured, screen-reader friendly learning modules teaching core web actions (messaging, web searches, profile logs).",
            "Designed and implemented specific high-contrast color toggles, variable text-scale handlers, and simplified navigation pathways tailored for senior users.",
            "Programmed a secure PHP administrative back-end allowing instructors to manage users, add learning materials, and track learning logs.",
            "Formulated relational MySQL tables linking user profiles with completed tutorial timestamps and user progress indicators.",
            "Conducted exhaustive direct testing sessions with elder citizen volunteers, analyzing visual feedback to iteratively fine-tune interface dimensions.",
            "Successfully co-defended the capstone project before academic panel members."
        ]
    },
    ireply: {
        title: "iReply: Inventory Management System",
        tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Team Collaboration"],
        client: "Team Web Application Project",
        duration: "3 Months",
        role: "Full-Stack Developer & UI Implementer",
        illustrationClass: "ireply-theme",
        illustrationHTML: `
            <div class="mockup-header-ring" style="margin-bottom: 15px;">
                <div class="dot-red"></div>
                <div class="dot-yellow"></div>
                <div class="dot-green"></div>
            </div>
            <div class="visual-interactive-screen" style="height: 100px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); border-radius: 8px; padding: 10px;">
                <div class="screen-inventory-box" style="width: 100%; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div class="inventory-status" style="font-size: 0.75rem; color: #ffbd2e; display: flex; align-items: center; gap: 4px;">
                        <span style="width:6px; height:6px; background:#ffbd2e; border-radius:50%; display:inline-block;"></span>
                        <span>Low Stock Alerts (3)</span>
                    </div>
                    <div class="inventory-bar-chart" style="display:flex; height: 50px; align-items:flex-end; gap:6px; justify-content: space-around;">
                        <div style="background:rgba(255,255,255,0.2); height: 50%; width: 14px; border-radius: 2px;"></div>
                        <div style="background:#ff5f56; height: 20%; width: 14px; border-radius: 2px;"></div>
                        <div style="background:var(--secondary-color); height: 90%; width: 14px; border-radius: 2px;"></div>
                    </div>
                </div>
            </div>
        `,
        overview: "iReply is a dynamic web-based inventory management platform developed collaboratively as a multi-member academic group project. Designed to simplify internal warehouse stock tracking, user assignments, and real-time operations logging, it addresses supply chain oversight problems for micro-enterprises.",
        solutions: [
            "Co-developed the relational database schema in MySQL, ensuring high-performance index searches, referential integrity rules, and safe transaction structures.",
            "Programmed user authentication systems in secure PHP, isolating administrative dashboard management structures from regular operator activities.",
            "Assisted in crafting crisp CSS layout wrappers and JS triggers handling responsive navigation grids and dynamic stock tracking filters.",
            "Built automated warning notifications displaying high-visibility alerts when inventory numbers fell below specified threshold numbers.",
            "Participated actively in collaborative code-testing routines using Git for version control to troubleshoot database query overflows."
        ]
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-dynamic-body');
    const closeBtn = document.getElementById('modal-close-btn');
    const triggers = document.querySelectorAll('.open-project-modal');
    
    let lastActiveElement = null;
    
    const openModal = (projectId) => {
        const data = projectData[projectId];
        if (!data) return;
        
        lastActiveElement = document.activeElement;
        
        // Inject Project Data into Modal Markup
        modalBody.innerHTML = `
            <div class="modal-header-block">
                <div class="modal-tags">
                    ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <h3 class="modal-title" id="modal-title">${data.title}</h3>
            </div>
            
            <div class="modal-visual-placeholder ${data.illustrationClass}" style="background: var(--bg-secondary); border: 1px solid var(--card-border); padding: 30px; display: flex; justify-content: center; align-items: center;">
                <div class="project-placeholder" style="width: 80%; display: flex; flex-direction: column; justify-content: center;">
                    ${data.illustrationHTML}
                </div>
            </div>
            
            <div class="modal-details-grid">
                <div class="modal-content-left">
                    <h4>Project Overview</h4>
                    <p>${data.overview}</p>
                    
                    <h4>Solutions Developed</h4>
                    <ul class="modal-list">
                        ${data.solutions.map(sol => `<li>${sol}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-content-right">
                    <div class="modal-meta-box">
                        <div class="meta-item">
                            <span class="meta-label">Role</span>
                            <span class="meta-value">${data.role}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Client / Context</span>
                            <span class="meta-value">${data.client}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Timeline</span>
                            <span class="meta-value">${data.duration}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // block parent scroll
        
        // Accessibility focus shift
        setTimeout(() => closeBtn.focus(), 50);
    };
    
    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        if (lastActiveElement) {
            lastActiveElement.focus();
        }
    };
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = trigger.getAttribute('data-project');
            openModal(projectId);
        });
    });
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close on clicking backdrop overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION & INTERACTIVE TOAST
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!form) return;
    
    const inputs = {
        name: document.getElementById('form-name'),
        email: document.getElementById('form-email'),
        subject: document.getElementById('form-subject'),
        message: document.getElementById('form-message')
    };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const validateField = (fieldKey) => {
        const input = inputs[fieldKey];
        let isValid = true;
        
        if (fieldKey === 'name') {
            isValid = input.value.trim().length >= 3;
        } else if (fieldKey === 'email') {
            isValid = emailRegex.test(input.value.trim());
        } else if (fieldKey === 'message') {
            isValid = input.value.trim().length >= 10;
        } else if (fieldKey === 'subject') {
            isValid = input.value.trim().length > 0;
        }
        
        if (isValid) {
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
        }
        
        return isValid;
    };
    
    // Real-time error removal
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', () => {
            if (inputs[key].classList.contains('invalid')) {
                validateField(key);
            }
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Run comprehensive validation
        let formValid = true;
        Object.keys(inputs).forEach(key => {
            const isFieldValid = validateField(key);
            if (!isFieldValid) {
                formValid = false;
            }
        });
        
        if (!formValid) {
            showToast("Please fix the validation errors in the form.", "error");
            return;
        }
        
        // Enter simulated loading state
        submitBtn.classList.add('sending');
        const origContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinning-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        `;
        
        // Mocks server contact submit
        setTimeout(() => {
            submitBtn.classList.remove('sending');
            submitBtn.innerHTML = origContent;
            
            showToast("Message sent successfully! Thank you, Syrah will respond soon.");
            form.reset();
        }, 1200);
    });
}

// Global Spinning Animation Style Inject
const spinStyle = document.createElement('style');
spinStyle.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinStyle);

/* ==========================================================================
   8. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = 'toast glass-card';
    
    const iconHTML = type === "success" 
        ? `<div class="toast-icon toast-success-icon">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
           </div>`
        : `<div class="toast-icon" style="background:rgba(244,63,94,0.1);color:#f43f5e;">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </div>`;
           
    toast.innerHTML = `
        ${iconHTML}
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Automatically fade out after 4 seconds
    setTimeout(() => {
        toast.classList.add('removing');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 4000);
}
