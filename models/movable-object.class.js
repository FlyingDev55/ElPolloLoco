class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = [];
  currentImageWalking = 0;
  currentImageJumping = 0;
  currentImageIdle = 0;
  currentImageHurt = 0;
  currentImageDead = 0;
  speed = 0.15;
  speedY = 0;
  acceleration = 1;
  otherDirection = false;
  energy;
  lastHit = 0;
  HURT_DURATION = 1000;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    return this.img;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(movableObject) {
    return (
      this.x + this.width > movableObject.x &&
      this.x < movableObject.x + movableObject.width &&
      this.y + this.height > movableObject.y &&
      this.y < movableObject.y + movableObject.height
    );
  }

  hit() {
    this.energy -= 2;
    this.lastHit = Date.now();
    this.currentImageHurt = 0;
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    return Date.now() - this.lastHit < this.HURT_DURATION;
  }

  moveRight(speed) {
    this.x += speed;
    this.otherDirection = false;
  }

  moveLeft(speed) {
    this.x -= speed;
    this.otherDirection = true;
  }

  jump() {
    this.speedY = 23;
  }

  autoMoveLeft(speed) {
    setInterval(() => {
      this.x -= speed;
    }, 1000 / 60);
  }
}
