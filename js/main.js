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
    
    // Mobile debug overlay - triple tap to show
    let tapCount = 0;
    let tapTimer = null;
    document.addEventListener('touchend', () => {
        tapCount++;
        clearTimeout(tapTimer);
        
        if (tapCount === 3) {
            showDebugInfo();
            tapCount = 0;
        } else {
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 500);
        }
    });
    
    function showDebugInfo() {
        const c = document.getElementById('gameCanvas');
        const rm = window.game?.responsiveManager;
        const debugDiv = document.getElementById('debugInfo');
        const debugText = document.getElementById('debugText');
        
        if (!debugDiv) return;
        
        let info = '';
        info += `Window: ${window.innerWidth}x${window.innerHeight}\n`;
        if (window.visualViewport) {
            info += `Visual: ${Math.round(window.visualViewport.width)}x${Math.round(window.visualViewport.height)}\n`;
        }
        info += `Canvas: ${c.style.width} x ${c.style.height}\n`;
        info += `Internal: ${c.width}x${c.height}\n`;
        info += `Scale: ${rm?.scale ? (rm.scale * 100).toFixed(0) + '%' : 'N/A'}\n`;
        info += `Mobile: ${window.innerWidth <= 768 ? 'Yes' : 'No'}\n`;
        info += `Orient: ${window.matchMedia('(orientation: landscape)').matches ? 'Land' : 'Port'}\n`;
        
        debugText.innerHTML = info.replace(/\n/g, '<br>');
        debugDiv.style.display = 'block';
        
        console.log('Debug info shown. Tap Close to hide.');
    }
    
    window.showDebugInfo = showDebugInfo;
});

