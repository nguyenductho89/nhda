// Mobile Browser Optimizer - Aggressive viewport handling
class MobileOptimizer {
    constructor() {
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.init();
    }
    
    init() {
        if (!this.isMobile) return;
        
        // Force viewport height update
        this.updateViewportHeight();
        
        // Listen for all possible resize events
        window.addEventListener('resize', () => this.updateViewportHeight());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.updateViewportHeight(), 100);
            setTimeout(() => this.updateViewportHeight(), 300);
            setTimeout(() => this.updateViewportHeight(), 500);
        });
        
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => this.updateViewportHeight());
            window.visualViewport.addEventListener('scroll', () => this.updateViewportHeight());
        }
        
        // Handle address bar hide/show
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateViewportHeight();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    updateViewportHeight() {
        // Get the real viewport height
        let vh = window.innerHeight;
        
        if (window.visualViewport) {
            vh = window.visualViewport.height;
        }
        
        // Set CSS variable for use in stylesheets
        document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
        
        // Force body height
        document.body.style.height = vh + 'px';
        
        console.log(`📱 Viewport updated: ${vh}px (innerHeight: ${window.innerHeight})`);
    }
    
    getViewportHeight() {
        if (window.visualViewport) {
            return window.visualViewport.height;
        }
        return window.innerHeight;
    }
}

// Initialize immediately
window.mobileOptimizer = new MobileOptimizer();

