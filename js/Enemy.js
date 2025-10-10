// Enemy class (Life challenges)
class Enemy extends Entity {
    constructor(x, y, minX, maxX, type = 'work') {
        super(x, y, 35, 35);
        this.type = type;
        this.color = this.getColorByType();
        this.label = this.getLabelByType();
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

    getColorByType() {
        const colors = {
            deadline: '#FF6B6B',
            traffic: '#4ECDC4',
            work: '#FFA07A',
            stress: '#DDA0DD'
        };
        return colors[this.type] || '#8B4513';
    }

    getLabelByType() {
        const labels = {
            deadline: '⏰',
            traffic: '🚗',
            work: '💼',
            stress: '😰'
        };
        return labels[this.type] || '👾';
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

    // Draw enemy (challenge)
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
            // Draw cute challenge representation
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
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.7;
            ctx.fillRect(this.x + 5, this.y + this.height - 5, 10, 5);
            ctx.fillRect(this.x + 20, this.y + this.height - 5, 10, 5);
        }

        // Draw emoji label above
        ctx.globalAlpha = 1;
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.label, this.x + this.width/2, this.y - 5);
        
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

