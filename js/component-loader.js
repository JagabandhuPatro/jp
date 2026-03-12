/**
 * Component Loader
 * Loads HTML components dynamically into the page
 */

const ComponentLoader = {
    components: [
        { id: 'navigation-component', path: 'components/navigation.html' },
        { id: 'hero-component', path: 'components/hero.html' },
        { id: 'about-component', path: 'components/about.html' },
        { id: 'skills-component', path: 'components/skills.html' },
        { id: 'experience-component', path: 'components/experience.html' },
        { id: 'education-component', path: 'components/education.html' },
        { id: 'certifications-component', path: 'components/certifications.html' },
        { id: 'projects-component', path: 'components/projects.html' },
        { id: 'contact-component', path: 'components/contact.html' },
        { id: 'footer-component', path: 'components/footer.html' }
    ],

    /**
     * Load a single component
     */
    async loadComponent(id, path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.statusText}`);
            }
            const html = await response.text();
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${id}:`, error);
        }
    },

    /**
     * Load all components
     */
    async loadAll() {
        const loadPromises = this.components.map(component =>
            this.loadComponent(component.id, component.path)
        );
        
        await Promise.all(loadPromises);
        
        // Dispatch custom event when all components are loaded
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    },

    /**
     * Initialize component loading
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadAll());
        } else {
            this.loadAll();
        }
    }
};

// Initialize component loader
ComponentLoader.init();
