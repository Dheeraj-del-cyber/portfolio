// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor & CAD Crosshairs
const cursorDot = document.querySelector('.cursor-dot');
const crosshairH = document.querySelector('.cursor-crosshair-h');
const crosshairV = document.querySelector('.cursor-crosshair-v');

// Add a coordinate tooltip near the cursor
const coordLabel = document.createElement('div');
coordLabel.className = 'cursor-coords';
document.body.appendChild(coordLabel);

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Move Dot
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Move Crosshairs
    crosshairH.style.top = `${posY}px`;
    crosshairV.style.left = `${posX}px`;

    // Update Coordinates
    coordLabel.style.left = `${posX + 15}px`;
    coordLabel.style.top = `${posY + 15}px`;
    coordLabel.innerText = `${posX}, ${posY}`;
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle hamburger icon between menu and X
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
    } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    }
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP Animations
// Initial Load Animations
const tl = gsap.timeline();

tl.from('.navbar', { y: -50, opacity: 0, duration: 1, ease: 'power3.out' })
    .from('.nav-links li', {
        y: -18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
    }, '-=0.55')
    .from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
    .from('.hero-subtitle', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
    .from('.hero-btns', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
    .from('.scroll-indicator', { opacity: 0, duration: 1 }, '-=0.5');

// Navbar interactive hover animation
navLinksItems.forEach((link) => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            y: -2,
            duration: 0.25,
            ease: 'power2.out'
        });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            y: 0,
            duration: 0.25,
            ease: 'power2.out'
        });
    });
});

// Scroll Animations
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.about-text').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Skill bars animation
ScrollTrigger.create({
    trigger: '.skills-wrapper',
    start: 'top 75%',
    onEnter: () => {
        document.querySelectorAll('.progress').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }
});

gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 75%'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform' // Very important: removes GSAP transforms after execution so CSS position: sticky works
    });
});

gsap.from('.contact-wrapper', {
    scrollTrigger: {
        trigger: '.contact.section',
        start: 'top 75%'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Smooth button scroll with zoom out effect concept
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        // Add zoom transition class to main
        const main = document.querySelector('main');
        main.style.transition = 'transform 0.5s ease-in-out';
        main.style.transform = 'scale(0.95)';

        // Deep Zoom into Space Effect (Three.js Camera)
        gsap.to(camera.position, {
            z: 5, // Zoom way in (from normal 30)
            duration: 0.8,
            ease: 'power2.inOut',
            yoyo: true, // Go back to original position
            repeat: 1
        });

        // Temporarily speed up particle rotation for "warp" effect
        gsap.to(particles.rotation, {
            z: '+=2',
            duration: 1.6,
            ease: 'power1.inOut'
        });

        setTimeout(() => {
            target.scrollIntoView({
                behavior: 'smooth'
            });

            setTimeout(() => {
                main.style.transform = 'scale(1)';
            }, 600); // Wait for scroll roughly
        }, 300);
    });
});

// --- THREE.JS BACKGROUND SETUP ---
const canvas = document.querySelector('#webgl-canvas');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 30;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Objects
const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.2
});

const particles = new THREE.Group();
scene.add(particles);

// Create multiple floating objects
for (let i = 0; i < 50; i++) {
    const mesh = new THREE.Mesh(geometry, material);

    // Random position
    mesh.position.x = (Math.random() - 0.5) * 60;
    mesh.position.y = (Math.random() - 0.5) * 60;
    mesh.position.z = (Math.random() - 0.5) * 60;

    // Random rotation
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;

    // Random scale
    const scale = Math.random() * 2;
    mesh.scale.set(scale, scale, scale);

    particles.add(mesh);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x7000ff, 2);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x00e5ff, 2);
pointLight2.position.set(-20, -20, 20);
scene.add(pointLight2);

// Mouse & Touch Parallax Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX - windowHalfX);
        mouseY = (event.touches[0].clientY - windowHalfY);
    }
}, { passive: true });

