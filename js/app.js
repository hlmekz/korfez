/**
 * KA Framework - Mobile Logic
 * Developed by: KA Development Team
 * @version 2025.1.0
 */

// Körfez.biz - Mobile-First JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // ================================================
    // MOBILE HAMBURGER MENU TOGGLE
    // ================================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (mobileMenuToggle && mobileNavMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

            // Toggle aria-expanded
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);

            // Toggle classes
            mobileMenuToggle.classList.toggle('is-active');
            mobileNavMenu.classList.toggle('is-active');
            mobileNavMenu.classList.toggle('is-hidden');

            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Close menu when clicking on a link
        const mobileNavLinks = mobileNavMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.classList.remove('is-active');
                mobileNavMenu.classList.remove('is-active');
                mobileNavMenu.classList.add('is-hidden');
                document.body.style.overflow = '';
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNavMenu.classList.contains('is-active')) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.classList.remove('is-active');
                mobileNavMenu.classList.remove('is-active');
                mobileNavMenu.classList.add('is-hidden');
                document.body.style.overflow = '';
                mobileMenuToggle.focus();
            }
        });
    }

    // ================================================
    // BULMA NAVBAR BURGER (Legacy support)
    // ================================================
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                if ($target) {
                    $target.classList.toggle('is-active');
                }
            });
        });
    }

    // ================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only process if href has more than just "#"
            if (href && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ================================================
    // SEARCH CATEGORY DROPDOWN (Keyboard accessibility)
    // ================================================
    const searchCategorySelects = document.querySelectorAll('.search-category-select');
    searchCategorySelects.forEach(select => {
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                select.click();
            }
        });
    });

    // ================================================
    // RESIZE HANDLER - Reset mobile menu on desktop
    // ================================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reset mobile menu when resizing to desktop
            if (window.innerWidth >= 769) {
                if (mobileMenuToggle && mobileNavMenu) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.classList.remove('is-active');
                    mobileNavMenu.classList.remove('is-active');
                    mobileNavMenu.classList.add('is-hidden');
                    document.body.style.overflow = '';
                }
            }
        }, 250);
    });

    console.log("Körfez.biz - 2025 Mobile-First arayüzü yüklendi.");
});
