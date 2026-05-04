class Chicken extends MovableObject {
  y = 360;
  height = 70;
  width = 70;
  energy = 2;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["../img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  offset = {
    top: 20,
    left: 15,
    right: 15,
    bottom: 15,
  };

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.createRandomLocationForSpawn();
    this.createRandomSpeedOnSpawn();
    this.animate();
  }

  createRandomLocationForSpawn() {
    this.x = 400 + Math.random() * 500;
  }

  createRandomSpeedOnSpawn() {
    this.speed = 0.3 + Math.random() * 0.25;
  }

  animate() {
    this.calculateMovement();
    this.changeGraphics();
  }

  calculateMovement() {
    setInterval(() => {
      if (this.isDead()) {
        this.speed = 0;
        this.isCollidable = false;
        return;
      }
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }

  changeGraphics() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD, "currentImageDead");
      } else {
        this.playAnimation(this.IMAGES_WALKING, "currentImageWalking");
      }
    }, 200);
  }
}
