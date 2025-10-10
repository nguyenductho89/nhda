// Platform class for ground and platforms
class Platform extends Entity {
    constructor(x, y, width, height, color = '#8B4513') {
        super(x, y, width, height);
        this.color = color;
        this.type = 'ground'; // 'ground' or 'platform'
    }

    // Platforms don't move
    update(deltaTime) {
        // Platforms are static
    }

    // Draw platform with grass on top
    draw(ctx) {
        // Draw dirt
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw grass on top
        ctx.fillStyle = '#228B22';
        ctx.fillRect(this.x, this.y, this.width, 5);
        
        // Draw border
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

