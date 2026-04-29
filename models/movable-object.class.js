class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 1;
  otherDirection = false;
  energy;
  lastHit = 0;
  HURT_DURATION = 1000;

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