document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX - windowHalfX);
        mouseY = (event.touches[0].clientY - windowHalfY);
    }
}, { passive: true });

// Render Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    particles.rotation.y += 0.05 * (targetX - particles.rotation.y);
    particles.rotation.x += 0.05 * (targetY - particles.rotation.x);

    // Slowly rotate the whole group over time
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;

    // Individual particle movement
    particles.children.forEach((particle, i) => {
        particle.rotation.x += 0.001 * (i % 5 + 1);
        particle.rotation.y += 0.002 * (i % 3 + 1);
    });

    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// --- BACKGROUND MUSIC SETUP ---
const bgMusic = document.getElementById('bg-music');
if (bgMusic) {
    bgMusic.volume = 0.15; // Set volume to 15% for low audio

    let interactionHandled = false;

    // Function to attempt playing audio
    const playAudio = () => {
        if (interactionHandled) return;
        
        if (bgMusic.paused) {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    interactionHandled = true;
                    // Audio is playing successfully, we can remove the interaction listeners
                    document.removeEventListener('click', playAudio);
                    document.removeEventListener('keydown', playAudio);
                    document.removeEventListener('touchstart', playAudio);
                    document.removeEventListener('touchend', playAudio);
                }).catch((err) => {
                    // Autoplay blocked, wait for next user interaction
                    console.log("Audio autoplay blocked, waiting for interaction.");
                });
            }
        }
    };

    // Try to play immediately on load
    playAudio();

    // Listen to user interactions to bypass autoplay policy
    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
    document.addEventListener('touchstart', playAudio);
    document.addEventListener('touchend', playAudio);
}

// --- GITHUB INTEGRATION ---
const GITHUB_USERNAME = 'Dheeraj-del-cyber';

// Fetch GitHub stats
async function fetchGitHubStats() {
    try {
        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)
        ]);

        const user = await userResponse.json();
        const repos = await reposResponse.json();

        // Update stats
        document.getElementById('repos-count').textContent = user.public_repos;
        document.getElementById('followers-count').textContent = user.followers;

        // Calculate total stars and commits
        let totalStars = 0;
        let totalCommits = 0;

        for (const repo of repos) {
            if (!repo.fork) {
                totalStars += repo.stargazers_count;
                // Note: Getting commit count requires individual repo API calls
                // For demo purposes, we'll use a simplified approach
            }
        }

        document.getElementById('stars-count').textContent = totalStars;
        document.getElementById('commits-count').textContent = '150+'; // Placeholder

        // Fetch languages
        await fetchLanguages(repos);
        
        // Fetch recent activity
        await fetchRecentActivity();

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Fallback values
        document.getElementById('repos-count').textContent = '12';
        document.getElementById('followers-count').textContent = '25';
        document.getElementById('stars-count').textContent = '8';
        document.getElementById('commits-count').textContent = '150+';
    }
}

// Fetch programming languages
async function fetchLanguages(repos) {
    const languages = {};
    
    for (const repo of repos.slice(0, 10)) { // Limit to top 10 repos
        try {
            const langResponse = await fetch(repo.languages_url);
            const repoLanguages = await langResponse.json();
            
            for (const [lang, bytes] of Object.entries(repoLanguages)) {
                languages[lang] = (languages[lang] || 0) + bytes;
            }
        } catch (error) {
            console.error('Error fetching languages for repo:', repo.name, error);
        }
    }

    // Sort languages by usage
    const sortedLanguages = Object.entries(languages)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 6); // Top 6 languages

    const totalBytes = sortedLanguages.reduce((sum, [, bytes]) => sum + bytes, 0);
    
    const container = document.getElementById('languages-container');
    container.innerHTML = '';

    sortedLanguages.forEach(([lang, bytes]) => {
        const percentage = ((bytes / totalBytes) * 100).toFixed(1);
        const color = getLanguageColor(lang);
        
        const bar = document.createElement('div');
        bar.className = 'language-bar';
        bar.innerHTML = `
            <span class="language-name">${lang}</span>
            <div class="language-fill">
                <div class="language-progress" style="background: ${color}; width: 0%"></div>
            </div>
            <span class="language-percent">${percentage}%</span>
        `;
        container.appendChild(bar);

        // Animate progress bar
        setTimeout(() => {
            bar.querySelector('.language-progress').style.width = `${percentage}%`;
        }, 500);
    });
}

