// Cycling Images on Top-Left Icon
const cyclingImage = document.getElementById('cycling-image');

const images = [
  'icon_pics/icon_1.png',
  'icon_pics/icon_2.png',
  'icon_pics/icon_3.jpeg',
  'icon_pics/icon_4.png',
  'icon_pics/icon_5.png'
];

let lastIndex = -1;

cyclingImage.addEventListener('click', (e) => {
  // ---- RANDOM IMAGE ----
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * images.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;
  cyclingImage.src = images[randomIndex];

  // ---- PULSE ANIMATION ----
  cyclingImage.style.animation = 'pulse 0.4s';
  setTimeout(() => cyclingImage.style.animation = '', 400);

  // ---- PARTICLE BURST ----
  createParticles(e.clientX, e.clientY);
});

function createParticles(x, y) {
  const symbols = ['✨', '⭐', '💫', '✦', '✧']; // can change later
  const count = 18;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 20;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);

    document.body.appendChild(particle);

    // cleanup
    setTimeout(() => particle.remove(), 700);
  }
}


// Spinning Disc Modal
const disc = document.getElementById('disc');
const musicModal = document.getElementById('music-modal');
const closeMusic = musicModal.querySelector('.close');

disc.addEventListener('click', () => {
    musicModal.style.display = 'block';
});

closeMusic.addEventListener('click', () => {
    musicModal.style.display = 'none';
});

// Box Hover and Click
const boxes = document.querySelectorAll('.box');
const boxModal = document.getElementById('box-modal');
const boxDetails = document.getElementById('box-details');
const closeBox = boxModal.querySelector('.close');

boxes.forEach(box => {
    const media = box.querySelector('.media');
    if (media.tagName === 'VIDEO') {
        box.addEventListener('mouseenter', () => media.play());
        box.addEventListener('mouseleave', () => media.pause());
    }

    box.addEventListener('click', () => {
        boxDetails.innerHTML = `<h2>${box.querySelector('h3').textContent}</h2><p>${box.dataset.content}</p>`;
        boxModal.style.display = 'block';
    });
});

closeBox.addEventListener('click', () => {
    boxModal.style.display = 'none';
});

// Close modals on outside click
window.addEventListener('click', (event) => {
    if (event.target === musicModal) musicModal.style.display = 'none';
    if (event.target === boxModal) boxModal.style.display = 'none';
});