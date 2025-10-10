// Heart collectible class
class Heart extends Entity {
    constructor(x, y) {
        super(x, y, 30, 30);
        this.color = '#FF69B4'; // Hot pink
        this.isCollected = false;
        this.animationTimer = 0;
        this.pulseScale = 1;
        this.floatOffset = 0;
        this.message = this.getRandomMessage();
    }

    // Random sweet messages
    getRandomMessage() {
        const messages = [
            "Yêu em mỗi ngày! ❤️",
            "Mãi mãi bên nhau 💕",
            "Tình yêu vĩnh cửu 💖",
            "Forever & Always 💗",
            "You & Me 💝",
            "Love conquers all 💞",
            "Bên em suốt đời 💓",
            "My soulmate 💘"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    update(deltaTime) {
        if (this.isCollected) return;

        // Pulse animation
        this.animationTimer += deltaTime * 3;
        this.pulseScale = 1 + Math.sin(this.animationTimer) * 0.15;
        
        // Float up and down
        this.floatOffset = Math.sin(this.animationTimer * 0.5) * 8;
    }

    draw(ctx) {
        if (this.isCollected) return;

        const drawX = this.x;
        const drawY = this.y + this.floatOffset;
        const size = this.width * this.pulseScale;

        ctx.save();
        ctx.translate(drawX + this.width/2, drawY + this.height/2);
        ctx.scale(this.pulseScale, this.pulseScale);
        ctx.translate(-(drawX + this.width/2), -(drawY + this.height/2));

        // Draw heart shape
        this.drawHeart(ctx, drawX + this.width/2, drawY + this.height/2, size/2);

        // Draw sparkles
        ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
        for (let i = 0; i < 4; i++) {
            const angle = (this.animationTimer + i * Math.PI/2) % (Math.PI * 2);
            const sparkleX = drawX + this.width/2 + Math.cos(angle) * 20;
            const sparkleY = drawY + this.height/2 + Math.sin(angle) * 20;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    drawHeart(ctx, x, y, size) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x, y + size/4);
        ctx.bezierCurveTo(x, y, x - size/2, y - size/2, x - size, y + size/4);
        ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 1.5);
        ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y + size/4);
        ctx.bezierCurveTo(x + size/2, y - size/2, x, y, x, y + size/4);
        ctx.fill();

        // Shine effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(x - size/3, y, size/4, 0, Math.PI * 2);
        ctx.fill();
    }

    collect() {
        this.isCollected = true;
        return this.message;
    }

    isColliding(player) {
        return !this.isCollected && checkCollision(player.getBounds(), this.getBounds());
    }
}

