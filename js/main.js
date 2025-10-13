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
    console.log(`   Device: ${window.innerWidth <= 768 ? 'Mobile' : 'Desktop'}`);
    console.log(`   Orientation: ${window.matchMedia('(orientation: landscape)').matches ? 'Landscape' : 'Portrait'}`);
    
    // Add helpful message for mobile users
    if (window.innerWidth <= 768 && !window.matchMedia('(orientation: landscape)').matches) {
        console.log('📱 Tip: Xoay ngang điện thoại để chơi game!');
    }
});

