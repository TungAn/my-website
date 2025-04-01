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
        year: 'Now',
        logo: {
            dark: 'assets/glints-logo.svg',
            light: 'assets/glints-logo-light.svg'
        },
        title: 'Glints Chat-Driven Matching',
        subtitle: 'From Cold Application to Conversations',
        description: 'Redefining job matching through chat-based interactions, improving matching efficiency by 64% across Southeast Asia.',
        link: 'glints-case-study.html',
        expandable: true
    },
    {
        year: '2018',
        logo: {
            dark: 'assets/laz-logo.svg',
            light: 'assets/laz-logo-light.svg'
        },
        title: 'Lazada Payment Revamp',
        subtitle: 'Transforming Digital Payments',
        description: 'Increasing wallet usage by 17% and reducing cash-on-delivery by 14% across Southeast Asia.',
        link: 'lazada-case-study.html',
        expandable: true
    },
    {
        year: '2016',
        logo: {
            dark: 'assets/popjam-logo.svg',
            light: 'assets/popjam-logo-light.svg'
        },
        title: 'PopJam',
        subtitle: 'Designing a Kid-Safe Social Network for the Asian Market',
        description: 'Launched a social network for children in Vietnam, reaching 1M+ users in 8 months with a focus on safety and creativity.',
        link: 'popjam-case-study.html',
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
        
        const projectLink = document.createElement('a');
        projectLink.href = project.link || '#';
        projectLink.className = 'project-link';
        
        let headerHTML = '';
        if (project.year && project.logo) {
            headerHTML = `
                <div class="project-header">
                    <span class="year">${project.year}</span>
                    <div class="logo-container">
                        <img class="logo-dark" src="${project.logo.dark}" alt="${project.title} Logo">
                        <img class="logo-light" src="${project.logo.light}" alt="${project.title} Logo Light">
                    </div>
                </div>`;
        }
        
        projectLink.innerHTML = `
            ${headerHTML}
            <div class="project-details">
                <h3>${project.title}</h3>
                ${project.subtitle ? `<p>${project.subtitle}</p>` : ''}
                ${project.description ? `<p class="description">${project.description}</p>` : ''}
                ${project.expandable ? '<span class="expand">Read case study →</span>' : ''}
            </div>
        `;
        
        projectElement.appendChild(projectLink);
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

// Counting animation for result metrics
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        
        let currentValue = start + (range * easeOutQuad);
        
        // Handle percentage and currency formats
        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(currentValue) + '%';
        } else if (element.textContent.includes('SGD')) {
            element.textContent = Math.floor(currentValue).toLocaleString() + '+ SGD';
        } else if (element.textContent.includes('M')) {
            element.textContent = Math.floor(currentValue) + 'M+';
        } else {
            element.textContent = Math.floor(currentValue);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Set up Intersection Observer for results section
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const resultsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const resultItems = entry.target.querySelectorAll('.result-item h3');
            resultItems.forEach(item => {
                let finalValue;
                if (item.textContent.includes('SGD')) {
                    finalValue = 2500;
                } else if (item.textContent.includes('M+')) {
                    const currentText = item.textContent;
                    if (currentText.includes('230M+')) {
                        finalValue = 230;
                    } else if (currentText.includes('1M+')) {
                        finalValue = 1;
                    } else {
                        finalValue = 60;
                    }
                } else {
                    finalValue = parseInt(item.textContent.replace(/[^\d]/g, ''));
                }
                if (!item.dataset.animated) {
                    item.dataset.animated = true;
                    animateValue(item, 0, finalValue, 2000);
                }
            });
            resultsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing the results grid
document.addEventListener('DOMContentLoaded', () => {
    const resultsGrid = document.querySelector('.results-grid');
    if (resultsGrid) {
        resultsObserver.observe(resultsGrid);
    }
}); 