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
        year: '2025–26',
        logo: {
            dark: 'assets/glints-logo.svg?v=3',
            light: 'assets/glints-logo-light.svg?v=4'
        },
        title: 'Glints Shortlist Quota',
        description: 'Employers kept posting the same job again to get more shortlists. Moving to one monthly quota for the whole company, with prices shown at the limit, almost doubled the share who bought after hitting it.',
        readTime: '10 min read',
        link: 'glints-shortlist-quota',
        expandable: true
    },
    {
        year: '2025–26',
        logo: {
            dark: 'assets/glints-logo.svg?v=3',
            light: 'assets/glints-logo-light.svg?v=4'
        },
        title: 'Glints Employer Workspace',
        description: 'Employers screened in the table, but had to jump to the profile, chat, the CV and WhatsApp to decide on one candidate. Separating navigation and connecting evaluation around the table brought that decision into one place.',
        readTime: '8 min read',
        link: 'glints-employer-workspace',
        expandable: true
    },
    {
        year: '2022–23',
        logo: {
            dark: 'assets/glints-logo.svg?v=3',
            light: 'assets/glints-logo-light.svg?v=4'
        },
        title: 'Glints Chat to Apply',
        description: 'Many candidates stopped at the resume step and never applied. Letting them start with a chat instead got their applications processed faster.',
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

    const selector = '.project-link, .current-role .company-details li, .insight-card, .key-points, .quote, .result-item, .case-study-image, .barrier, .option, .matrix, .hero-chat, .how-flow li, .model, .hero-move, .decision, .sitemap, .qstack, .ws-fig';
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


// Case study figures (matrix, chart, timeline): animate once when they scroll into view
(function () {
    var els = document.querySelectorAll('.matrix, .chart, .timeline, .qstack');
    if (!els.length) return;
    document.querySelectorAll('.timeline').forEach(function (el) { el.classList.add('tl-anim'); });
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in-view'); }); return; }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
        });
    }, { threshold: 0.3 });
    els.forEach(function (el) { io.observe(el); });
})();

// Case studies: sticky table of contents (desktop), built from each section's h2
(function () {
    var main = document.querySelector('main.case-study');
    if (!main) return;
    var heads = Array.prototype.slice.call(main.querySelectorAll('.case-study-section > h2'));
    if (heads.length < 3) return;

    var used = {};
    heads.forEach(function (h) {
        if (!h.id) {
            var base = h.textContent.toLowerCase().replace(/&/g, 'and').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
            var id = base, n = 2;
            while (used[id] || document.getElementById(id)) { id = base + '-' + n++; }
            h.id = id;
        }
        used[h.id] = true;
    });

    var nav = document.createElement('nav');
    nav.className = 'cs-toc';
    nav.setAttribute('aria-label', 'In this article');
    var inner = document.createElement('div');
    inner.className = 'cs-toc-inner';
    var title = document.createElement('p');
    title.className = 'cs-toc-title';
    title.textContent = 'In this article';
    var list = document.createElement('ol');
    var links = heads.map(function (h) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.getAttribute('data-toc') || h.textContent.trim();
        a.addEventListener('click', function (e) {
            e.preventDefault();
            var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            h.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
            if (history.replaceState) history.replaceState(null, '', '#' + h.id);
        });
        li.appendChild(a);
        list.appendChild(li);
        return a;
    });
    inner.appendChild(title);
    inner.appendChild(list);
    nav.appendChild(inner);
    // the rail starts at the first section, so the list appears once the hero is passed
    var first = heads[0].closest('.case-study-section');
    main.insertBefore(nav, first);

    var end = main.querySelector('.case-study-nav');
    var ticking = false;
    function update() {
        ticking = false;
        var line = window.innerHeight * 0.35;
        var active = -1;
        heads.forEach(function (h, i) { if (h.getBoundingClientRect().top <= line) active = i; });
        links.forEach(function (a, i) {
            var on = i === active;
            a.classList.toggle('is-active', on);
            if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
        // fade out once the article ends, so it doesn't sit beside the next-project links
        var listBottom = inner.getBoundingClientRect().bottom;
        nav.classList.toggle('is-done', !!end && end.getBoundingClientRect().top < listBottom + 24);
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
})();

// ===== Analytics: engagement events for GA4 (no-op when the Google tag isn't on the page) =====
(function () {
    function track(name, params) {
        if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    }
    var path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    var isCaseStudy = !!document.querySelector('main.case-study');
    var project = isCaseStudy ? path.replace(/^\//, '') : null;
    var started = Date.now();

    // Clicks: case study cards, next/back links, contact, header nav, contents
    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a');
        if (!a) return;
        var href = a.getAttribute('href') || '';
        if (a.closest('.project-grid')) {
            var title = a.querySelector('h3');
            track('case_study_open', { project: href.replace(/\.html$/, '').replace(/^\//, ''), project_title: title ? title.textContent.trim() : '', from: 'home' });
        } else if (a.closest('.case-study-nav')) {
            var label = (a.querySelector('.nav-title') || a).textContent.trim();
            var dest = href.replace(/\.html$/, '').replace(/^\//, '');
            if (dest.indexOf('#') === 0 || dest === '' || dest.indexOf('#projects') > -1) track('case_study_back', { project: project });
            else track('case_study_open', { project: dest, project_title: label, from: project || path });
        } else if (href.indexOf('mailto:') === 0) {
            track('contact_click', { method: 'email', page: path });
        } else if (/linkedin\.com/i.test(href)) {
            track('contact_click', { method: 'linkedin', page: path });
        } else if (a.closest('.cs-toc')) {
            track('toc_click', { project: project, section: a.textContent.trim() });
        } else if (a.closest('header nav')) {
            track('nav_click', { label: a.textContent.trim(), page: path });
        }
    }, true);

    // Theme toggle
    var toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.addEventListener('click', function () {
        setTimeout(function () { track('theme_toggle', { theme: document.documentElement.getAttribute('data-theme') || 'dark', page: path }); }, 0);
    });

    if (!isCaseStudy) return;

    // Reading depth: 25 / 50 / 75 / 100% of the article
    var main = document.querySelector('main.case-study');
    var marks = [25, 50, 75, 100], sent = {};
    function depth() {
        var r = main.getBoundingClientRect();
        var seen = (window.innerHeight - r.top) / r.height * 100;
        marks.forEach(function (m) {
            if (!sent[m] && seen >= m) { sent[m] = true; track('case_study_progress', { project: project, percent: m }); }
        });
    }
    var tick = false;
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(function () { tick = false; depth(); }); } }, { passive: true });
    depth();

    // Sections read: each h2 once, when it reaches the upper half of the screen
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                io.unobserve(en.target);
                track('section_view', { project: project, section: en.target.textContent.trim() });
            });
        }, { rootMargin: '0px 0px -50% 0px' });
        document.querySelectorAll('.case-study-section > h2').forEach(function (h) { io.observe(h); });

        // Finished: the end-of-article navigation comes into view
        var end = document.querySelector('.case-study-nav');
        if (end) {
            var eo = new IntersectionObserver(function (entries) {
                if (!entries[0].isIntersecting) return;
                eo.disconnect();
                track('case_study_complete', { project: project, seconds: Math.round((Date.now() - started) / 1000) });
            });
            eo.observe(end);
        }
    }
})();

