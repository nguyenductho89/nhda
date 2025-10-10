// Game Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// Game State
const game = {
    score: 0,
    coins: 0,
    lives: 3,
    isRunning: false,
    isGameOver: false,
    camera: { x: 0 },
    level: 1,
    imagesLoaded: false
};

// Image Loading
const images = {
    mario: new Image(),
    enemy: new Image(),
    coin: new Image()
};

// Load images
images.mario.src = 'images/mario.png';
images.enemy.src = 'images/enemy.png';
images.coin.src = 'images/coin.png';

// Track loaded images
let loadedCount = 0;
const totalImages = 3;

function checkImagesLoaded() {
    loadedCount++;
    if (loadedCount === totalImages) {
        game.imagesLoaded = true;
        console.log('All images loaded!');
    }
}

images.mario.onload = checkImagesLoaded;
images.enemy.onload = checkImagesLoaded;
images.coin.onload = checkImagesLoaded;

// Fallback if images don't load
images.mario.onerror = () => { images.mario.src = ''; checkImagesLoaded(); };
images.enemy.onerror = () => { images.enemy.src = ''; checkImagesLoaded(); };
images.coin.onerror = () => { images.coin.src = ''; checkImagesLoaded(); };

// Player Class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = 12;
        this.gravity = 0.5;
        this.isOnGround = false;
        this.direction = 'right';
    }

    update() {
        // Apply gravity
        this.velocityY += this.gravity;
        
        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Check ground collision
        this.isOnGround = false;
        platforms.forEach(platform => {
            if (this.checkCollision(platform)) {
                if (this.velocityY > 0) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.isOnGround = true;
                }
            }
        });

        // Check coin collection
        coins = coins.filter(coin => {
            if (this.checkCollision(coin)) {
                game.coins++;
                game.score += 10;
                updateUI();
                return false;
            }
            return true;
        });

        // Check enemy collision
        enemies.forEach(enemy => {
            if (this.checkCollision(enemy)) {
                if (this.velocityY > 0 && this.y < enemy.y) {
                    // Jump on enemy
                    enemy.alive = false;
                    this.velocityY = -8;
                    game.score += 20;
                    updateUI();
                } else if (enemy.alive) {
                    // Hit by enemy
                    this.die();
                }
            }
        });

        // Keep player in bounds
        if (this.y > canvas.height) {
            this.die();
        }

        // Horizontal friction
        this.velocityX *= 0.8;
    }

    checkCollision(obj) {
        return this.x < obj.x + obj.width &&
               this.x + this.width > obj.x &&
               this.y < obj.y + obj.height &&
               this.y + this.height > obj.y;
    }

    jump() {
        if (this.isOnGround) {
            this.velocityY = -this.jumpPower;
            this.isOnGround = false;
        }
    }

    moveLeft() {
        this.velocityX = -this.speed;
        this.direction = 'left';
    }

    moveRight() {
        this.velocityX = this.speed;
        this.direction = 'right';
    }

    die() {
        game.lives--;
        updateUI();
        if (game.lives <= 0) {
            gameOver();
        } else {
            this.x = 50;
            this.y = 100;
            this.velocityX = 0;
            this.velocityY = 0;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x - game.camera.x, this.y);
        
        // Draw image if loaded, otherwise draw simple shape
        if (images.mario.complete && images.mario.src) {
            // Flip image if facing left
            if (this.direction === 'left') {
                ctx.scale(-1, 1);
                ctx.drawImage(images.mario, -this.width, 0, this.width, this.height);
            } else {
                ctx.drawImage(images.mario, 0, 0, this.width, this.height);
            }
        } else {
            // Fallback: Draw player as Mario-like character
            // Body
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(0, 8, this.width, this.height - 8);
            
            // Head
            ctx.fillStyle = '#f39c12';
            ctx.beginPath();
            ctx.arc(this.width / 2, 8, 10, 0, Math.PI * 2);
            ctx.fill();
            
            // Cap
            ctx.fillStyle = '#c0392b';
            ctx.fillRect(this.width / 4, 0, this.width / 2, 8);
            
            // Eyes
            ctx.fillStyle = 'black';
            if (this.direction === 'right') {
                ctx.fillRect(this.width / 2 + 2, 6, 3, 3);
            } else {
                ctx.fillRect(this.width / 2 - 5, 6, 3, 3);
            }
        }
        
        ctx.restore();
    }
}

