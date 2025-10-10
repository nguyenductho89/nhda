// Princess class (goal)
class Princess extends Entity {
    constructor(x, y) {
        super(x, y, 40, 60);
        this.color = '#FFB6C1'; // Pink
        this.animationTimer = 0;
        this.animationOffset = 0;
        
        // Load image
        loadImage('assets/images/princess.png').then(img => {
            this.setImage(img);
        }).catch(err => {
            console.log('Using default graphics for Princess');
        });
    }

    // Update princess (idle animation)
    update(deltaTime) {
        // Floating animation
        this.animationTimer += deltaTime * 2;
        this.animationOffset = Math.sin(this.animationTimer) * 5;
    }

    // Draw princess
    draw(ctx) {
        const drawY = this.y + this.animationOffset;
        
        if (this.image && this.image.complete) {
            ctx.drawImage(this.image, this.x, drawY, this.width, this.height);
        } else {
            // Draw simple princess representation
            // Dress
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2, drawY + 20);
            ctx.lineTo(this.x, drawY + this.height);
            ctx.lineTo(this.x + this.width, drawY + this.height);
            ctx.closePath();
            ctx.fill();
            
            // Head
            ctx.fillStyle = '#FFE4B5';
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, drawY + 15, 12, 0, Math.PI * 2);
            ctx.fill();
            
            // Crown
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.moveTo(this.x + 8, drawY + 8);
            ctx.lineTo(this.x + 14, drawY + 2);
            ctx.lineTo(this.x + 20, drawY + 8);
            ctx.lineTo(this.x + 26, drawY + 2);
            ctx.lineTo(this.x + 32, drawY + 8);
            ctx.lineTo(this.x + 8, drawY + 8);
            ctx.fill();
            
            // Eyes
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.x + 15, drawY + 15, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x + 25, drawY + 15, 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Heart particles
            ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
            for (let i = 0; i < 3; i++) {
                const offset = Math.sin(this.animationTimer + i) * 10;
                ctx.beginPath();
                ctx.arc(this.x + this.width/2 + offset, drawY - 10 - i * 8, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    // Check if player reached princess
    isReached(player) {
        return checkCollision(player.getBounds(), this.getBounds());
    }
}

