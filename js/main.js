/**
 * Main Application Entry Point
 * Coordinates all modules and initializes the application
 */

const App = {
    /**
     * Initialize the application
     */
    init() {
        console.log('Portfolio application initializing...');

        // Listen for components loaded event
        document.addEventListener('componentsLoaded', () => {
            console.log('All components loaded successfully');
            this.onComponentsLoaded();
        });

        // Initialize error handling
        this.initErrorHandling();

        // Initialize performance monitoring
        this.initPerformanceMonitoring();
    },

    /**
     * Called when all components are loaded
     */
    onComponentsLoaded() {
        // Set current year
        Utils.setCurrentYear();

        // Initialize lazy loading for images
        Utils.lazyLoadImages();

        // Add loaded class to body
        document.body.classList.add('loaded');

        // Log success
        console.log('Portfolio application ready');
    },

    /**
     * Initialize error handling
     */
    initErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            // You can add error reporting service here
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            // You can add error reporting service here
        });
    },

    /**
     * Initialize performance monitoring
     */
    initPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log(`Page load time: ${pageLoadTime}ms`);
                }, 0);
            });
        }
    },

    /**
     * Utility method to show loading state
     */
    showLoading() {
        document.body.classList.add('loading');
    },

    /**
     * Utility method to hide loading state
     */
    hideLoading() {
        document.body.classList.remove('loading');
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
