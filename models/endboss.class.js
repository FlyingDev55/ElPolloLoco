class Endboss extends Chicken {
  y = 60;
  height = 400;
  width = 400;
  energy = 50;
  speed = 0;
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

  offset = {
    top: 80,
    left: 40,
    right: 270,
    bottom: 200,
  };

  constructor() {
    super();
    this.loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 2400;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }
}
