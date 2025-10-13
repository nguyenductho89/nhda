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
        
        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => this.resize());
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
        const viewportHeight = window.innerHeight;
        const isMobile = window.innerWidth <= 768;
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        
        // Calculate available space based on device and orientation
        let availableWidth, availableHeight;
        
        if (isMobile && isLandscape) {
            // Mobile landscape - calculate precisely
            const gameInfo = document.querySelector('.game-info');
            const mobileControls = document.querySelector('.mobile-controls');
            
            const headerHeight = gameInfo ? gameInfo.offsetHeight : 80;
            const controlsHeight = mobileControls ? mobileControls.offsetHeight : 80;
            const containerPadding = 20; // padding from container
            const extraMargin = 20; // extra breathing room
            
            availableWidth = containerWidth - containerPadding;
            availableHeight = viewportHeight - headerHeight - controlsHeight - containerPadding - extraMargin;
            
            // Ensure minimum playable size
            availableHeight = Math.max(availableHeight, 200);
            availableWidth = Math.max(availableWidth, 400);
            
            console.log(`📐 Available space: ${availableWidth}x${availableHeight} (header: ${headerHeight}, controls: ${controlsHeight})`);
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
        return window.innerWidth <= 768;
    }
    
    isLandscape() {
        return window.matchMedia('(orientation: landscape)').matches;
    }
}

