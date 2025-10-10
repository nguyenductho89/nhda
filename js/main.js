// Main entry point
document.addEventListener('DOMContentLoaded', () => {
    // Create and start game
    const game = new Game('gameCanvas');
    game.start();
    
    console.log('🎮 Super Mario Game Started!');
    console.log('Controls:');
    console.log('← → : Move');
    console.log('Space: Jump');
    console.log('R: Restart');
});

