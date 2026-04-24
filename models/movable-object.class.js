class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = [];
  currentImage = 0;
  speed = 0.15;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
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
    console.log("moving right");
  }

  moveLeft(speed) {
    this.x -= speed;
    console.log("moving left");
  }

  autoMoveLeft(speed) {
    setInterval(() => {
      this.x -= speed;
    }, 1000 / 60);
  }
}
