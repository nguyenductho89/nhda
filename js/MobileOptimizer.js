// Mobile Browser Optimizer - Aggressive viewport handling
class MobileOptimizer {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isChrome = /Chrome/i.test(navigator.userAgent);
        this.isFullscreen = false;
        this.init();
    }
    
    detectMobile() {
        // Check user agent first - be more comprehensive
        const userAgentMobile = /iPhone|iPad|iPod|Android|Mobile|Tablet|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Check screen size and touch capability - be more aggressive
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        
        // Mobile if any dimension is mobile-sized (lowered thresholds)
        const screenMobile = screenWidth <= 1200 || screenHeight <= 1200;
        const innerMobile = innerWidth <= 1200 || innerHeight <= 1200;
        
        // Touch capability - more comprehensive check
        const touchMobile = 'ontouchstart' in window || 
                           navigator.maxTouchPoints > 0 || 
                           window.DocumentTouch && document instanceof window.DocumentTouch;
        
        // Additional mobile indicators
        const isMobileDevice = userAgentMobile || 
                              (screenMobile && touchMobile) || 
                              (innerMobile && touchMobile) ||
                              (screenWidth <= 900 || screenHeight <= 900) ||
                              (innerWidth <= 900 || innerHeight <= 900) ||
                              // Force mobile if touch and reasonable size
                              (touchMobile && (screenWidth <= 1400 || screenHeight <= 1400)) ||
                              (touchMobile && (innerWidth <= 1400 || innerHeight <= 1400));
        
        console.log(`📱 Mobile detection: ${isMobileDevice} (UA: ${userAgentMobile}, Screen: ${screenWidth}x${screenHeight}, Inner: ${innerWidth}x${innerHeight}, Touch: ${touchMobile})`);
        
        return isMobileDevice;
    }
    
    updateMobileDetection() {
        this.isMobile = this.detectMobile();
        console.log(`📱 Mobile detection updated: ${this.isMobile} (UA: ${/iPhone|iPad|iPod|Android|Mobile|Tablet/i.test(navigator.userAgent)}, Screen: ${window.screen.width}x${window.screen.height}, Touch: ${'ontouchstart' in window})`);
    }
    
    // Force mobile mode for testing or specific cases
    forceMobileMode(force = true) {
        this.isMobile = force;
        console.log(`📱 Mobile mode ${force ? 'forced ON' : 'forced OFF'}`);
    }
    
    // Debug function to test mobile detection
    debugMobileDetection() {
        const userAgent = navigator.userAgent;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        const touchSupport = 'ontouchstart' in window;
        const maxTouchPoints = navigator.maxTouchPoints;
        const documentTouch = window.DocumentTouch && document instanceof window.DocumentTouch;
        
        console.log('🔍 Mobile Detection Debug:');
        console.log(`  User Agent: ${userAgent}`);
        console.log(`  Screen: ${screenWidth}x${screenHeight}`);
        console.log(`  Inner: ${innerWidth}x${innerHeight}`);
        console.log(`  Touch Support: ${touchSupport}`);
        console.log(`  Max Touch Points: ${maxTouchPoints}`);
        console.log(`  Document Touch: ${documentTouch}`);
        console.log(`  Current Detection: ${this.isMobile}`);
        
        return {
            userAgent,
            screenWidth,
            screenHeight,
            innerWidth,
            innerHeight,
            touchSupport,
            maxTouchPoints,
            documentTouch,
            isMobile: this.isMobile
        };
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
        
        // Expose debug functions globally for testing
        window.debugMobile = () => this.debugMobileDetection();
        window.forceMobile = (force = true) => this.forceMobileMode(force);
    }
    
    updateViewportHeight() {
        // Get the real viewport height
        let vh = window.innerHeight;
        let visualVh = vh;
        
        if (window.visualViewport) {
            visualVh = window.visualViewport.height;
        }
        
        // Calculate navigation bar height
        let navbarHeight = Math.max(0, window.innerHeight - visualVh);
        
        // Add extra compensation for landscape mode where navbar persists
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        if (isLandscape && this.isMobile) {
            // In landscape, mobile browsers often keep navbar visible
            // Add extra 30-50px compensation for persistent navigation bars
            const extraCompensation = 40;
            navbarHeight = Math.max(navbarHeight, extraCompensation);
            console.log(`📱 Landscape mode: adding ${extraCompensation}px extra navbar compensation`);
        }
        
        // Set CSS variables for use in stylesheets
        document.documentElement.style.setProperty('--vh', `${visualVh * 0.01}px`);
        document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
        document.documentElement.style.setProperty('--available-height', `${visualVh}px`);
        
        // Force body height to visual viewport height
        document.body.style.height = visualVh + 'px';
        
        console.log(`📱 Viewport updated: innerHeight=${window.innerHeight}px, visualHeight=${visualVh}px, navbarHeight=${navbarHeight}px, landscape=${isLandscape}`);
    }
    
    getViewportHeight() {
        if (window.visualViewport) {
            return window.visualViewport.height;
        }
        return window.innerHeight;
    }
    
    getNavbarHeight() {
        let navbarHeight = 0;
        if (window.visualViewport) {
            navbarHeight = window.innerHeight - window.visualViewport.height;
        }
        
        // Add extra compensation for landscape mode
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        if (isLandscape && this.isMobile) {
            const extraCompensation = 40;
            navbarHeight = Math.max(navbarHeight, extraCompensation);
        }
        
        return navbarHeight;
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

