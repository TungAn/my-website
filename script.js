// Project data
const projects = [
    {
        year: '2020',
        logo: 'assets/beats-logo.svg',
        title: 'Beats by Dre',
        subtitle: 'Native app for device manufacturing',
        description: 'NDA',
        expandable: true
    },
    {
        year: '2020',
        logo: 'assets/apple-tv-plus-logo.svg',
        title: 'Apple TV+',
        subtitle: 'Remote design sprint',
        description: 'NDA',
        expandable: true
    },
    {
        year: '2020',
        logo: 'assets/apple-logo.svg',
        title: 'Apple',
        subtitle: 'Intranet design system',
        description: 'NDA',
        expandable: true
    },
    {
        year: '2019',
        logo: 'assets/skyslope-logo.svg',
        title: 'SkySlope',
        subtitle: 'Sketch to ReactJS design system',
        expandable: true
    },
    {
        year: '2018',
        logo: 'assets/csis-logo.svg',
        title: 'CSIS',
        subtitle: 'Gov. agency rebrand',
        expandable: true
    },
    {
        year: '2016',
        logo: 'assets/axomo-logo.svg',
        title: 'Axomo.com',
        subtitle: 'Ecommerce platform',
        expandable: true
    }
];

// Populate projects
function populateProjects() {
    const projectGrid = document.querySelector('.project-grid');
    
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
                ${project.expandable ? '<span class="expand">Expand</span>' : ''}
            </div>
        `;
        
        projectGrid.appendChild(projectElement);
    });
}

// Smooth scroll for navigation
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateProjects();
}); 