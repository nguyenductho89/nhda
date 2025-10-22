// Responsive Manager - Handles canvas resizing and scaling
class ResponsiveManager {
    constructor(game) {
        this.game = game;
        this.canvas = game.canvas;
        this.baseWidth = 800;
        this.baseHeight = 400;
        this.scale = 1;
        this.resizeTimeout = null;
        
        // Initial setup
        this.resize();
        
        // Listen for window resize with debouncing
        window.addEventListener('resize', () => this.debouncedResize());
        window.addEventListener('orientationchange', () => {
            // Wait for orientation to settle
            setTimeout(() => this.resize(), 200);
        });
        
        // Listen for visualViewport changes (mobile browser UI)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => this.debouncedResize());
            window.visualViewport.addEventListener('scroll', () => this.debouncedResize());
        }
        
        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => {
            console.log('🖥️ Fullscreen changed:', !!document.fullscreenElement);
            setTimeout(() => this.resize(), 100);
        });
    }
    
    debouncedResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(() => this.resize(), 100);
    }
    
    resize() {
        const container = this.canvas.parentElement;
        if (!container) {
            console.warn('Canvas container not found');
            return;
        }
        
        // Get actual container dimensions
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        
        // Use MobileOptimizer for accurate viewport height (excludes browser UI)
        let viewportHeight;
        let navbarHeight = 0;
        const isFullscreen = !!document.fullscreenElement;
        
        if (isFullscreen) {
            // In fullscreen mode, use screen dimensions
            viewportHeight = window.screen.height;
            navbarHeight = 0;
        } else if (window.mobileOptimizer) {
            viewportHeight = window.mobileOptimizer.getViewportHeight();
            navbarHeight = window.mobileOptimizer.getNavbarHeight();
        } else if (window.visualViewport) {
            viewportHeight = window.visualViewport.height;
            navbarHeight = window.innerHeight - viewportHeight;
        } else {
            viewportHeight = window.innerHeight;
            navbarHeight = 0;
        }
        
        // Use MobileOptimizer for accurate mobile detection
        let isMobile;
        if (window.mobileOptimizer) {
            isMobile = window.mobileOptimizer.isMobile;
        } else {
            // Enhanced fallback detection
            const userAgentMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const screenMobile = window.screen.width <= 1024 || window.screen.height <= 1024;
            const innerMobile = window.innerWidth <= 1024 || window.innerHeight <= 1024;
            const touchMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            isMobile = userAgentMobile || 
                      (screenMobile && touchMobile) || 
                      (innerMobile && touchMobile) ||
                      (window.screen.width <= 768 || window.screen.height <= 768) ||
                      (window.innerWidth <= 768 || window.innerHeight <= 768);
        }
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        
        // Calculate available space based on device and orientation
        let availableWidth, availableHeight;
        
        if (isMobile && isLandscape) {
            // Mobile landscape - maximize space usage with side controls
            const gameInfo = document.querySelector('.game-info');
            
            const headerHeight = gameInfo ? gameInfo.offsetHeight : 0;
            
            // Account for navbar height and side controls
            const navbarCompensation = navbarHeight;
            const sideControlsWidth = 140; // Space for side controls (60px + gap + margin)
            
            // Minimal padding for landscape
            const verticalPadding = 2; // Reduced padding
            const horizontalPadding = sideControlsWidth; // Reserve space for side controls
            
            availableWidth = containerWidth - horizontalPadding;
            availableHeight = viewportHeight - headerHeight - verticalPadding - navbarCompensation;
            
            // Be very aggressive with space usage in landscape
            availableHeight = Math.max(availableHeight, 200);
            availableWidth = Math.max(availableWidth, 400);
            
            console.log(`📐 Mobile landscape: viewport=${viewportHeight}px, navbar=${navbarHeight}px, available=${availableHeight}x${availableWidth}px (header=${headerHeight}, sideControls=${sideControlsWidth}px)`);
        } else if (isMobile && !isLandscape) {
            // Mobile portrait - show orientation message
            availableWidth = containerWidth - 40;
            availableHeight = 400;
        } else {
            // Desktop
            availableWidth = Math.min(containerWidth - 50, 800);
            availableHeight = 400;
        }
        
        // Calculate optimal scale maintaining aspect ratio
        const scaleX = availableWidth / this.baseWidth;
        const scaleY = availableHeight / this.baseHeight;
        
        // Use the smaller scale to ensure canvas fits in both dimensions
        let finalScale = Math.min(scaleX, scaleY);
        
        // Apply scale limits
        if (isMobile) {
            finalScale = Math.min(Math.max(finalScale, 0.4), 1.0); // Mobile: 40% to 100%
        } else {
            finalScale = Math.min(Math.max(finalScale, 0.8), 1.2); // Desktop: 80% to 120%
        }
        
        this.scale = finalScale;
        
        // Apply scale to canvas display with rounding to prevent blur
        const displayWidth = Math.round(this.baseWidth * this.scale);
        const displayHeight = Math.round(this.baseHeight * this.scale);
        
        // Set explicit dimensions via inline styles (using setProperty to ensure priority)
        this.canvas.style.setProperty('width', displayWidth + 'px', 'important');
        this.canvas.style.setProperty('height', displayHeight + 'px', 'important');
        
        // Keep internal resolution constant for crisp pixel art
        this.canvas.width = this.baseWidth;
        this.canvas.height = this.baseHeight;
        
        // Center canvas
        this.canvas.style.margin = '0 auto';
        this.canvas.style.display = 'block';
        
        console.log(`🎮 Canvas resized: ${displayWidth}x${displayHeight}px (scale: ${(this.scale * 100).toFixed(0)}%, ${isMobile ? 'mobile' : 'desktop'}, ${isLandscape ? 'landscape' : 'portrait'})`);
    }
    
    getScale() {
        return this.scale;
    }
    
    isMobile() {
        if (window.mobileOptimizer) {
            return window.mobileOptimizer.isMobile;
        }
        // Fallback detection
        return window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    
    isLandscape() {
        return window.matchMedia('(orientation: landscape)').matches;
    }
}

