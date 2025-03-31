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
        logo: 'assets/ant-logo.svg',
        title: 'Lazada Payment Revamp',
        subtitle: 'Transforming Digital Payments Across Southeast Asia',
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
document.addEventListener('DOMContentLoaded', function() {
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
    const sections = document.querySelectorAll('section');
    
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
    populateProjects();
}); 