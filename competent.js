// Sélection des éléments
const image_accueil = document.querySelector('.image');
const texte_accueil = document.querySelector('.texte');
const header = document.querySelector('header');
const texte_about = document.querySelector('.texte_about');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileOverlay = document.querySelector('.mobile-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTop');

// ========== MODE SOMBRE ==========
// Vérifier si un thème est sauvegardé
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Toggle du thème
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Sauvegarder la préférence
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// ========== ANIMATIONS AU CHARGEMENT ==========
window.addEventListener('load', () => {
    // Afficher le header
    setTimeout(() => {
        header.classList.add('show');
        header.style.transform = 'translateY(0)';
    }, 100);
    
    // Afficher le texte de l'accueil
    setTimeout(() => {
        texte_accueil.classList.add('show');
    }, 400);
    
    // Afficher l'image de l'accueil
    setTimeout(() => {
        image_accueil.classList.add('show');
    }, 600);
});

// ========== OBSERVER POUR ANIMATIONS AU SCROLL ==========
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observer les titres de section
const titres = document.querySelectorAll('.titre-section');
titres.forEach(titre => observer.observe(titre));

// Observer la section About
if (texte_about) observer.observe(texte_about);

// Observer les cards de services
const serviceCards = document.querySelectorAll('#services div');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observer les cards d'avantages
const avantageCards = document.querySelectorAll('#avantages div');
avantageCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
});

// Observer les images de projets
const projetImages = document.querySelectorAll('#projets img');
projetImages.forEach((img, index) => {
    img.style.transitionDelay = `${index * 0.1}s`;
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scale-in');
            }
        });
    }, observerOptions);
    imgObserver.observe(img);
});

// ========== STATISTIQUES ANIMÉES ==========
const statCards = document.querySelectorAll('.stat-card');
let statsAnimated = false;

const animateStats = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            
            statCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                    
                    const numberElement = card.querySelector('.stat-number');
                    const target = parseInt(numberElement.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 50;
                    
                    const updateNumber = () => {
                        current += increment;
                        if (current < target) {
                            numberElement.textContent = Math.floor(current);
                            requestAnimationFrame(updateNumber);
                        } else {
                            numberElement.textContent = target;
                        }
                    };
                    
                    updateNumber();
                }, index * 150);
            });
        }
    });
};

const statsSection = document.getElementById('stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(animateStats, observerOptions);
    statsObserver.observe(statsSection);
}

// ========== TÉMOIGNAGES ==========
const temoignageCards = document.querySelectorAll('.temoignage-card');
temoignageCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
});

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
    
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Fermer les autres items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle l'item actuel
        item.classList.toggle('active');
    });
});

// ========== MENU HAMBURGER ==========
function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

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
        toggleMenu();
    }
});

// ========== SCROLL FLUIDE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== BOUTON RETOUR EN HAUT ==========
window.addEventListener('scroll', () => {
    // Afficher/cacher le bouton
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // Parallaxe léger
    const scrolled = window.pageYOffset;
    if (image_accueil && scrolled < 1000) {
        image_accueil.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});