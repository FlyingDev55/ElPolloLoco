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
  speed = 0.15;
  speedY = 0;
  acceleration = 1;
  otherDirection = false;

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
