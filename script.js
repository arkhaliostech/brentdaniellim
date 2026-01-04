// Audio player
let currentAudio = null;
const vinylRecord = document.getElementById('vinylRecord');
const musicPlaylist = document.getElementById('musicPlaylist');
const playlistItems = document.querySelectorAll('.playlist-item');

vinylRecord.addEventListener('click', () => {
    musicPlaylist.classList.toggle('active');
});

playlistItems.forEach(item => {
    item.addEventListener('click', () => {
        const src = item.dataset.src;
        
        if (currentAudio) {
            currentAudio.pause();
            document.querySelectorAll('.playlist-item').forEach(i => i.classList.remove('playing'));
        }

        if (!currentAudio || currentAudio.src !== src) {
            currentAudio = new Audio(src);
            currentAudio.play();
            item.classList.add('playing');
            vinylRecord.classList.add('playing');
            
            currentAudio.onended = () => {
                vinylRecord.classList.remove('playing');
                item.classList.remove('playing');
            };
        } else {
            vinylRecord.classList.remove('playing');
        }
    });
});

// Vinyl record constant spin + scroll animation
const vinylPlayer = document.querySelector('.vinyl-player');
const vinylRecordWidth = 120;
let vinylRotation = 0;

function animateVinyl() {
    vinylRotation += 0.3;
    
    const scrollY = window.scrollY;
    const maxScroll = 500;
    const targetDistance = -120;
    const progress = Math.min(scrollY / maxScroll, 1);
    const translateX = progress * targetDistance;
    
    vinylPlayer.style.transform = `translateX(${translateX}px) rotate(${vinylRotation}deg)`;
    
    requestAnimationFrame(animateVinyl);
}

animateVinyl();

// Sticky navigation
const stickyNav = document.getElementById('stickyNav');
const navLinks = document.querySelectorAll('.nav-link');
const navBrand = document.getElementById('navBrand');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Show sticky nav after scrolling past header
    if (scrollY > window.innerHeight - 100) {
        stickyNav.classList.add('visible');
    } else {
        stickyNav.classList.remove('visible');
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('.column');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
    
    // Update nav brand active state for About section
    if (currentSection === 'about') {
        navBrand.classList.add('active');
    } else {
        navBrand.classList.remove('active');
    }
});

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        const targetPosition = targetSection.offsetTop - 80;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Smooth scroll for nav brand (About section)
navBrand.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    const targetPosition = aboutSection.offsetTop - 80;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});

// Glow effect when hovering over work items
const workItems = document.querySelectorAll('.work-item');

workItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const section = item.dataset.section;
        
        if (section === 'about') {
            if (stickyNav.classList.contains('visible')) {
                navBrand.classList.add('glow');
            }
        } else {
            const navLink = document.querySelector(`.nav-link[data-section="${section}"]`);
            if (navLink && stickyNav.classList.contains('visible')) {
                navLink.classList.add('glow');
            }
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const section = item.dataset.section;
        
        if (section === 'about') {
            navBrand.classList.remove('glow');
        } else {
            const navLink = document.querySelector(`.nav-link[data-section="${section}"]`);
            if (navLink) {
                navLink.classList.remove('glow');
            }
        }
    });
});

// Modal functionality
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

workItems.forEach(item => {
    item.addEventListener('click', () => {
        const media = item.querySelector('.work-item-media').innerHTML;
        const title = item.querySelector('h4')?.textContent || '';
        const year = item.querySelector('.year')?.textContent || '';
        const tags = item.querySelector('.tags')?.textContent || '';
        const description = item.dataset.description || 'No description available.';
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${title}</h2>
                <div class="modal-meta">
                    <span class="modal-year">${year}</span>
                    <span class="modal-tags">${tags}</span>
                </div>
            </div>
            <div class="modal-media">${media}</div>
            <p class="modal-description">${description}</p>
        `;
        modal.classList.add('active');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Close playlist when clicking outside
document.addEventListener('click', (e) => {
    if (!vinylRecord.contains(e.target) && !musicPlaylist.contains(e.target)) {
        musicPlaylist.classList.remove('active');
    }
});