// Platform Class
class Platform {
    constructor(x, y, width, height, type = 'normal') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    draw() {
        ctx.save();
        ctx.translate(-game.camera.x, 0);
        
        if (this.type === 'brick') {
            ctx.fillStyle = '#d35400';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            // Brick pattern
            ctx.strokeStyle = '#a04000';
            ctx.lineWidth = 2;
            for (let i = 0; i < this.width; i += 20) {
                for (let j = 0; j < this.height; j += 10) {
                    ctx.strokeRect(this.x + i, this.y + j, 20, 10);
                }
            }
        } else {
            ctx.fillStyle = '#27ae60';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            // Grass pattern
            ctx.fillStyle = '#2ecc71';
            ctx.fillRect(this.x, this.y, this.width, 5);
        }
        
        ctx.restore();
    }
}

// Enemy Class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 1.5;
        this.direction = -1;
        this.alive = true;
    }

    update() {
        if (!this.alive) return;
        
        this.x += this.speed * this.direction;
        
        // Reverse direction at edges or gaps
        let onPlatform = false;
        platforms.forEach(platform => {
            if (this.x + this.width > platform.x && 
                this.x < platform.x + platform.width &&
                this.y + this.height >= platform.y &&
                this.y + this.height <= platform.y + 10) {
                onPlatform = true;
            }
        });
        
        if (!onPlatform || this.x < 0 || this.x > 2000) {
            this.direction *= -1;
        }
    }

    draw() {
        if (!this.alive) return;
        
        ctx.save();
        ctx.translate(-game.camera.x, 0);
        
        // Draw image if loaded, otherwise draw simple shape
        if (images.enemy.complete && images.enemy.src) {
            ctx.drawImage(images.enemy, this.x, this.y, this.width, this.height);
        } else {
            // Fallback: Draw enemy as mushroom-like creature
            ctx.fillStyle = '#8e44ad';
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + 10, 12, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#9b59b6';
            ctx.fillRect(this.x + 8, this.y + 10, this.width - 16, this.height - 10);
            
            // Eyes
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x + 10, this.y + 8, 3, 0, Math.PI * 2);
            ctx.arc(this.x + 20, this.y + 8, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

// Coin Class
class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.angle = 0;
    }

    update() {
        this.angle += 0.1;
    }

    draw() {
        ctx.save();
        ctx.translate(-game.camera.x, 0);
        
        // Draw image if loaded, otherwise draw simple shape
        if (images.coin.complete && images.coin.src) {
            // Add rotation animation
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(this.angle);
            ctx.drawImage(images.coin, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            // Fallback: Draw simple coin
            ctx.fillStyle = '#f39c12';
            ctx.beginPath();
            ctx.arc(this.x + 10, this.y + 10, 8 + Math.sin(this.angle) * 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(this.x + 10, this.y + 10, 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

// Game Objects
let player = new Player(50, 100);
let platforms = [];
let enemies = [];
let coins = [];

// Initialize Level
function initLevel() {
    platforms = [
        // Ground
        new Platform(0, 350, 300, 50, 'normal'),
        new Platform(350, 350, 200, 50, 'normal'),
        new Platform(600, 350, 400, 50, 'normal'),
        new Platform(1050, 350, 300, 50, 'normal'),
        new Platform(1400, 350, 400, 50, 'normal'),
        
        // Floating platforms
        new Platform(300, 250, 100, 20, 'brick'),
        new Platform(450, 200, 100, 20, 'brick'),
        new Platform(600, 250, 80, 20, 'brick'),
        new Platform(750, 180, 100, 20, 'brick'),
        new Platform(900, 220, 100, 20, 'brick'),
        new Platform(1100, 200, 120, 20, 'brick'),
        new Platform(1300, 250, 100, 20, 'brick'),
        new Platform(1500, 180, 100, 20, 'brick'),
    ];

    enemies = [
        new Enemy(400, 320),
        new Enemy(700, 320),
        new Enemy(800, 190),
        new Enemy(1200, 320),
        new Enemy(1500, 150),
    ];

    coins = [
        new Coin(320, 220),
        new Coin(350, 220),
        new Coin(470, 170),
        new Coin(620, 220),
        new Coin(770, 150),
        new Coin(920, 190),
        new Coin(1120, 170),
        new Coin(1150, 170),
        new Coin(1320, 220),
        new Coin(1520, 150),
        new Coin(1550, 150),
    ];
}

// Input Handling
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (!game.isRunning && !game.isGameOver) {
        startGame();
    }
    
    if (e.key === 'r' || e.key === 'R') {
        restartGame();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Game Functions
function startGame() {
    game.isRunning = true;
    game.isGameOver = false;
    updateStatus('Playing!');
}

function gameOver() {
    game.isGameOver = true;
    game.isRunning = false;
    updateStatus('Game Over! Press R to restart');
}

function restartGame() {
    game.score = 0;
    game.coins = 0;
    game.lives = 3;
    game.camera.x = 0;
    player = new Player(50, 100);
    initLevel();
    updateUI();
    startGame();
}

function updateUI() {
    document.getElementById('score').textContent = game.score;
    document.getElementById('coins').textContent = game.coins;
    document.getElementById('lives').textContent = game.lives;
}

function updateStatus(message) {
    document.getElementById('gameStatus').textContent = message;
}

// Game Loop
function gameLoop() {
    // Clear canvas
    ctx.fillStyle = '#5dade2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background clouds
    drawBackground();

    if (game.isRunning) {
        // Handle input
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            player.moveLeft();
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            player.moveRight();
        }
        if (keys[' '] || keys['ArrowUp'] || keys['w'] || keys['W']) {
            player.jump();
        }

        // Update game objects
        player.update();
        enemies.forEach(enemy => enemy.update());
        coins.forEach(coin => coin.update());

        // Update camera
        if (player.x > canvas.width / 2) {
            game.camera.x = player.x - canvas.width / 2;
        }
        if (game.camera.x < 0) {
            game.camera.x = 0;
        }

        // Check win condition
        if (player.x > 1700 && player.isOnGround) {
            game.isRunning = false;
            updateStatus('Level Complete! Press R to play again');
            game.score += 100;
            updateUI();
        }
    }

    // Draw everything
    platforms.forEach(platform => platform.draw());
    coins.forEach(coin => coin.draw());
    enemies.forEach(enemy => enemy.draw());
    player.draw();

    // Draw finish flag
    drawFinishFlag();

    requestAnimationFrame(gameLoop);
}

function drawBackground() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    // Clouds
    ctx.beginPath();
    ctx.arc(100, 50, 30, 0, Math.PI * 2);
    ctx.arc(130, 50, 35, 0, Math.PI * 2);
    ctx.arc(160, 50, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(400, 80, 25, 0, Math.PI * 2);
    ctx.arc(425, 80, 30, 0, Math.PI * 2);
    ctx.arc(450, 80, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(650, 60, 28, 0, Math.PI * 2);
    ctx.arc(678, 60, 32, 0, Math.PI * 2);
    ctx.arc(706, 60, 28, 0, Math.PI * 2);
    ctx.fill();
}

function drawFinishFlag() {
    ctx.save();
    ctx.translate(-game.camera.x, 0);
    
    // Flag pole
    ctx.fillStyle = '#34495e';
    ctx.fillRect(1750, 200, 5, 150);
    
    // Flag
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.moveTo(1755, 200);
    ctx.lineTo(1805, 220);
    ctx.lineTo(1755, 240);
    ctx.closePath();
    ctx.fill();
    
    // Checkered pattern on flag
    ctx.fillStyle = 'white';
    ctx.fillRect(1755, 200, 10, 10);
    ctx.fillRect(1765, 210, 10, 10);
    ctx.fillRect(1755, 220, 10, 10);
    ctx.fillRect(1765, 230, 10, 10);
    
    ctx.restore();
}

// Initialize and start
initLevel();
updateUI();
gameLoop();

