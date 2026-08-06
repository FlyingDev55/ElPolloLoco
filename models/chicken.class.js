class Chicken extends MovableObject {
  y = 360;
  height = 70;
  width = 70;
  energy = 2;
  hasCoin = false;
  coinDropped = false;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  offset = {
    top: 20,
    left: 10,
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
    this.x = 800 + Math.random() * 3000;
  }

  createRandomSpeedOnSpawn() {
    this.speed = 0.8 + Math.random() * 0.25;
  }

  animate() {
    this.calculateMovement();
    this.changeGraphics();
  }

  calculateMovement() {
    this.moveInterval = setInterval(() => {
      if (this.isDead()) {
        this.speed = 0;
        this.isCollidable = false;
        return;
      }
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }

  changeGraphics() {
    this.graphicsInterval = setInterval(() => {
      if (this.isDead()) {
        this.playAnimationOnce(this.IMAGES_DEAD, "currentImageDead");
      } else {
        this.playAnimation(this.IMAGES_WALKING, "currentImageWalking");
      }
    }, 200);
  }

  hit() {
    super.hit();

    if (this.isDead() && this.hasCoin && !this.coinDropped) {
      this.coinDropped = true;

      if (this.world) {
        let coin = new Coin();
        coin.world = this.world;
        coin.x = this.x + this.width / 2 - coin.width / 2;
        coin.y = this.y - 20;
        coin.speedY = 12;
        coin.applyGravity();
        setTimeout(() => {
          coin.isCollectable = true;
        }, 500);
        this.world.level.coins.push(coin);
      }
    }
  }
}
