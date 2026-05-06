class ThrowableObject extends MovableObject {
  height = 50;
  width = 50;
  speedY = 50;
  acceleration = 1.5;
  ground = 375;
  speed = 5;

  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
  ];

  IMAGES_BROKEN = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_BROKEN);
    this.applyGravity();
    this.animate();
  }

  offset = {
    top: 5,
    left: 15,
    right: 15,
    bottom: 5,
  };

  animate() {
    this.calculateMovement();
    this.changeGraphics();
  }

  calculateMovement() {
    this.moveInterval = setInterval(() => {
      if (this.isBroken()) {
        this.speed = 0;
        this.speedY = 0;
        this.isCollidable = false;
        return;
      }
      this.x += this.speed;
    }, 1000 / 60);
    this.speedY = 15;
  }

  changeGraphics() {
    this.graphicsInterval = setInterval(() => {
      if (this.isBroken()) {
        this.playAnimationOnce(this.IMAGES_BROKEN, "currentImageBottleBroken");
      } else {
        this.playAnimation(this.IMAGES_ROTATION, "currentImageBottleRotation");
      }
    }, 100);
  }

  isBroken() {
    return this.energy <= 0;
  }

  hit() {
    if (!this.isBroken()) {
      this.energy = 0;
      this.lastHit = Date.now();
      this.currentImageBottleBroken = 0;
    }
  }
}
