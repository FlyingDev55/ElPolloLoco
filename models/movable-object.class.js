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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
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
