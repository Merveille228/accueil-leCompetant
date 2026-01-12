const image_acceuil = document.querySelector('.image')
const accueil = document.querySelector('.texte')
const header = document.querySelector('header')
const about = document.querySelector('.texte_about')

window.addEventListener('load', () => {
    accueil.classList.add('show');
    image_acceuil.classList.add('show')
    header.classList.add('show')
    header.style.zIndex="1";
    
    // Déclencher les animations au chargement
    initPageAnimations();
})
window.addEventListener('load', () => {
    about.classList.add('show');
})

// Menu Hamburger
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileOverlay = document.querySelector('.mobile-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

//  ouvrir/fermer le menu
function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

// Toggle menu hamburger
hamburger.addEventListener('click', toggleMenu);

mobileOverlay.addEventListener('click', toggleMenu);
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// les animations au chargement de la page
function initPageAnimations() {
    
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
        }, (index + 1) * 200);
    });
    
    
    const serviceCards = document.querySelectorAll('#services div');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
        }, 500 + (index * 100));
    });
    
    
    const avantageCards = document.querySelectorAll('#avantages div');
    avantageCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
        }, 800 + (index * 100));
    });
    

    const projetImages = document.querySelectorAll('#projets img');
    projetImages.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = '1';
        }, 1000 + (index * 100));
    });
    

    const titres = document.querySelectorAll('.titre-section');
    titres.forEach((titre, index) => {
        setTimeout(() => {
            titre.style.animation = 'fadeInUp 0.6s ease-out forwards';
            titre.style.opacity = '1';
        }, 300 + (index * 150));
    });
}