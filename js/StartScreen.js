// Start Screen for Wedding Invitation
class StartScreen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isActive = true;
        this.animationTimer = 0;
        
        // Wedding info - customize these!
        this.groomName = "Chú Rể";
        this.brideName = "Cô Dâu";
        this.weddingDate = "DD/MM/YYYY";
        this.venue = "Địa điểm tổ chức";
        
        // Particles for background
        this.backgroundParticles = [];
        this.initBackgroundParticles();
    }

    initBackgroundParticles() {
        for (let i = 0; i < 20; i++) {
            this.backgroundParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 15 + 5,
                speedY: Math.random() * 30 + 20,
                speedX: (Math.random() - 0.5) * 20,
                type: Math.random() > 0.5 ? 'heart' : 'flower'
            });
        }
    }

    update(deltaTime) {
        this.animationTimer += deltaTime;
        
        // Update background particles
        this.backgroundParticles.forEach(particle => {
            particle.y += particle.speedY * deltaTime;
            particle.x += particle.speedX * deltaTime;
            
            // Reset if out of bounds
            if (particle.y > this.canvas.height) {
                particle.y = -particle.size;
                particle.x = Math.random() * this.canvas.width;
            }
        });
    }

    draw() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Romantic gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#FFE5E5');
        gradient.addColorStop(0.5, '#FFB6C1');
        gradient.addColorStop(1, '#DDA0DD');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw background particles
        this.backgroundParticles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = 0.3;
            if (particle.type === 'heart') {
                this.drawHeart(ctx, particle.x, particle.y, particle.size);
            } else {
                this.drawFlower(ctx, particle.x, particle.y, particle.size);
            }
            ctx.restore();
        });

        // Title with animation
        const titleY = 80 + Math.sin(this.animationTimer * 2) * 5;
        
        // Main title
        ctx.fillStyle = '#FF1493';
        ctx.font = 'bold 48px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('💕 Hành Trình Tình Yêu 💕', width/2, titleY);

        // Names with hearts
        ctx.font = 'bold 36px Georgia, serif';
        ctx.fillStyle = '#C71585';
        const namesY = titleY + 60;
        ctx.fillText(`${this.groomName} ❤️ ${this.brideName}`, width/2, namesY);

        // Story text
        ctx.font = '20px Georgia, serif';
        ctx.fillStyle = '#8B008B';
        const storyLines = [
            'Tình yêu là cuộc phiêu lưu đẹp nhất',
            'Hãy giúp chú rể vượt qua thử thách',
            'để đến bên cô dâu yêu dấu!'
        ];
        
        storyLines.forEach((line, i) => {
            ctx.fillText(line, width/2, namesY + 50 + i * 30);
        });

        // Instructions box
        ctx.save();
        const boxY = height - 180;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(width/2 - 200, boxY, 400, 120);
        ctx.strokeStyle = '#FF69B4';
        ctx.lineWidth = 3;
        ctx.strokeRect(width/2 - 200, boxY, 400, 120);

        ctx.fillStyle = '#8B008B';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('🎮 Cách Chơi:', width/2, boxY + 30);
        
        ctx.font = '16px Arial';
        ctx.fillText('← → : Di chuyển', width/2, boxY + 55);
        ctx.fillText('Space : Nhảy', width/2, boxY + 80);
        
        // Pulsing start text
        const pulse = 0.8 + Math.sin(this.animationTimer * 4) * 0.2;
        ctx.globalAlpha = pulse;
        ctx.font = 'bold 22px Arial';
        ctx.fillStyle = '#FF1493';
        ctx.fillText('Nhấn SPACE để bắt đầu! ✨', width/2, boxY + 105);
        ctx.restore();

        // Hearts decoration
        for (let i = 0; i < 5; i++) {
            const x = 50 + i * (width - 100) / 4;
            const y = 30 + Math.sin(this.animationTimer * 3 + i) * 10;
            this.drawHeart(ctx, x, y, 15);
        }
    }

    drawHeart(ctx, x, y, size) {
        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();
        ctx.moveTo(x, y + size/4);
        ctx.bezierCurveTo(x, y, x - size/2, y - size/2, x - size, y + size/4);
        ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 1.5);
        ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y + size/4);
        ctx.bezierCurveTo(x + size/2, y - size/2, x, y, x, y + size/4);
        ctx.fill();
    }

    drawFlower(ctx, x, y, size) {
        ctx.fillStyle = '#DDA0DD';
        for (let i = 0; i < 5; i++) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate((Math.PI * 2 * i) / 5);
            ctx.beginPath();
            ctx.ellipse(0, -size/3, size/4, size/2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x, y, size/5, 0, Math.PI * 2);
        ctx.fill();
    }

    handleInput(key) {
        if (key === ' ') {
            this.isActive = false;
            return true; // Game should start
        }
        return false;
    }
}

