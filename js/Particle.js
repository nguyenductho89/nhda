// Particle system for romantic effects
class Particle {
    constructor(x, y, type = 'heart') {
        this.x = x;
        this.y = y;
        this.type = type; // 'heart', 'flower', 'confetti'
        this.velocityX = (Math.random() - 0.5) * 100;
        this.velocityY = (Math.random() - 0.5) * 100 - 50;
        this.life = 1;
        this.maxLife = 1;
        this.size = Math.random() * 15 + 10;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 5;
        this.gravity = 50;
        this.color = this.getColor();
    }

    getColor() {
        const colors = {
            heart: ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB'],
            flower: ['#FFB6C1', '#DDA0DD', '#E6E6FA', '#F0E68C'],
            confetti: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD']
        };
        const colorArray = colors[this.type] || colors.heart;
        return colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    update(deltaTime) {
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;
        this.velocityY += this.gravity * deltaTime;
        this.rotation += this.rotationSpeed * deltaTime;
        this.life -= deltaTime;
    }

    draw(ctx) {
        const alpha = Math.max(0, this.life / this.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.type === 'heart') {
            this.drawHeart(ctx);
        } else if (this.type === 'flower') {
            this.drawFlower(ctx);
        } else if (this.type === 'confetti') {
            this.drawConfetti(ctx);
        }

        ctx.restore();
    }

    drawHeart(ctx) {
        const size = this.size / 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, size/4);
        ctx.bezierCurveTo(0, 0, -size/2, -size/2, -size, size/4);
        ctx.bezierCurveTo(-size, size, 0, size * 1.5, 0, size * 1.5);
        ctx.bezierCurveTo(0, size * 1.5, size, size, size, size/4);
        ctx.bezierCurveTo(size/2, -size/2, 0, 0, 0, size/4);
        ctx.fill();
    }

    drawFlower(ctx) {
        ctx.fillStyle = this.color;
        for (let i = 0; i < 5; i++) {
            ctx.save();
            ctx.rotate((Math.PI * 2 * i) / 5);
            ctx.beginPath();
            ctx.ellipse(0, -this.size/3, this.size/4, this.size/2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        // Center
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, this.size/5, 0, Math.PI * 2);
        ctx.fill();
    }

    drawConfetti(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    }

    isDead() {
        return this.life <= 0;
    }
}

// Particle system manager
class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    createHeartBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, 'heart'));
        }
    }

    createFlowerRain(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, 'flower'));
        }
    }

    createConfetti(x, y, count = 30) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, 'confetti'));
        }
    }

    update(deltaTime) {
        this.particles.forEach(particle => particle.update(deltaTime));
        this.particles = this.particles.filter(particle => !particle.isDead());
    }

    draw(ctx) {
        this.particles.forEach(particle => particle.draw(ctx));
    }

    clear() {
        this.particles = [];
    }
}