// Get color for programming language
function getLanguageColor(lang) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'TypeScript': '#2b7489',
        'Java': '#ed8c33',
        'C++': '#f34b7d',
        'C': '#555555',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Dart': '#00B4AB'
    };
    return colors[lang] || '#586069';
}

// Fetch recent activity (simplified)
async function fetchRecentActivity() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=5`);
        const events = await response.json();
        
        const container = document.getElementById('recent-activity');
        container.innerHTML = '';

        events.forEach(event => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            let icon = 'bx bx-code-alt';
            let action = '';
            let repo = event.repo.name;
            
            switch(event.type) {
                case 'PushEvent':
                    icon = 'bx bx-git-commit';
                    action = `Pushed to ${repo}`;
                    break;
                case 'CreateEvent':
                    icon = 'bx bx-plus';
                    action = `Created ${event.payload.ref_type} in ${repo}`;
                    break;
                case 'PullRequestEvent':
                    icon = 'bx bx-git-pull-request';
                    action = `${event.payload.action} pull request in ${repo}`;
                    break;
                case 'IssuesEvent':
                    icon = 'bx bx-bug';
                    action = `${event.payload.action} issue in ${repo}`;
                    break;
                default:
                    action = `Activity in ${repo}`;
            }
            
            activityItem.innerHTML = `
                <div class="activity-icon">
                    <i class='${icon}'></i>
                </div>
                <div class="activity-content">
                    <h4>${action}</h4>
                    <p>${new Date(event.created_at).toLocaleDateString()}</p>
                </div>
            `;
            
            container.appendChild(activityItem);
        });
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        // Fallback content
        document.getElementById('recent-activity').innerHTML = `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class='bx bx-code-alt'></i>
                </div>
                <div class="activity-content">
                    <h4>Recent coding activity</h4>
                    <p>Building amazing projects</p>
                </div>
            </div>
        `;
    }
}

// Generate contribution graph (simplified)
function generateContributionGraph() {
    const container = document.getElementById('contribution-graph');
    const calendar = document.createElement('div');
    calendar.className = 'contribution-calendar';
    
    // Generate 52 weeks
    for (let week = 0; week < 52; week++) {
        const weekDiv = document.createElement('div');
        weekDiv.className = 'contribution-week';
        
        // Generate 7 days per week
        for (let day = 0; day < 7; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'contribution-day';
            
            // Random contribution level (0-4)
            const level = Math.floor(Math.random() * 5);
            if (level > 0) {
                const intensity = level / 4;
                dayDiv.style.background = `rgba(59, 130, 246, ${0.2 + intensity * 0.8})`;
                dayDiv.title = `${level} contributions`;
            }
            
            weekDiv.appendChild(dayDiv);
        }
        
        calendar.appendChild(weekDiv);
    }
    
    container.innerHTML = '<h3>Contribution Graph</h3>';
    container.appendChild(calendar);
}

// --- VISITOR ANALYTICS DASHBOARD ---
const analyticsDashboard = document.getElementById('analytics-dashboard');
const closeAnalytics = document.getElementById('close-analytics');

// Analytics data
let analyticsData = {
    pageViews: 0,
    sessionStart: Date.now(),
    sectionsViewed: new Set(),
    contactSubmissions: 0,
    sectionTimes: {}
};

// Initialize analytics
function initAnalytics() {
    // Load from localStorage
    const saved = localStorage.getItem('portfolio-analytics');
    if (saved) {
        analyticsData = { ...analyticsData, ...JSON.parse(saved) };
    }

    // Increment page views
    analyticsData.pageViews++;
    updateAnalyticsDisplay();

    // Track section visibility
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = section.id;
                    analyticsData.sectionsViewed.add(sectionId);
                    
                    if (!analyticsData.sectionTimes[sectionId]) {
                        analyticsData.sectionTimes[sectionId] = Date.now();
                    }
                    
                    updateAnalyticsDisplay();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(section);
    });

    // Track time spent
    setInterval(updateTimeSpent, 1000);

    // Save analytics periodically
    setInterval(saveAnalytics, 5000);
}

// Update analytics display
function updateAnalyticsDisplay() {
    document.getElementById('page-views').textContent = analyticsData.pageViews;
    document.getElementById('sections-viewed').textContent = `${analyticsData.sectionsViewed.size}/6`;
    document.getElementById('contact-submissions').textContent = analyticsData.contactSubmissions;
    
    // Device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)|Tablet|PlayBook/i.test(navigator.userAgent);
    let deviceType = 'Desktop';
    if (isTablet) deviceType = 'Tablet';
    else if (isMobile) deviceType = 'Mobile';
    document.getElementById('device-type').textContent = deviceType;
    
    // Screen resolution
    document.getElementById('screen-res').textContent = `${window.screen.width}x${window.screen.height}`;
    
    // Section analytics
    updateSectionAnalytics();
}

// Update time spent
function updateTimeSpent() {
    const elapsed = Math.floor((Date.now() - analyticsData.sessionStart) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('time-spent').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update section analytics
function updateSectionAnalytics() {
    const container = document.getElementById('section-analytics');
    container.innerHTML = '';
    
    const sections = ['home', 'about', 'projects', 'experience', 'achievements', 'contact'];
    sections.forEach(section => {
        const viewed = analyticsData.sectionsViewed.has(section);
        const timeSpent = analyticsData.sectionTimes[section] ? 
            Math.floor((Date.now() - analyticsData.sectionTimes[section]) / 1000) : 0;
        
        const stat = document.createElement('div');
        stat.className = 'section-stat';
        stat.innerHTML = `
            <span>${section.charAt(0).toUpperCase() + section.slice(1)}</span>
            <span>${viewed ? `${timeSpent}s` : 'Not viewed'}</span>
        `;
        container.appendChild(stat);
    });
}

// Save analytics to localStorage
function saveAnalytics() {
    localStorage.setItem('portfolio-analytics', JSON.stringify(analyticsData));
}

// Show analytics dashboard (triggered by Konami code or URL param)
function showAnalytics() {
    analyticsDashboard.style.display = 'block';
    updateAnalyticsDisplay();
}

// Hide analytics dashboard
function hideAnalytics() {
    analyticsDashboard.style.display = 'none';
}

// Konami code detection
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        showAnalytics();
        konamiCode = [];
    }
});

// Check URL parameters for analytics access
if (window.location.search.includes('analytics=true')) {
    showAnalytics();
}

// Event listeners
closeAnalytics.addEventListener('click', hideAnalytics);

// Track contact form submissions
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            analyticsData.contactSubmissions++;
            updateAnalyticsDisplay();
        });
    }
});

// Initialize analytics
initAnalytics();
const scrollProgress = document.querySelector('.scroll-progress-bar');

// Update scroll progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Parallax scrolling for background elements
gsap.utils.toArray('.section').forEach((section, i) => {
    gsap.to(section, {
        backgroundPosition: `50% ${50 + i * 10}%`,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Typing animation for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
heroSubtitle.textContent = '';

function typeWriter(text, i = 0) {
    if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(text, i), 50);
    }
}

// Start typing animation when hero is in view
ScrollTrigger.create({
    trigger: '.hero',
    start: 'top 80%',
    onEnter: () => {
        if (heroSubtitle.textContent === '') {
            setTimeout(() => typeWriter(originalText), 1000);
        }
    }
});

// Morphing elements on scroll
gsap.utils.toArray('.glass-card').forEach(card => {
    gsap.to(card, {
        borderRadius: '20px',
        scale: 1.02,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    });
});

// Floating animation for project cards
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.to(card, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.2
    });
});
const themeToggle = document.getElementById('theme-toggle');
const themeMenu = document.getElementById('theme-menu');
const themeOptions = document.querySelectorAll('.theme-option');

// Get saved theme or default to 'default'
const savedTheme = localStorage.getItem('portfolio-theme') || 'default';
document.documentElement.setAttribute('data-theme', savedTheme);

// Update theme button icon based on current theme
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    switch(theme) {
        case 'dark':
            icon.className = 'bx bx-moon';
            break;
        case 'high-contrast':
            icon.className = 'bx bx-low-vision';
            break;
        case 'holiday':
            icon.className = 'bx bx-gift';
            break;
        case 'halloween':
            icon.className = 'bx bx-ghost';
            break;
        default:
            icon.className = 'bx bx-sun';
    }
}

// Initialize theme
updateThemeIcon(savedTheme);

// Toggle theme menu
themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('active');
});

// Close theme menu when clicking outside
document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target) && !themeMenu.contains(e.target)) {
        themeMenu.classList.remove('active');
    }
});

// Handle theme selection
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedTheme = option.getAttribute('data-theme');
        
        // Update active state
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Apply theme
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('portfolio-theme', selectedTheme);
        updateThemeIcon(selectedTheme);
        
        // Close menu
        themeMenu.classList.remove('active');
        
        // Animate theme change
        gsap.fromTo('body', { opacity: 0.8 }, { opacity: 1, duration: 0.3 });
    });
});

// Set active theme option on load
themeOptions.forEach(option => {
    if (option.getAttribute('data-theme') === savedTheme) {
        option.classList.add('active');
    }
});

// Seasonal theme auto-switch (can be enabled/disabled)
function checkSeasonalTheme() {
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth() returns 0-11
    const day = now.getDate();
    
    // Christmas: Dec 20 - Jan 5
    if ((month === 12 && day >= 20) || (month === 1 && day <= 5)) {
        if (savedTheme === 'default') {
            document.documentElement.setAttribute('data-theme', 'holiday');
        }
    }
    // Halloween: Oct 25 - Nov 5
    else if ((month === 10 && day >= 25) || (month === 11 && day <= 5)) {
        if (savedTheme === 'default') {
            document.documentElement.setAttribute('data-theme', 'halloween');
        }
    }
}

// Check for seasonal themes on load
checkSeasonalTheme();
const certModal = document.getElementById('cert-modal');
const certImage = document.getElementById('cert-image');
const certLoading = document.getElementById('cert-loading');
const certModalClose = document.querySelector('.cert-modal-close');

// Open modal when certificate button is clicked
document.querySelectorAll('.cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const certSrc = 'assets/' + btn.getAttribute('data-cert');
        certImage.src = '';
        certImage.style.display = 'none';
        certLoading.style.display = 'block';
        certModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Animate modal in
        gsap.fromTo(certModal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo('.cert-modal-content', { scale: 0.8 }, { scale: 1, duration: 0.3 });
        
        // Load image
        certImage.src = certSrc;
        certImage.onload = () => {
            certLoading.style.display = 'none';
            certImage.style.display = 'block';
            gsap.fromTo(certImage, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });
        };
    });
});

// Close modal when close button is clicked
certModalClose.addEventListener('click', () => {
    gsap.to(certModal, { opacity: 0, duration: 0.3, onComplete: () => {
        certModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }});
});

// Close modal when clicking outside the image
certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
        gsap.to(certModal, { opacity: 0, duration: 0.3, onComplete: () => {
            certModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }});
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.style.display === 'block') {
        gsap.to(certModal, { opacity: 0, duration: 0.3, onComplete: () => {
            certModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }});
    }
});
