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
            start: 'top 85%'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
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

    // Function to attempt playing audio
    const playAudio = () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                // Audio is playing successfully, we can remove the interaction listeners
                document.removeEventListener('click', playAudio);
                document.removeEventListener('keydown', playAudio);
                document.removeEventListener('scroll', playAudio);
                document.removeEventListener('touchstart', playAudio);
            }).catch((err) => {
                // Autoplay blocked, wait for next user interaction
            });
        }
    };

    // Try to play immediately on load
    playAudio();

    // Listen to user interactions to bypass autoplay policy
    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
    document.addEventListener('scroll', playAudio);
    document.addEventListener('touchstart', playAudio);

    // Mute button logic
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', (e) => {
            // Toggle mute
            bgMusic.muted = !bgMusic.muted;
            
            // Update icon
            const icon = muteBtn.querySelector('i');
            if (bgMusic.muted) {
                icon.className = 'bx bx-volume-mute';
            } else {
                icon.className = 'bx bx-volume-full';
                // Try playing if it was paused and user un-muted it
                if (bgMusic.paused) {
                    playAudio();
                }
            }
        });
    }
}
