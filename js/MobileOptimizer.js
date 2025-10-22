// Mobile Browser Optimizer - Aggressive viewport handling
class MobileOptimizer {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isChrome = /Chrome/i.test(navigator.userAgent);
        this.isFullscreen = false;
        this.init();
    }
    
    detectMobile() {
        // Check user agent first
        const userAgentMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        // Check screen size and touch capability - be more aggressive
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        
        // Mobile if any dimension is mobile-sized
        const screenMobile = screenWidth <= 1024 || screenHeight <= 1024;
        const innerMobile = innerWidth <= 1024 || innerHeight <= 1024;
        
        // Touch capability
        const touchMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Additional mobile indicators
        const isMobileDevice = userAgentMobile || 
                              (screenMobile && touchMobile) || 
                              (innerMobile && touchMobile) ||
                              (screenWidth <= 768 || screenHeight <= 768) ||
                              (innerWidth <= 768 || innerHeight <= 768);
        
        console.log(`📱 Mobile detection: ${isMobileDevice} (UA: ${userAgentMobile}, Screen: ${screenWidth}x${screenHeight}, Inner: ${innerWidth}x${innerHeight}, Touch: ${touchMobile})`);
        
        return isMobileDevice;
    }
    
    updateMobileDetection() {
        this.isMobile = this.detectMobile();
        console.log(`📱 Mobile detection updated: ${this.isMobile} (UA: ${/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)}, Screen: ${window.screen.width}x${window.screen.height}, Touch: ${'ontouchstart' in window})`);
    }
    
    init() {
        if (!this.isMobile) return;
        
        // Hide mobile browser UI immediately
        this.hideBrowserUI();
        
        // Force viewport height update
        this.updateViewportHeight();
        
        // Listen for all possible resize events
        window.addEventListener('resize', () => {
            this.updateMobileDetection();
            this.updateViewportHeight();
        });
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.updateMobileDetection(), 50);
            setTimeout(() => this.hideBrowserUI(), 100);
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
        
        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => {
            this.isFullscreen = !!document.fullscreenElement;
            this.updateViewportHeight();
        });
        
        // Additional mobile UI hiding
        this.setupMobileUIHiding();
        
        // Inject aggressive CSS to hide browser UI
        this.injectMobileCSS();
    }
    
    updateViewportHeight() {
        // Get the real viewport height
        let vh = window.innerHeight;
        let visualVh = vh;
        
        if (window.visualViewport) {
            visualVh = window.visualViewport.height;
        }
        
        // Calculate navigation bar height
        const navbarHeight = Math.max(0, window.innerHeight - visualVh);
        
        // Set CSS variables for use in stylesheets
        document.documentElement.style.setProperty('--vh', `${visualVh * 0.01}px`);
        document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
        document.documentElement.style.setProperty('--available-height', `${visualVh}px`);
        
        // Force body height to visual viewport height
        document.body.style.height = visualVh + 'px';
        
        console.log(`📱 Viewport updated: innerHeight=${window.innerHeight}px, visualHeight=${visualVh}px, navbarHeight=${navbarHeight}px`);
    }
    
    getViewportHeight() {
        if (window.visualViewport) {
            return window.visualViewport.height;
        }
        return window.innerHeight;
    }
    
    getNavbarHeight() {
        if (window.visualViewport) {
            return window.innerHeight - window.visualViewport.height;
        }
        return 0;
    }
    
    
    setupMobileUIHiding() {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Prevent context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        // Prevent text selection
        document.addEventListener('selectstart', (e) => {
            e.preventDefault();
        });
        
        // Prevent pull-to-refresh
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        console.log('📱 Mobile UI hiding setup complete');
    }
    
    injectMobileCSS() {
        // Inject aggressive CSS to force hide browser UI
        const style = document.createElement('style');
        style.id = 'mobile-ui-hide';
        style.textContent = `
            /* Force hide mobile browser UI */
            html, body {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                height: calc(var(--vh, 1vh) * 100) !important;
                overflow: hidden !important;
                overscroll-behavior: none !important;
                -webkit-overflow-scrolling: touch !important;
                -webkit-touch-callout: none !important;
                -webkit-user-select: none !important;
                user-select: none !important;
            }
            
            /* Hide address bar on mobile */
            @media (max-width: 768px) {
                html, body {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    height: calc(var(--vh, 1vh) * 100) !important;
                    overflow: hidden !important;
                }
            }
            
            /* Landscape specific */
            @media (orientation: landscape) and (max-width: 768px) {
                html, body {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    height: calc(var(--vh, 1vh) * 100) !important;
                    overflow: hidden !important;
                    overscroll-behavior: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('📱 Injected aggressive mobile CSS');
    }
    
    hideBrowserUI() {
        // Multiple aggressive methods to hide browser UI
        try {
            // Method 1: Scroll to hide address bar
            window.scrollTo(0, 1);
            
            // Method 2: Set body height to screen height
            document.body.style.height = window.screen.height + 'px';
            document.documentElement.style.height = window.screen.height + 'px';
            
            // Method 3: Force viewport update
            setTimeout(() => {
                window.scrollTo(0, 0);
                this.updateViewportHeight();
                
                // Method 4: Try to trigger resize
                window.dispatchEvent(new Event('resize'));
                
                // Method 5: Additional scroll attempts
                window.scrollTo(0, 1);
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 50);
            }, 100);
            
            // Method 6: Continuous scroll attempts
            let scrollAttempts = 0;
            const scrollInterval = setInterval(() => {
                if (scrollAttempts >= 10) {
                    clearInterval(scrollInterval);
                    return;
                }
                
                window.scrollTo(0, 1);
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 50);
                
                scrollAttempts++;
            }, 200);
            
            // Method 7: Force CSS properties
            document.body.style.position = 'fixed';
            document.body.style.top = '0';
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.bottom = '0';
            document.body.style.width = '100vw';
            document.body.style.height = '100vh';
            document.body.style.height = 'calc(var(--vh, 1vh) * 100)';
            
            console.log('📱 Attempted to hide browser UI with aggressive methods');
        } catch (error) {
            console.warn('Error hiding browser UI:', error);
        }
    }
}

// Initialize immediately
window.mobileOptimizer = new MobileOptimizer();

