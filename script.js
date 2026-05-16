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
const themeToggleBtn = document.getElementById('theme-toggle');
const themeDropdown = document.querySelector('.theme-dropdown');
const themeSelectBtn = document.getElementById('theme-select-btn');
const themeSelectLabel = document.getElementById('theme-select-label');
const themeOptionsList = document.getElementById('theme-options');
const themeOptionButtons = document.querySelectorAll('.theme-option');

// Theme system with persistence
const THEME_KEY = 'portfolio-theme';
const DEFAULT_THEME = 'light';
const VALID_THEMES = ['light', 'dark', 'holiday', 'contrast'];
const THEME_LABELS = {
    light: 'Light',
    dark: 'Dark',
    holiday: 'Holiday',
    contrast: 'High Contrast'
};

function getStoredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return VALID_THEMES.includes(savedTheme) ? savedTheme : DEFAULT_THEME;
}

function updateThemeToggleIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (!icon) return;

    if (theme === 'dark') {
        icon.className = 'bx bx-sun';
    } else {
        icon.className = 'bx bx-moon';
    }
}

function applyTheme(theme, savePreference = true) {
    const targetTheme = VALID_THEMES.includes(theme) ? theme : DEFAULT_THEME;
    document.body.setAttribute('data-theme', targetTheme);
    if (themeSelectLabel) {
        themeSelectLabel.textContent = THEME_LABELS[targetTheme];
    }
    themeOptionButtons.forEach((btn) => {
        const isActive = btn.getAttribute('data-theme-value') === targetTheme;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    updateThemeToggleIcon(targetTheme);

    if (savePreference) {
        localStorage.setItem(THEME_KEY, targetTheme);
    }
}

applyTheme(getStoredTheme(), false);

if (themeSelectBtn && themeDropdown) {
    themeSelectBtn.addEventListener('click', () => {
        const isOpen = themeDropdown.classList.toggle('open');
        themeSelectBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

if (themeOptionsList && themeDropdown && themeSelectBtn) {
    themeOptionsList.addEventListener('click', (event) => {
        const optionBtn = event.target.closest('.theme-option');
        if (!optionBtn) return;
        applyTheme(optionBtn.getAttribute('data-theme-value'));
        themeDropdown.classList.remove('open');
        themeSelectBtn.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (event) => {
        if (!themeDropdown.contains(event.target)) {
            themeDropdown.classList.remove('open');
            themeSelectBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || DEFAULT_THEME;
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}

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

// Smooth button scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        target.scrollIntoView({
            behavior: 'smooth'
        });
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

// --- CERTIFICATE MODAL FUNCTIONALITY ---
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

// --- THE CELESTIAL CODE NEBULA (ULTRA-UNIQUE DATA ART) ---
const GITHUB_USERNAME = "Dheeraj-del-cyber";

const LANG_COLORS = {
    'Python': '#3572A5', 'JavaScript': '#f1e05a', 'HTML': '#e34c26', 
    'CSS': '#563d7c', 'TypeScript': '#3178c6', 'Java': '#b07219', 
    'C++': '#f34b7d', 'default': '#ffffff'
};

const fetchGitHubData = async () => {
    try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userRes.json();
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
        const reposData = await reposRes.json();
        
        document.getElementById('github-username-sidebar').innerText = userData.login.toUpperCase();
        document.getElementById('github-repo-count-sidebar').innerText = userData.public_repos.toString().padStart(2, '0');
        
        const list = document.getElementById('mission-list');
        list.innerHTML = '';
        
        reposData.forEach((repo, index) => {
            const langColor = LANG_COLORS[repo.language] || LANG_COLORS['default'];
            const item = document.createElement('div');
            item.className = 'mission-item';
            item.setAttribute('data-index', index);
            item.innerHTML = `
                <span class="mission-status" style="background: ${langColor}; box-shadow: 0 0 10px ${langColor}"></span>
                <div class="mission-details">
                    <span class="mission-name">${repo.name}</span>
                    <span class="mission-loc" style="color: ${langColor}">${repo.language || 'Code'}</span>
                </div>
            `;
            list.appendChild(item);
        });

        return reposData;
    } catch (err) { return []; }
};

const initWarRoomGlobe = async () => {
    const container = document.getElementById('globe-canvas-container');
    if (!container) return;

    const width = container.clientWidth, height = container.clientHeight;
    const isMobile = window.innerWidth < 768;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 35 : 25; // Push back on mobile to see more

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const repos = await fetchGitHubData();

    // 1. THE PARTICLE GALAXY
    const particleCount = isMobile ? 6000 : 12000; // Optimize for mobile
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        
        const r = isMobile ? 5 : 6;
        positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
        positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = r * Math.cos(phi);

        colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 1.0;
    }

    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const galaxyMat = new THREE.PointsMaterial({ size: isMobile ? 0.08 : 0.05, vertexColors: true, transparent: true, opacity: 0.6 });
    const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
    scene.add(galaxy);

    // 2. REPOSITORY PLANETS
    const planets = [];
    const createGlowTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
    };
    const glowTex = createGlowTexture();

    repos.forEach((repo, index) => {
        const langColor = new THREE.Color(LANG_COLORS[repo.language] || LANG_COLORS['default']);
        const orbitBase = isMobile ? 7 : 9;
        const orbitRadius = orbitBase + (index * (isMobile ? 0.5 : 0.8));
        const speed = 0.0005 + (Math.random() * 0.001);
        
        const group = new THREE.Group();
        group.rotation.x = Math.random() * Math.PI;
        group.rotation.z = Math.random() * Math.PI;
        scene.add(group);

        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(isMobile ? 0.25 : 0.2, 16, 16),
            new THREE.MeshBasicMaterial({ color: langColor })
        );
        planet.position.set(orbitRadius, 0, 0);
        group.add(planet);

        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: langColor, transparent: true, opacity: 0.6, blending: THREE.ScreenBlending }));
        sprite.scale.set(isMobile ? 2 : 1.5, isMobile ? 2 : 1.5, 1);
        planet.add(sprite);

        planet.userData = { name: repo.name, lang: repo.language, color: LANG_COLORS[repo.language] || '#ffffff' };
        planets.push({ group, planet, speed });
    });

    // 3. INTERACTION & TOUCH
    let isDragging = false, prevX = 0, targetRotY = 0, currRotY = 0;
    const tooltip = document.getElementById('globe-tooltip');

    const handleStart = (x) => { isDragging = true; prevX = x; };
    const handleMove = (x, y, clientX, clientY) => {
        if (isDragging) { targetRotY += (x - prevX) * 0.01; prevX = x; }
        
        const rect = container.getBoundingClientRect();
        const mouse = new THREE.Vector2(((clientX - rect.left) / width) * 2 - 1, -((clientY - rect.top) / height) * 2 + 1);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planets.map(p => p.planet));

        if (intersects.length > 0) {
            const p = intersects[0].object;
            tooltip.style.opacity = '1';
            tooltip.style.left = `${clientX - rect.left}px`;
            tooltip.style.top = `${clientY - rect.top}px`;
            tooltip.querySelector('.tooltip-title').innerText = p.userData.name;
            tooltip.querySelector('.tooltip-detail').innerText = p.userData.lang || 'Documentation';
            tooltip.style.borderColor = p.userData.color;
            gsap.to(p.scale, { x: 3, y: 3, z: 3, duration: 0.3 });
        } else {
            tooltip.style.opacity = '0';
            planets.forEach(p => gsap.to(p.planet.scale, { x: 1, y: 1, z: 1, duration: 0.3 }));
        }
    };

    container.addEventListener('mousedown', (e) => handleStart(e.clientX));
    container.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY, e.clientX, e.clientY));
    container.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX));
    container.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY, e.touches[0].clientX, e.touches[0].clientY));
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);

    // Theme Sensing
    const getThemeColors = () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark' || document.body.getAttribute('data-theme') === 'contrast';
        return { particleColor: isDark ? new THREE.Color(0x3b82f6) : new THREE.Color(0x94a3b8), particleOpacity: isDark ? 0.6 : 0.3 };
    };
    const updateThemeStyles = () => {
        const { particleColor, particleOpacity } = getThemeColors();
        galaxyMat.color.copy(particleColor);
        galaxyMat.opacity = particleOpacity;
    };
    new MutationObserver(updateThemeStyles).observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    updateThemeStyles();

    // 4. BUTTON INTERACTION
    document.getElementById('mission-list').addEventListener('click', (e) => {
        const item = e.target.closest('.mission-item');
        if (!item) return;
        const index = parseInt(item.getAttribute('data-index'));
        const p = planets[index];
        if (!p) return;
        planets.forEach(other => { gsap.to(other.planet.scale, { x: 1, y: 1, z: 1, duration: 0.5 }); other.planet.children[0].material.opacity = 0.5; });
        gsap.to(p.planet.scale, { x: 4, y: 4, z: 4, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        p.planet.children[0].material.opacity = 1.0;
        targetRotY = -p.group.rotation.y;
        document.querySelectorAll('.mission-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });

    const animate = () => {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.001;
        if (!isDragging) targetRotY += 0.0008;
        currRotY += (targetRotY - currRotY) * 0.05;
        galaxy.rotation.y = currRotY;
        galaxy.rotation.x = Math.sin(time * 0.2) * 0.1;

        const posAttr = galaxyGeo.attributes.position;
        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
            const factor = 1 + Math.sin(time + i * 0.1) * 0.005;
            posAttr.array[ix] *= factor; posAttr.array[iy] *= factor; posAttr.array[iz] *= factor;
        }
        posAttr.needsUpdate = true;
        planets.forEach(p => p.group.rotation.y += p.speed);
        renderer.render(scene, camera);
    };
    animate();

    let lastWidth = container.clientWidth;
    window.addEventListener('resize', () => {
        const w = container.clientWidth, h = container.clientHeight;
        if (Math.abs(w - lastWidth) < 5) return; // Ignore tiny shifts from scrollbars
        lastWidth = w;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
};

window.addEventListener('load', () => setTimeout(initWarRoomGlobe, 500));
