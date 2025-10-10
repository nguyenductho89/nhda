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
});

