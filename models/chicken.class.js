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
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 400 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let path = this.IMAGES_WALKING[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
      if (this.currentImage >= this.IMAGES_WALKING.length) {
        this.currentImage = 0;
      }
    }, 200);
  }
}
