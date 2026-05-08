class Character extends MovableObject {
  height = 280;
  y = 152;
  world;
  speed = 5;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  coinCount = 0;

  energy = 100;

  offset = {
    top: 140,
    left: 25,
    right: 35,
    bottom: 20,
  };

  IMAGES_IDLE = ["../img/2_character_pepe/1_idle/idle/I-1.png"];

  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    // "../img/2_character_pepe/3_jump/J-31.png",
    // "../img/2_character_pepe/3_jump/J-32.png",
    // "../img/2_character_pepe/3_jump/J-33.png",
    // "../img/2_character_pepe/3_jump/J-34.png",
    // "../img/2_character_pepe/3_jump/J-35.png",
    // "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    // "../img/2_character_pepe/3_jump/J-38.png",
    // "../img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = ["../img/2_character_pepe/4_hurt/H-43.png"];

  IMAGES_DEAD = ["../img/2_character_pepe/5_dead/D-51.png"];

  constructor() {
    super();
    this.loadImage("../img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.calculateMovement();
    this.changeGraphics();
  }

  bounce() {
    this.speedY = 15;
  }

  collectCoin() {
    this.coinCount++;
  }

  calculateMovement() {
    setInterval(() => {
      if (this.isDead()) {
        return;
      }

      if (this.world.keyboard.right && this.x < this.world.level.levelWidth) {
        this.moveRight(this.speed);
      } else if (this.world.keyboard.left && this.x > 0) {
        this.moveLeft(this.speed);
      }

      if (this.world.keyboard.space && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  changeGraphics() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD, "currentImageDead");
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT, "currentImageHurt");
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING, "currentImageJumping");
      } else if (this.world.keyboard.right || this.world.keyboard.left) {
        this.playAnimation(this.IMAGES_WALKING, "currentImageWalking");
      } else {
        this.playAnimation(this.IMAGES_IDLE, "currentImageIdle");
      }
    }, 70);
  }
}
