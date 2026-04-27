class Chicken extends MovableObject {
  y = 360;
  height = 70;
  width = 70;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 400 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.3 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setInterval(() => {
      let path = this.IMAGES_WALKING[this.currentImageWalking];
      this.img = this.imageCache[path];
      this.currentImageWalking++;
      if (this.currentImageWalking >= this.IMAGES_WALKING.length) {
        this.currentImageWalking = 0;
      }
    }, 200);

    this.autoMoveLeft(this.speed);
  }
}
