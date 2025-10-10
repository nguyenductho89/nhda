// Base Entity class for all game objects
class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 0;
        this.velocityY = 0;
        this.image = null;
        this.color = '#000'; // Fallback color if no image
    }

    // Update entity position
    update(deltaTime) {
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;
    }

    // Draw entity on canvas
    draw(ctx) {
        if (this.image && this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Fallback to colored rectangle
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // Get bounding box for collision
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    // Set image for entity
    setImage(image) {
        this.image = image;
    }

    // Set color for entity
    setColor(color) {
        this.color = color;
    }
}

