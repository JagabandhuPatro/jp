/**
 * Navigation functionality
 * Handles mobile menu, active links, and scroll behavior
 */

const Navigation = {
    nav: null,
    menuToggle: null,
    navMenu: null,
    navLinks: null,
    sections: null,

    /**
     * Initialize navigation
     */
    init() {
        // Wait for components to load
        document.addEventListener('componentsLoaded', () => {
            this.cacheElements();
            this.bindEvents();
            this.setCurrentYear();
        });
    },

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.nav = document.querySelector('nav');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        this.sections = document.querySelectorAll('section[id]');
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Mobile menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Handle scroll events
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
            this.highlightActiveSection();
        }, 100));

        // Handle resize events
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
    },

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.menuToggle.setAttribute(
            'aria-expanded',
            this.navMenu.classList.contains('active')
        );
    },

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
    },

    /**
     * Handle navigation link clicks
     */
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = this.nav.offsetHeight;
            Utils.smoothScrollTo(targetSection, navHeight);
            this.closeMobileMenu();
        }
    },

    /**
     * Handle clicks outside mobile menu
     */
    handleOutsideClick(e) {
        if (
            this.navMenu.classList.contains('active') &&
            !this.navMenu.contains(e.target) &&
            !this.menuToggle.contains(e.target)
        ) {
            this.closeMobileMenu();
        }
    },

    /**
     * Handle scroll events
     */
    handleScroll() {
        const scrollPosition = Utils.getScrollPosition();

        // Add/remove scrolled class to nav
        if (scrollPosition > 100) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    },

    /**
     * Highlight active section in navigation
     */
    highlightActiveSection() {
        const scrollPosition = Utils.getScrollPosition();
        const navHeight = this.nav.offsetHeight;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },

    /**
     * Handle window resize
     */
    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    },

    /**
     * Set current year in footer
     */
    setCurrentYear() {
        Utils.setCurrentYear();
    }
};

// Initialize navigation when DOM is ready
Navigation.init();
