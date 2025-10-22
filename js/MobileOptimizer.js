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
        
        // Check screen size and touch capability
        const screenMobile = window.screen.width <= 768 || window.screen.height <= 768;
        const touchMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Check if it's a mobile device based on multiple factors
        return userAgentMobile || (screenMobile && touchMobile);
    }
    
    updateMobileDetection() {
        this.isMobile = this.detectMobile();
        console.log(`📱 Mobile detection updated: ${this.isMobile} (UA: ${/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)}, Screen: ${window.screen.width}x${window.screen.height}, Touch: ${'ontouchstart' in window})`);
    }
    
    init() {
        if (!this.isMobile) return;
        
        // Add fullscreen button for mobile Chrome
        this.addFullscreenButton();
        
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
    
    addFullscreenButton() {
        // Only add fullscreen button for mobile Chrome
        if (!this.isMobile || !this.isChrome) return;
        
        // Create fullscreen button
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.id = 'fullscreenBtn';
        fullscreenBtn.innerHTML = '⛶<br><small>Toàn màn hình</small>';
        fullscreenBtn.className = 'fullscreen-btn';
        
        // Add styles
        fullscreenBtn.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #FF69B4, #FFB6C1);
            border: 2px solid #C71585;
            border-radius: 10px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 3px 10px rgba(255, 105, 180, 0.3);
            transition: all 0.2s;
            touch-action: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        `;
        
        // Add hover/active effects
        fullscreenBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            fullscreenBtn.style.transform = 'scale(0.95)';
            fullscreenBtn.style.background = 'linear-gradient(135deg, #FF1493, #FF69B4)';
        });
        
        fullscreenBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            fullscreenBtn.style.transform = 'scale(1)';
            fullscreenBtn.style.background = 'linear-gradient(135deg, #FF69B4, #FFB6C1)';
        });
        
        // Add click handler
        fullscreenBtn.addEventListener('click', () => {
            this.toggleFullscreen();
        });
        
        // Add to body
        document.body.appendChild(fullscreenBtn);
        
        // Show the button
        fullscreenBtn.style.display = 'block';
        
        console.log('📱 Fullscreen button added for mobile Chrome');
    }
    
    async toggleFullscreen() {
        try {
            if (!this.isFullscreen) {
                // Enter fullscreen
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    await document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    await document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    await document.documentElement.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                }
            }
        } catch (error) {
            console.warn('Fullscreen error:', error);
            // Fallback: try to hide browser UI by scrolling
            this.hideBrowserUI();
        }
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
    
    hideBrowserUI() {
        // Multiple methods to hide browser UI
        try {
            // Method 1: Scroll to hide address bar
            window.scrollTo(0, 1);
            
            // Method 2: Set body height to screen height
            document.body.style.height = window.screen.height + 'px';
            
            // Method 3: Force viewport update
            setTimeout(() => {
                window.scrollTo(0, 0);
                this.updateViewportHeight();
                
                // Method 4: Try to trigger resize
                window.dispatchEvent(new Event('resize'));
            }, 100);
            
            // Method 5: Additional scroll attempts
            setTimeout(() => {
                window.scrollTo(0, 1);
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 50);
            }, 200);
            
            console.log('📱 Attempted to hide browser UI with multiple methods');
        } catch (error) {
            console.warn('Error hiding browser UI:', error);
        }
    }
}

// Initialize immediately
window.mobileOptimizer = new MobileOptimizer();

