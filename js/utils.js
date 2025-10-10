// Utility functions for the game

// Check collision between two rectangular objects
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Check if object is on platform
function isOnPlatform(object, platform) {
    return object.x < platform.x + platform.width &&
           object.x + object.width > platform.x &&
           object.y + object.height >= platform.y &&
           object.y + object.height <= platform.y + 10;
}

// Load image with promise
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Draw text with shadow
function drawTextWithShadow(ctx, text, x, y, color = 'white', shadowColor = 'black') {
    ctx.save();
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = shadowColor;
    ctx.fillText(text, x + 2, y + 2);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.restore();
}

// Clamp value between min and max
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

