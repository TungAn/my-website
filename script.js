// Theme switching
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme based on stored preference, system preference, or default to dark
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (prefersDark.matches !== null) {
        // System preference detected
        if (prefersDark.matches) {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    } else {
        // System preference not detected, default to dark
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        }
    });
    
    // Handle manual theme toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Project data
const projects = [
    {
        year: '2025',
        logo: 'assets/glints-logo.svg',
        title: 'Glints',
        subtitle: 'From Cold Application to Conversations',
        description: 'How a Chat-Driven Approach Increased Glints Matching Efficiency',
        expandable: true
    },
    {
        year: '2018',
        logo: 'assets/laz-logo.svg',
        title: 'Lazada',
        subtitle: 'E-commerce Payment Revamp',
        description: 'Transforming Digital Payments Across Southeast Asia',
        expandable: true
    },
    {
        year: '2016',
        logo: 'assets/popjam-logo.svg',
        title: 'PopJam',
        subtitle: 'Designing a Kid-Safe Social Network for the Asian Market',
        expandable: true
    }
];

// Populate projects
function populateProjects() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return; // Exit if element doesn't exist
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'company project';
        
        projectElement.innerHTML = `
            <div class="project-header">
                <span class="year">${project.year}</span>
                <img src="${project.logo}" alt="${project.title} Logo">
            </div>
            <div class="project-details">
                <h3>${project.title}</h3>
                <p>${project.subtitle}</p>
                ${project.description ? `<p class="description">${project.description}</p>` : ''}
                ${project.expandable ? '<span class="expand">Read case study →</span>' : ''}
            </div>
        `;
        
        projectGrid.appendChild(projectElement);
    });
}

// Add scroll functionality for experience section
document.addEventListener('DOMContentLoaded', function() {
    const scrollLeft = document.querySelector('#experience .scroll-left');
    const scrollRight = document.querySelector('#experience .scroll-right');
    const companyGrid = document.querySelector('#experience .company-grid');
    
    if (scrollLeft && scrollRight && companyGrid) {
        const scrollAmount = window.innerWidth >= 768 ? 432 : window.innerWidth * 0.85;
        
        // Initially hide left arrow and show right arrow if there's scrollable content
        scrollLeft.style.display = 'none';
        scrollRight.style.display = companyGrid.scrollWidth > companyGrid.clientWidth ? 'flex' : 'none';
        
        const updateArrowVisibility = () => {
            // Show/hide left arrow based on scroll position
            scrollLeft.style.display = companyGrid.scrollLeft > 0 ? 'flex' : 'none';
            
            // Show/hide right arrow based on remaining scroll
            const maxScroll = companyGrid.scrollWidth - companyGrid.clientWidth;
            const isAtEnd = Math.ceil(companyGrid.scrollLeft) >= maxScroll;
            scrollRight.style.display = isAtEnd ? 'none' : 'flex';
        };

        const addBounceEffect = (element) => {
            element.classList.add('bounce');
            element.addEventListener('animationend', () => {
                element.classList.remove('bounce');
            }, { once: true });
        };
        
        scrollLeft.addEventListener('click', () => {
            addBounceEffect(scrollLeft);
            companyGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        scrollRight.addEventListener('click', () => {
            addBounceEffect(scrollRight);
            companyGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Update arrow visibility on scroll
        companyGrid.addEventListener('scroll', updateArrowVisibility);
        
        // Update arrow visibility on window resize
        window.addEventListener('resize', () => {
            updateArrowVisibility();
        });
    }

    // Smooth scroll for navigation with URL hash update
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Update URL hash without jumping
                window.history.pushState(null, '', targetId);
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle initial hash in URL
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Rest of your DOMContentLoaded code...
    const sections = document.querySelectorAll('section, footer');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Initialize projects
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    populateProjects();
}); 