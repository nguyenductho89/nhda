// Main Game class
class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 800;
        this.canvas.height = 400;
        
        // Game state
        this.gameState = 'playing'; // 'playing', 'won', 'lost'
        this.keys = {};
        
        // Entities
        this.player = null;
        this.enemies = [];
        this.platforms = [];
        this.princess = null;
        
        // Game properties
        this.lastTime = 0;
        this.score = 0;
        this.lives = 3;
        
        // UI elements
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        this.messageElement = document.getElementById('gameMessage');
        
        // Initialize
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Create platforms
        this.platforms = [
            // Ground
            new Platform(0, 350, 800, 50, '#8B4513'),
            // Floating platforms
            new Platform(200, 280, 150, 20, '#A0522D'),
            new Platform(450, 220, 150, 20, '#A0522D'),
            new Platform(650, 160, 120, 20, '#A0522D'),
        ];

        // Create player
        this.player = new Player(50, 300);
        
        // Create enemies
        this.enemies = [
            new Enemy(300, 250, 200, 400),
            new Enemy(500, 150, 450, 600),
            new Enemy(600, 100, 550, 770),
        ];

        // Create princess at the end
        this.princess = new Princess(720, 100);
        
        // Update UI
        this.updateUI();
    }

    setupEventListeners() {
        // Keyboard events
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            
            // Prevent space from scrolling
            if (e.key === ' ') {
                e.preventDefault();
            }
            
            // Restart game
            if (e.key === 'r' || e.key === 'R') {
                this.restart();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    update(deltaTime) {
        if (this.gameState !== 'playing') {
            return;
        }

        // Update player
        this.player.update(deltaTime, this.keys, this.platforms);

        // Update enemies
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime, this.platforms);
        });

        // Update princess
        this.princess.update(deltaTime);

        // Check collisions
        this.checkCollisions();

        // Check boundaries
        this.checkBoundaries();

        // Update UI
        this.updateUI();
    }

    checkCollisions() {
        // Check player vs enemies
        this.enemies.forEach(enemy => {
            if (enemy.isAlive && checkCollision(this.player.getBounds(), enemy.getBounds())) {
                if (enemy.canBeStomped(this.player)) {
                    // Player stomped enemy
                    enemy.die();
                    this.player.velocityY = -300; // Bounce
                    this.player.addScore(100);
                } else {
                    // Player hit by enemy
                    this.playerHit();
                }
            }
        });

        // Check player vs princess
        if (this.princess.isReached(this.player)) {
            this.win();
        }
    }

    checkBoundaries() {
        // Left boundary
        if (this.player.x < 0) {
            this.player.x = 0;
        }
        
        // Right boundary
        if (this.player.x + this.player.width > this.canvas.width) {
            this.player.x = this.canvas.width - this.player.width;
        }

        // Fall off screen
        if (this.player.y > this.canvas.height) {
            this.playerHit();
        }
    }

    playerHit() {
        const gameOver = this.player.takeDamage();
        
        if (gameOver) {
            this.gameOver();
        } else {
            // Reset player position
            this.player.reset(50, 300);
        }
    }

    win() {
        this.gameState = 'won';
        this.showMessage('🎉 Chúc mừng! Bạn đã cứu được công chúa! 🎉<br><small>Nhấn R để chơi lại</small>');
    }

    gameOver() {
        this.gameState = 'lost';
        this.showMessage('💀 Game Over!<br><small>Nhấn R để chơi lại</small>');
    }

    showMessage(text) {
        this.messageElement.innerHTML = text;
        this.messageElement.classList.remove('hidden');
    }

    hideMessage() {
        this.messageElement.classList.add('hidden');
    }

    restart() {
        this.gameState = 'playing';
        this.hideMessage();
        this.init();
    }

    updateUI() {
        this.scoreElement.textContent = `Score: ${this.player.score}`;
        this.livesElement.textContent = `Lives: ${this.player.lives}`;
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw sky background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#5c94fc');
        gradient.addColorStop(1, '#87CEEB');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw clouds
        this.drawClouds();

        // Draw platforms
        this.platforms.forEach(platform => platform.draw(this.ctx));

        // Draw enemies
        this.enemies.forEach(enemy => enemy.draw(this.ctx));

        // Draw princess
        this.princess.draw(this.ctx);

        // Draw player
        this.player.draw(this.ctx);
    }

    drawClouds() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        // Cloud 1
        this.drawCloud(100, 50, 60);
        this.drawCloud(300, 80, 50);
        this.drawCloud(500, 40, 70);
        this.drawCloud(700, 70, 55);
    }

    drawCloud(x, y, size) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.3, y - size * 0.1, size * 0.5, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.6, y, size * 0.4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    gameLoop(currentTime) {
        // Calculate delta time in seconds
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Update and draw
        this.update(deltaTime);
        this.draw();

        // Continue loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    start() {
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }
}

