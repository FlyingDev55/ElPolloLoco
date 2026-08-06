class GoldChicken extends Chicken {
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_gold/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_gold/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_gold/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_gold/2_dead/dead.png"];

  constructor() {
    super();

    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }
}
