// Main Game class
class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas base size
        this.canvas.width = 800;
        this.canvas.height = 400;
        
        // Game state
        this.gameState = 'start'; // 'start', 'playing', 'won', 'lost'
        this.keys = {};
        
        // Entities
        this.player = null;
        this.enemies = [];
        this.platforms = [];
        this.princess = null;
        this.hearts = [];
        
        // Wedding features
        this.startScreen = new StartScreen(this.canvas);
        this.winScreen = new WinScreen(this.canvas);
        this.particleSystem = new ParticleSystem();
        this.audioManager = new AudioManager();
        this.collectedHearts = 0;
        this.messageTimer = 0;
        this.currentMessage = '';
        
        // Game properties
        this.lastTime = 0;
        this.score = 0;
        this.lives = 3;
        
        // UI elements
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        this.messageElement = document.getElementById('gameMessage');
        
        // Initialize responsive manager
        this.responsiveManager = new ResponsiveManager(this);
        
        // Initialize
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Create platforms with romantic colors
        this.platforms = [
            // Ground
            new Platform(0, 350, 800, 50, '#DDA0DD'),
            // Floating platforms  
            new Platform(200, 280, 150, 20, '#FFB6C1'),
            new Platform(450, 220, 150, 20, '#FFB6C1'),
            new Platform(650, 160, 120, 20, '#FFB6C1'),
        ];

        // Create player
        this.player = new Player(50, 300);
        
        // Create enemies (challenges)
        this.enemies = [
            new Enemy(300, 250, 200, 400, 'deadline'),
            new Enemy(500, 150, 450, 600, 'traffic'),
            new Enemy(600, 100, 550, 770, 'work'),
        ];

        // Create princess at the end
        this.princess = new Princess(720, 100);
        
        // Create hearts to collect
        this.hearts = [
            new Heart(230, 240),
            new Heart(480, 180),
            new Heart(680, 120),
            new Heart(380, 320),
            new Heart(570, 320),
        ];

        // Reset collected hearts
        this.collectedHearts = 0;
        
        // Clear particles
        this.particleSystem.clear();
        
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
                
                // Handle start screen
                if (this.gameState === 'start') {
                    if (this.startScreen.handleInput(' ')) {
                        this.gameState = 'playing';
                        this.audioManager.resume();
                        this.audioManager.playRomanticMelody();
                    }
                }
            }
            
            // Restart game
            if (e.key === 'r' || e.key === 'R') {
                this.restart();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        // Mobile touch controls
        this.setupMobileControls();
    }

    setupMobileControls() {
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        const jumpBtn = document.getElementById('jumpBtn');

        if (!leftBtn || !rightBtn || !jumpBtn) return;

        // Prevent default touch behaviors
        [leftBtn, rightBtn, jumpBtn].forEach(btn => {
            btn.addEventListener('touchstart', (e) => e.preventDefault());
            btn.addEventListener('touchend', (e) => e.preventDefault());
        });

        // Left button
        leftBtn.addEventListener('touchstart', () => {
            this.keys['ArrowLeft'] = true;
        });
        leftBtn.addEventListener('touchend', () => {
            this.keys['ArrowLeft'] = false;
        });

        // Right button
        rightBtn.addEventListener('touchstart', () => {
            this.keys['ArrowRight'] = true;
        });
        rightBtn.addEventListener('touchend', () => {
            this.keys['ArrowRight'] = false;
        });

        // Jump button
        jumpBtn.addEventListener('touchstart', () => {
            this.keys[' '] = true;
            // Handle start screen on mobile
            if (this.gameState === 'start') {
                if (this.startScreen.handleInput(' ')) {
                    this.gameState = 'playing';
                    this.audioManager.resume();
                    this.audioManager.playRomanticMelody();
                }
            }
        });
        jumpBtn.addEventListener('touchend', () => {
            this.keys[' '] = false;
        });

        // Also support mouse for testing on desktop
        leftBtn.addEventListener('mousedown', () => this.keys['ArrowLeft'] = true);
        leftBtn.addEventListener('mouseup', () => this.keys['ArrowLeft'] = false);
        leftBtn.addEventListener('mouseleave', () => this.keys['ArrowLeft'] = false);

        rightBtn.addEventListener('mousedown', () => this.keys['ArrowRight'] = true);
        rightBtn.addEventListener('mouseup', () => this.keys['ArrowRight'] = false);
        rightBtn.addEventListener('mouseleave', () => this.keys['ArrowRight'] = false);

        jumpBtn.addEventListener('mousedown', () => {
            this.keys[' '] = true;
            if (this.gameState === 'start') {
                if (this.startScreen.handleInput(' ')) {
                    this.gameState = 'playing';
                    this.audioManager.resume();
                    this.audioManager.playRomanticMelody();
                }
            }
        });
        jumpBtn.addEventListener('mouseup', () => this.keys[' '] = false);
        jumpBtn.addEventListener('mouseleave', () => this.keys[' '] = false);
    }

    update(deltaTime) {
        // Update start screen
        if (this.gameState === 'start') {
            this.startScreen.update(deltaTime);
            return;
        }

        // Update win screen
        if (this.gameState === 'won') {
            this.winScreen.update(deltaTime);
            return;
        }

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

        // Update hearts
        this.hearts.forEach(heart => {
            heart.update(deltaTime);
        });

        // Update particle system
        this.particleSystem.update(deltaTime);

        // Update message timer
        if (this.messageTimer > 0) {
            this.messageTimer -= deltaTime;
            if (this.messageTimer <= 0) {
                this.hideMessage();
            }
        }

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
                    // Create particles
                    this.particleSystem.createHeartBurst(enemy.x + enemy.width/2, enemy.y + enemy.height/2, 5);
                } else {
                    // Player hit by enemy
                    this.playerHit();
                }
            }
        });

        // Check player vs hearts
        this.hearts.forEach(heart => {
            if (heart.isColliding(this.player)) {
                const message = heart.collect();
                this.collectedHearts++;
                this.player.addScore(50);
                
                // Show sweet message
                this.showTemporaryMessage(message, 2);
                
                // Create heart particles
                this.particleSystem.createHeartBurst(heart.x + heart.width/2, heart.y + heart.height/2, 8);
                
                // Play sound
                this.audioManager.playHeartSound();
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
        // Create confetti celebration
        this.particleSystem.createConfetti(this.canvas.width/2, this.canvas.height/2, 50);
        this.particleSystem.createHeartBurst(this.princess.x + this.princess.width/2, this.princess.y, 15);
        // Play victory sound
        this.audioManager.playVictorySound();
    }

    gameOver() {
        this.gameState = 'lost';
        this.showMessage('💀 Game Over!<br><small>Nhấn R để chơi lại</small>');
    }

    showMessage(text) {
        this.messageElement.innerHTML = text;
        this.messageElement.classList.remove('hidden');
    }

    showTemporaryMessage(text, duration) {
        this.currentMessage = text;
        this.messageTimer = duration;
        this.showMessage(text);
    }

    hideMessage() {
        this.messageElement.classList.add('hidden');
        this.currentMessage = '';
    }

    restart() {
        this.gameState = 'start';
        this.hideMessage();
        this.startScreen = new StartScreen(this.canvas);
        this.winScreen = new WinScreen(this.canvas);
        this.init();
    }

    updateUI() {
        this.scoreElement.textContent = `💕 Hearts: ${this.collectedHearts}`;
        this.livesElement.textContent = `❤️ Lives: ${this.player.lives}`;
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw start screen
        if (this.gameState === 'start') {
            this.startScreen.draw();
            return;
        }

        // Draw win screen
        if (this.gameState === 'won') {
            this.winScreen.draw();
            // Draw particles on top
            this.particleSystem.draw(this.ctx);
            return;
        }

        // Draw romantic sky background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#FFE5E5');
        gradient.addColorStop(0.5, '#FFB6C1');
        gradient.addColorStop(1, '#DDA0DD');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw clouds (now romantic pink)
        this.drawClouds();

        // Draw platforms
        this.platforms.forEach(platform => platform.draw(this.ctx));

        // Draw hearts
        this.hearts.forEach(heart => heart.draw(this.ctx));

        // Draw enemies
        this.enemies.forEach(enemy => enemy.draw(this.ctx));

        // Draw princess
        this.princess.draw(this.ctx);

        // Draw player
        this.player.draw(this.ctx);

        // Draw particles
        this.particleSystem.draw(this.ctx);

        // Draw floating hearts background effect
        this.drawFloatingHearts();
    }

    drawClouds() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        
        // Romantic pink-tinted clouds
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

    drawFloatingHearts() {
        const time = Date.now() / 1000;
        this.ctx.fillStyle = 'rgba(255, 182, 193, 0.3)';
        
        for (let i = 0; i < 5; i++) {
            const x = (time * 30 + i * 150) % (this.canvas.width + 50);
            const y = 50 + Math.sin(time + i) * 20;
            const size = 8 + Math.sin(time * 2 + i) * 3;
            
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.scale(size/10, size/10);
            this.drawHeartShape();
            this.ctx.restore();
        }
    }

    drawHeartShape() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 2.5);
        this.ctx.bezierCurveTo(0, 0, -5, -5, -10, 2.5);
        this.ctx.bezierCurveTo(-10, 10, 0, 15, 0, 15);
        this.ctx.bezierCurveTo(0, 15, 10, 10, 10, 2.5);
        this.ctx.bezierCurveTo(5, -5, 0, 0, 0, 2.5);
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

