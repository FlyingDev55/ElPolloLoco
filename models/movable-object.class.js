class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 1;
  otherDirection = false;
  energy = 1;
  lastHit = 0;
  HURT_DURATION = 1000;
  ground = 152;
  isCollidable = true;
  moveInterval;
  animationInterval;
  gravityInterval;
  graphicsInterval;

  puffer = 10;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  destroy() {
    this.isCollidable = false;

    if (this.moveInterval) clearInterval(this.moveInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
    if (this.gravityInterval) clearInterval(this.gravityInterval);
    if (this.graphicsInterval) clearInterval(this.graphicsInterval);
  }

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

  isCollidingWithGround() {
    return this.y - this.offset.bottom >= this.ground;
  }

  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this instanceof ThrowableObject) {
        if (!this.isAboveGround() && !this.isBroken()) {
          this.hit();
          return;
        }
      }

      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
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

  playAnimationOnce(images, indexProp) {
    if (this[indexProp] >= images.length) {
      this[indexProp] = images.length - 1;
      return;
    }

    let path = images[this[indexProp]];
    this.img = this.imageCache[path];
    this[indexProp]++;
  }
}