// Scroll slideshow: pin the frame and swap screens as the reader scrolls past it
(function () {
    document.querySelectorAll('.scrolly').forEach(function (box) {
        var stage = box.querySelector('.sc-stage');
        var slides = box.querySelectorAll('.sc-slide');
        var steps = box.querySelectorAll('.sc-steps button');
        var cap = box.querySelector('.sc-cap');
        var n = slides.length;
        if (!stage || n < 2) return;
        box.classList.add('is-on');
        var current = -1;
        function stepLen() { return Math.max(window.innerHeight * 0.55, 280); }
        function size() { box.style.height = (stage.offsetHeight + (n - 1) * stepLen()) + 'px'; }
        function stickyTop() { return parseFloat(getComputedStyle(stage).top) || 0; }
        function show(i) {
            if (i === current) return;
            current = i;
            slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
            steps.forEach(function (b, k) { b.classList.toggle('is-active', k === i); b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
            if (cap) cap.innerHTML = slides[i].getAttribute('data-cap') || '';
            moveThumb();
        }
        var list = box.querySelector('.sc-steps');
        var thumb = null;
        if (list) { thumb = document.createElement('li'); thumb.className = 'sc-thumb'; thumb.setAttribute('aria-hidden', 'true'); list.prepend(thumb); }
        function moveThumb() {
            if (!thumb || current < 0) return;
            var b = steps[current];
            thumb.style.width = b.offsetWidth + 'px';
            thumb.style.transform = 'translateX(' + b.parentNode.offsetLeft + 'px)';
        }
        function update() {
            var passed = stickyTop() - box.getBoundingClientRect().top;
            var i = Math.round(Math.min(Math.max(passed / stepLen(), 0), n - 1));
            show(i);
        }
        steps.forEach(function (b, k) {
            b.addEventListener('click', function () {
                var y = box.getBoundingClientRect().top + window.scrollY - stickyTop() + k * stepLen() + 2;
                window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            });
        });
        box.querySelectorAll('.sc-slide img, img.sc-slide').forEach(function (im) { im.loading = 'eager'; if (!im.complete) im.addEventListener('load', size); });
        size(); show(0); update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', function () { size(); update(); moveThumb(); });
    });
})();
