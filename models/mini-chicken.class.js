class MiniChicken extends Chicken {
  y = 385;
  height = 40;
  width = 40;
  energy = 1;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  offset = {
    top: 10,
    left: 5,
    right: 5,
    bottom: 5,
  };

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.createRandomLocationForSpawn();
    this.createRandomSpeedOnSpawn();
    this.animate();
  }

  createRandomLocationForSpawn() {
    this.x = 800 + Math.random() * 3000;
  }

  createRandomSpeedOnSpawn() {
    this.speed = 1 + Math.random() * 0.5;
  }
}
