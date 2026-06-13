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
 */
function displayFeaturedVideos() {
    const featuredContainer = document.getElementById('featured-videos');
    if (!featuredContainer) return;
    
    // Récupère les vidéos de la page vidéos (simulation)
    // Dans une version plus avancée, on pourrait les récupérer via une API ou un fichier JSON
    const featuredVideos = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Ma première interprétation',
            description: 'Une reprise d\'un classique du blues à l\'harmonica.'
        },
        {
            id: 'dQw4w9WgXcQ',
            title: 'Composition originale',
            description: 'Une pièce que j\'ai écrite pour rendre hommage à l\'harmonica.'
        }
    ];
    
    // Affiche les vidéos
    featuredVideos.forEach(video => {
        const videoCard = document.createElement('article');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-embed">
                <iframe src="https://www.youtube.com/embed/${video.id}" 
                        title="${video.title}" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>
        `;
        featuredContainer.appendChild(videoCard);
    });
    
    // Si on veut garder le placeholder, on peut supprimer cette fonction
    // ou la modifier pour afficher un message différent
}

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
