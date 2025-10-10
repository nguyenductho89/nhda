// Enemy class (Goomba-like)
class Enemy extends Entity {
    constructor(x, y, minX, maxX) {
        super(x, y, 35, 35);
        this.color = '#8B4513'; // Brown
        this.speed = 80;
        this.velocityX = -this.speed;
        this.minX = minX;
        this.maxX = maxX;
        this.gravity = 1000;
        this.isAlive = true;
        this.isDying = false;
        this.dyingTimer = 0;
        this.dyingDuration = 0.5; // seconds
        
        // Load image
        loadImage('assets/images/enemy.png').then(img => {
            this.setImage(img);
        }).catch(err => {
            console.log('Using default graphics for Enemy');
        });
    }

    // Update enemy
    update(deltaTime, platforms) {
        if (!this.isAlive) {
            if (this.isDying) {
                this.dyingTimer += deltaTime;
                if (this.dyingTimer >= this.dyingDuration) {
                    this.isDying = false;
                }
            }
            return;
        }

        // Move horizontally
        this.x += this.velocityX * deltaTime;

        // Reverse direction at boundaries
        if (this.x <= this.minX || this.x + this.width >= this.maxX) {
            this.velocityX = -this.velocityX;
        }

        // Apply gravity
        this.velocityY += this.gravity * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Check platform collisions
        platforms.forEach(platform => {
            if (isOnPlatform(this, platform) && this.velocityY >= 0) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
            }
        });
    }

    // Draw enemy
    draw(ctx) {
        if (!this.isAlive && !this.isDying) {
            return; // Don't draw if completely dead
        }

        ctx.save();
        
        if (this.isDying) {
            // Squashed animation
            ctx.globalAlpha = 1 - (this.dyingTimer / this.dyingDuration);
        }

        if (this.image && this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Draw simple enemy (Goomba-like)
            // Body
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            ctx.fill();
            
            // Eyes
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x + 12, this.y + 12, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x + 23, this.y + 12, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Pupils
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.x + 12, this.y + 12, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x + 23, this.y + 12, 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Feet
            ctx.fillStyle = '#654321';
            ctx.fillRect(this.x + 5, this.y + this.height - 5, 10, 5);
            ctx.fillRect(this.x + 20, this.y + this.height - 5, 10, 5);
        }
        
        ctx.restore();
    }

    // Kill enemy (stomped)
    die() {
        this.isAlive = false;
        this.isDying = true;
        this.dyingTimer = 0;
    }

    // Check if player can stomp
    canBeStomped(player) {
        return this.isAlive && 
               player.y + player.height <= this.y + 10 && 
               player.velocityY > 0;
    }
}

