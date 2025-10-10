// Win Screen with Wedding Information
class WinScreen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.animationTimer = 0;
        
        // Wedding information - CUSTOMIZE THESE!
        this.weddingInfo = {
            groomName: "Chú Rể",
            brideName: "Cô Dâu",
            date: "DD/MM/YYYY",
            time: "18:00",
            venue: "Trung tâm hội nghị tiệc cưới ABC",
            address: "123 Đường XYZ, Quận ABC, TP.HCM",
            message: "Rất hân hạnh được đón tiếp!"
        };

        // Confetti particles
        this.confetti = [];
        this.createConfetti();
    }

    createConfetti() {
        for (let i = 0; i < 50; i++) {
            this.confetti.push({
                x: Math.random() * this.canvas.width,
                y: -Math.random() * 500,
                speedY: Math.random() * 200 + 100,
                speedX: (Math.random() - 0.5) * 50,
                size: Math.random() * 10 + 5,
                color: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'][Math.floor(Math.random() * 5)],
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 5
            });
        }
    }

    update(deltaTime) {
        this.animationTimer += deltaTime;

        // Update confetti
        this.confetti.forEach(c => {
            c.y += c.speedY * deltaTime;
            c.x += c.speedX * deltaTime;
            c.rotation += c.rotationSpeed * deltaTime;

            if (c.y > this.canvas.height) {
                c.y = -20;
                c.x = Math.random() * this.canvas.width;
            }
        });
    }

    draw() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Romantic gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#FFF0F5');
        gradient.addColorStop(0.5, '#FFE4E1');
        gradient.addColorStop(1, '#FFB6C1');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw confetti
        this.confetti.forEach(c => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rotation);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.size/2, -c.size/2, c.size, c.size);
            ctx.restore();
        });

        // Success message with animation
        const titleY = 50 + Math.sin(this.animationTimer * 2) * 5;
        
        ctx.font = 'bold 40px Georgia, serif';
        ctx.fillStyle = '#FF1493';
        ctx.textAlign = 'center';
        ctx.fillText('🎉 Chúc Mừng! 🎉', width/2, titleY);

        ctx.font = '24px Georgia, serif';
        ctx.fillStyle = '#C71585';
        ctx.fillText('Tình yêu đã chiến thắng!', width/2, titleY + 40);

        // Wedding invitation card
        const cardY = titleY + 80;
        const cardWidth = 500;
        const cardHeight = 260;
        const cardX = width/2 - cardWidth/2;

        // Card background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(cardX, cardY, cardWidth, cardHeight);
        
        // Card border with hearts
        ctx.strokeStyle = '#FF69B4';
        ctx.lineWidth = 3;
        ctx.strokeRect(cardX, cardY, cardWidth, cardHeight);

        // Decorative hearts in corners
        this.drawHeart(ctx, cardX + 20, cardY + 20, 10);
        this.drawHeart(ctx, cardX + cardWidth - 20, cardY + 20, 10);
        this.drawHeart(ctx, cardX + 20, cardY + cardHeight - 20, 10);
        this.drawHeart(ctx, cardX + cardWidth - 20, cardY + cardHeight - 20, 10);

        // Wedding information
        ctx.fillStyle = '#8B008B';
        ctx.font = 'bold 26px Georgia, serif';
        ctx.fillText('💒 Thiệp Mời Đám Cưới 💒', width/2, cardY + 35);

        ctx.font = 'bold 22px Georgia, serif';
        ctx.fillStyle = '#FF1493';
        ctx.fillText(`${this.weddingInfo.groomName} ❤️ ${this.weddingInfo.brideName}`, width/2, cardY + 70);

        ctx.font = '18px Arial';
        ctx.fillStyle = '#555';
        const infoY = cardY + 105;
        ctx.fillText(`📅 ${this.weddingInfo.date} | ⏰ ${this.weddingInfo.time}`, width/2, infoY);
        
        ctx.font = '16px Arial';
        ctx.fillText(`📍 ${this.weddingInfo.venue}`, width/2, infoY + 30);
        ctx.fillText(this.weddingInfo.address, width/2, infoY + 52);

        ctx.font = 'italic 16px Georgia, serif';
        ctx.fillStyle = '#C71585';
        ctx.fillText(this.weddingInfo.message, width/2, infoY + 85);

        // Additional info at bottom
        const bottomY = height - 40;
        
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('💝 Cảm ơn bạn đã chơi game! 💝', width/2, bottomY);
        
        // Pulsing restart text
        const pulse = 0.7 + Math.sin(this.animationTimer * 4) * 0.3;
        ctx.globalAlpha = pulse;
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#FF1493';
        ctx.fillText('Nhấn R để chơi lại', width/2, bottomY + 20);
        ctx.globalAlpha = 1;

        // Floating hearts animation
        for (let i = 0; i < 3; i++) {
            const x = width/2 + Math.sin(this.animationTimer * 2 + i * 2) * 100;
            const y = 20 + Math.sin(this.animationTimer * 3 + i) * 10;
            this.drawHeart(ctx, x, y, 12);
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
}

