// Main entry point
document.addEventListener('DOMContentLoaded', () => {
    // Create and start game
    window.game = new Game('gameCanvas');
    window.game.start();
    
    console.log('💕 Wedding Invitation Game Started! 💕');
    console.log('Controls:');
    console.log('← → : Move');
    console.log('Space: Jump');
    console.log('R: Restart');
    console.log('Giúp chú rể vượt qua thử thách để đến với cô dâu! 💑');
    
    // Log initial canvas info
    const canvas = document.getElementById('gameCanvas');
    console.log(`📐 Initial Canvas:`);
    console.log(`   Display: ${canvas.style.width} x ${canvas.style.height}`);
    console.log(`   Internal: ${canvas.width} x ${canvas.height}`);
    console.log(`   Viewport: ${window.innerWidth} x ${window.innerHeight}`);
    
    // Log visualViewport info (important for mobile)
    if (window.visualViewport) {
        console.log(`   Visual Viewport: ${window.visualViewport.width} x ${window.visualViewport.height}`);
        console.log(`   Visual Viewport Scale: ${window.visualViewport.scale}`);
    }
    
    console.log(`   Device: ${window.innerWidth <= 768 ? 'Mobile' : 'Desktop'}`);
    console.log(`   Orientation: ${window.matchMedia('(orientation: landscape)').matches ? 'Landscape' : 'Portrait'}`);
    console.log(`   User Agent: ${navigator.userAgent.includes('iPhone') ? 'iPhone' : navigator.userAgent.includes('Android') ? 'Android' : 'Desktop'}`);
    
    // Add helpful message for mobile users
    if (window.innerWidth <= 768 && !window.matchMedia('(orientation: landscape)').matches) {
        console.log('📱 Tip: Xoay ngang điện thoại để chơi game!');
    }
    
    // Debug helper for mobile
    window.debugCanvas = function() {
        const c = document.getElementById('gameCanvas');
        const rm = window.game?.responsiveManager;
        console.log('=== DEBUG INFO ===');
        console.log('Canvas display:', c.style.width, c.style.height);
        console.log('Canvas internal:', c.width, c.height);
        console.log('Window:', window.innerWidth, window.innerHeight);
        if (window.visualViewport) {
            console.log('VisualViewport:', window.visualViewport.width, window.visualViewport.height);
        }
        console.log('Scale:', rm?.scale);
        console.log('Container:', c.parentElement.getBoundingClientRect());
    };
});

