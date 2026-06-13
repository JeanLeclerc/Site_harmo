// JavaScript principal pour le site Jean Leclerc - Harmonica

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du site
    initSite();
});

function initSite() {
    // Gestion de la navigation active
    setActiveNavLink();
    
    // Animation au scroll
    initScrollAnimations();
    
    // Si on est sur la page d'accueil, on peut afficher les vidéos en vedette
    if (document.body.contains(document.getElementById('featured-videos'))) {
        displayFeaturedVideos();
    }
    
    // Gestion du menu mobile (si besoin à l'avenir)
    initMobileMenu();
}

/**
 * Met en évidence le lien de navigation actif
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialise les animations au scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.video-card, .story-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Affiche les vidéos en vedette sur la page d'accueil
 * Note: Les vidéos sont maintenant directement dans le HTML, cette fonction est gardée pour compatibilité
 */
function displayFeaturedVideos() {
    // Les vidéos sont maintenant directement intégrées dans le HTML
    // Cette fonction est gardée au cas où tu veux ajouter des vidéos dynamiquement plus tard
    const featuredContainer = document.getElementById('featured-videos');
    if (!featuredContainer) return;
    
    // Si tu veux ajouter des vidéos dynamiquement, tu peux utiliser cette fonction
    // Exemple: addVideoToFeatured('ID_YouTube', 'Titre', 'Description');
}

/**
 * Ajoute une vidéo à la section vedette de la page d'accueil
 */
function addVideoToFeatured(videoId, title, description) {
    const featuredContainer = document.getElementById('featured-videos');
    if (!featuredContainer) return;
    
    const videoCard = document.createElement('article');
    videoCard.className = 'video-card';
    videoCard.innerHTML = `
        <div class="video-embed">
            <iframe src="https://www.youtube.com/embed/${videoId}" 
                    title="${title}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        </div>
        <div class="video-info">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
    featuredContainer.appendChild(videoCard);
}

// Expose la fonction au scope global
window.addVideoToFeatured = addVideoToFeatured;

/**
 * Initialise le menu mobile (pour une future version responsive améliorée)
 */
function initMobileMenu() {
    // Pour l'instant, le menu est géré par CSS
    // On peut ajouter un bouton hamburger plus tard si besoin
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            document.querySelector('nav ul').classList.toggle('mobile-open');
        });
    }
}

/**
 * Fonction utilitaire pour extraire l'ID YouTube d'une URL
 */
function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Fonction pour ajouter dynamiquement une vidéo
 * Peut être appelée depuis la console ou via un formulaire
 */
function addVideo(videoId, title, description) {
    const container = document.getElementById('videos-container') || document.getElementById('featured-videos');
    if (!container) return;
    
    const videoCard = document.createElement('article');
    videoCard.className = 'video-card';
    videoCard.innerHTML = `
        <div class="video-embed">
            <iframe src="https://www.youtube.com/embed/${videoId}" 
                    title="${title}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        </div>
        <div class="video-info">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
    container.appendChild(videoCard);
}

// Expose la fonction addVideo au scope global pour pouvoir l'utiliser depuis la console
window.addVideo = addVideo;
