class DrawableObject {
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
}
