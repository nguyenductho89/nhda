// Player class for Mario
class Player extends Entity {
    constructor(x, y) {
        super(x, y, 40, 50);
        this.color = '#FF0000'; // Red for Mario
        this.speed = 200;
        this.jumpForce = -400;
        this.gravity = 1000;
        this.isJumping = false;
        this.isOnGround = false;
        this.direction = 'right';
        this.lives = 3;
        this.score = 0;
        
        // Animation properties
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animationSpeed = 0.1;
        
        // Load image
        loadImage('assets/images/mario.png').then(img => {
            this.setImage(img);
        }).catch(err => {
            console.log('Using default graphics for Mario');
        });
    }

    // Update player
    update(deltaTime, keys, platforms) {
        // Horizontal movement
        this.velocityX = 0;
        
        if (keys['ArrowLeft']) {
            this.velocityX = -this.speed;
            this.direction = 'left';
        }
        if (keys['ArrowRight']) {
            this.velocityX = this.speed;
            this.direction = 'right';
        }

        // Jump
        if (keys[' '] && this.isOnGround) {
            this.velocityY = this.jumpForce;
            this.isJumping = true;
            this.isOnGround = false;
        }

        // Apply gravity
        this.velocityY += this.gravity * deltaTime;

        // Update position
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Check platform collisions
        this.isOnGround = false;
        
        platforms.forEach(platform => {
            if (isOnPlatform(this, platform) && this.velocityY >= 0) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
                this.isOnGround = true;
                this.isJumping = false;
            }
        });

        // Update animation
        if (this.velocityX !== 0) {
            this.animationTimer += deltaTime;
            if (this.animationTimer >= this.animationSpeed) {
                this.animationFrame = (this.animationFrame + 1) % 4;
                this.animationTimer = 0;
            }
        } else {
            this.animationFrame = 0;
        }
    }

    // Draw player
    draw(ctx) {
        ctx.save();
        
        // Flip horizontally if facing left
        if (this.direction === 'left') {
            ctx.translate(this.x + this.width, this.y);
            ctx.scale(-1, 1);
            ctx.translate(-this.x, -this.y);
        }

        if (this.image && this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Draw simple Mario representation
            // Head
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(this.x + 10, this.y + 5, 20, 20);
            
            // Body
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x + 5, this.y + 25, 30, 15);
            
            // Legs
            ctx.fillStyle = '#0000FF';
            ctx.fillRect(this.x + 8, this.y + 40, 10, 10);
            ctx.fillRect(this.x + 22, this.y + 40, 10, 10);
        }
        
        ctx.restore();
    }

    // Take damage
    takeDamage() {
        this.lives--;
        return this.lives <= 0;
    }

    // Add score
    addScore(points) {
        this.score += points;
    }

    // Reset position
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.isOnGround = false;
    }
}

