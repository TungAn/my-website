// Theme switching
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme based on stored preference or system preference
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
    
    // Handle manual theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Initialize theme immediately
initializeTheme();

// Project data
const projects = [
    {
        year: '2022–23',
        logo: {
            dark: 'assets/glints-logo.svg',
            light: 'assets/glints-logo-light.svg'
        },
        title: 'Glints Chat to Apply',
        description: 'The resume was the first barrier to applying. Making chat the first action got applications processed faster.',
        readTime: '8 min read',
        link: 'glints-case-study',
        expandable: true
    },
    {
        year: '2018',
        logo: {
            dark: 'assets/laz-logo.svg',
            light: 'assets/laz-logo-light.svg'
        },
        title: 'Lazada Payment Revamp',
        description: 'We started with the market that had the most payment methods, then scaled to six. Wallet adoption went up 17%, and cash-on-delivery dropped 14%.',
        readTime: '10 min read',
        link: 'lazada-case-study',
        expandable: true
    },
    {
        year: '2016',
        logo: {
            dark: 'assets/popjam-logo.svg',
            light: 'assets/popjam-logo-light.svg'
        },
        title: 'PopJam',
        description: 'Leadership wanted a video app, but we built Kid Challenges instead. 1.2M users across APAC in 8 months.',
        readTime: '7 min read',
        link: 'popjam-case-study',
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
                <div class="project-footer">
                    ${project.readTime ? `<span class="read-time">${project.readTime}</span>` : ''}
                    ${project.expandable ? '<span class="expand">Read case study →</span>' : ''}
                </div>
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

// Initialize all result numbers to - on page load
function initializeResultNumbers() {
    const resultItems = document.querySelectorAll('.result-item h3');
    resultItems.forEach(item => {
        const originalText = item.textContent;
        item.dataset.originalText = originalText;
        
        if (originalText.includes('SGD')) {
            item.textContent = '- SGD';
        } else if (originalText.includes('K+')) {
            item.textContent = '-K+';
        } else if (originalText.includes('M+')) {
            item.textContent = '-M+';
        } else if (originalText.includes('%')) {
            item.textContent = '-%';
        } else {
            item.textContent = '-';
        }
    });
}

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
        const originalText = element.dataset.originalText;
        
        // Handle percentage and currency formats
        if (originalText.includes('%')) {
            element.textContent = Math.floor(currentValue) + '%';
        } else if (originalText.includes('SGD')) {
            element.textContent = Math.floor(currentValue).toLocaleString() + '+ SGD';
        } else if (originalText.includes('K+')) {
            element.textContent = Math.floor(currentValue) + 'K+';
        } else if (originalText.includes('M+')) {
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
                if (!item.dataset.animated) {
                    let finalValue;
                    const originalText = item.dataset.originalText;
                    
                    if (originalText.includes('SGD')) {
                        finalValue = 2500;
                    } else if (originalText.includes('K+')) {
                        finalValue = 100;
                    } else if (originalText.includes('M+')) {
                        if (originalText.includes('230M+')) {
                            finalValue = 230;
                        } else {
                            finalValue = 60;
                        }
                    } else if (originalText.includes('%')) {
                        finalValue = parseInt(originalText.replace(/[^\d]/g, ''));
                    } else {
                        finalValue = parseInt(originalText.replace(/[^\d]/g, ''));
                    }
                    
                    item.dataset.animated = true;
                    animateValue(item, 0, finalValue, 2000);
                }
            });
            resultsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    populateProjects();
    initializeResultNumbers();
    
    const resultsGrid = document.querySelector('.results-grid');
    if (resultsGrid) {
        resultsObserver.observe(resultsGrid);
    }
}); 
// Previous Experience timeline: the active dot follows the scroll position
function initExperienceTimeline() {
    const timeline = document.querySelector('#experience .timeline');
    if (!timeline) return;
    const items = Array.from(timeline.querySelectorAll('li'));
    if (!items.length) return;
    let ticking = false;

    const update = () => {
        ticking = false;
        const line = window.innerHeight * 0.55;
        let active = 0;
        items.forEach((item, i) => {
            if (item.getBoundingClientRect().top <= line) active = i;
        });
        items.forEach((item, i) => {
            item.classList.toggle('is-active', i === active);
            item.classList.toggle('is-past', i < active);
        });
        const dot = items[active].getBoundingClientRect();
        const top = timeline.getBoundingClientRect().top;
        timeline.style.setProperty('--tl-progress', Math.max(0, dot.top - top + 11) + 'px');
    };

    const onScroll = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
}

