class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 1;
  otherDirection = false;
  energy;
  lastHit = 0;
  HURT_DURATION = 1000;
  ground;
  isCollidable = true;

  puffer = 10;

  isCollidingFromAbove(movableObject) {
    return (
      this.isColliding(movableObject) &&
      this.speedY < 0 &&
      this.y + this.height - this.offset.bottom <
        movableObject.y + movableObject.offset.top + this.puffer
    );
  }

  isColliding(movableObject) {
    if (this.isCollidable === false || movableObject.isCollidable === false) {
      return false;
    }

    const offset = movableObject.offset ?? {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    return (
      this.x + this.width - this.offset.right > movableObject.x + offset.left &&
      this.x + this.offset.left <
        movableObject.x + movableObject.width - offset.right &&
      this.y + this.height + this.offset.bottom >
        movableObject.y + offset.top &&
      this.y < movableObject.y + movableObject.height - offset.bottom
    );
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    }
    return this.y < this.ground;
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
    if (this instanceof Character) {
      this.otherDirection = true;
    }
  }

  jump() {
    this.speedY = 23;
  }

  playAnimation(images, indexProp) {
    let path = images[this[indexProp]];
    this.img = this.imageCache[path];
    this[indexProp]++;
    if (this[indexProp] >= images.length) {
      this[indexProp] = 0;
    }
  }
}
