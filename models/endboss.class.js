class Endboss extends Chicken {
  y = 290;
  height = 140;
  width = 140;
  IMAGES_WALKING = [
    ,
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super();
    this.loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 2200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
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
  }
}