document.addEventListener('DOMContentLoaded', initExperienceTimeline);

// Soft page glow that follows the pointer, a glow on the card under it, and tilt on Selected Work cards
function initCardGlow() {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    // Attach to <html>: body has a transform, which would pin a fixed element to the body instead of the window
    document.documentElement.appendChild(glow);

    let x = innerWidth / 2, y = innerHeight / 3, gx = x, gy = y, running = false;
    const step = () => {
        gx += (x - gx) * 0.15;
        gy += (y - gy) * 0.15;
        glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
        if (Math.abs(x - gx) > 0.5 || Math.abs(y - gy) > 0.5) requestAnimationFrame(step);
        else running = false;
    };

    document.addEventListener('pointermove', (e) => {
        x = e.clientX;
        y = e.clientY;
        glow.classList.add('is-on');
        if (!running) { running = true; requestAnimationFrame(step); }
    });
    document.documentElement.addEventListener('pointerleave', () => glow.classList.remove('is-on'));

    const selector = '.project-link, .current-role .company-details li, .insight-card, .key-points, .quote, .result-item, .case-study-image';
    let active = null;

    const reset = (card) => {
        card.classList.remove('is-glowing', 'is-tilting');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
    };

    document.addEventListener('pointermove', (e) => {
        const card = e.target instanceof Element ? e.target.closest(selector) : null;
        if (active && active !== card) { reset(active); active = null; }
        if (!card) return;
        if (!card.querySelector(':scope > .card-glow')) {
            const layer = document.createElement('span');
            layer.className = 'card-glow';
            layer.setAttribute('aria-hidden', 'true');
            card.prepend(layer);
        }
        active = card;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
        card.classList.add('is-glowing');
        // Only Selected Work cards tilt; text cards just glow
        if (card.classList.contains('project-link')) {
            const max = 2.5;
            card.style.setProperty('--ry', `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
            card.style.setProperty('--rx', `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
            card.classList.add('is-tilting');
        }
    });

    document.addEventListener('pointerleave', () => { if (active) { reset(active); active = null; } });
}

document.addEventListener('DOMContentLoaded', initCardGlow);

// Header hides after a short scroll down and slides back when scrolling up or near the top
function initHeaderAutoHide() {
    const header = document.querySelector('header');
    if (!header) return;

    const TOP_ZONE = 80;     // always show within this distance of the top
    const HIDE_AFTER = 240;  // scroll this far down in one go before hiding
    const SHOW_AFTER = 8;    // a small scroll up brings it back
    let lastY = window.scrollY;
    let anchorY = lastY;     // where the current scroll direction started
    let goingDown = true;
    let ticking = false;
    // On reload the browser jumps back to the old scroll position. That jump is not
    // the visitor scrolling, so ignore scroll until the page has settled.
    let ready = false;
    const settle = () => setTimeout(() => {
        lastY = anchorY = window.scrollY;
        ready = true;
    }, 400);
    if (document.readyState === 'complete') settle();
    else window.addEventListener('load', settle, { once: true });

    const update = () => {
        ticking = false;
        const y = window.scrollY;
        if (!ready) {
            lastY = anchorY = y;
            header.classList.remove('is-hidden');
            return;
        }
        const down = y > lastY;
        if (y !== lastY && down !== goingDown) {
            goingDown = down;
            anchorY = lastY;
        }
        lastY = y;

        if (y <= TOP_ZONE) {
            header.classList.remove('is-hidden');
        } else if (goingDown && y - anchorY > HIDE_AFTER) {
            header.classList.add('is-hidden');
        } else if (!goingDown && anchorY - y > SHOW_AFTER) {
            header.classList.remove('is-hidden');
        }
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initHeaderAutoHide);
