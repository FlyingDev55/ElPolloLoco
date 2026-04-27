class Character extends MovableObject {
  height = 280;
  y = 152;
  world;
  speed = 5;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  ground = 152;

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

  constructor() {
    super();
    this.loadImage("../img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < this.ground;
  }

  animate() {
    this.calculateMovement();
    this.changeGraphics();
  }

  calculateMovement() {
    setInterval(() => {
      if (this.world.keyboard.right && this.x < this.world.level.levelWidth) {
        this.moveRight(this.speed);
      }
      if (this.world.keyboard.left && this.x > 0) {
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
      if (this.isAboveGround()) {
        let path = this.IMAGES_JUMPING[this.currentImageJumping];
        this.img = this.imageCache[path];
        this.currentImageJumping++;
        if (this.currentImageJumping >= this.IMAGES_JUMPING.length) {
          this.currentImageJumping = 0;
        }
      } else if (this.world.keyboard.right || this.world.keyboard.left) {
        let path = this.IMAGES_WALKING[this.currentImageWalking];
        this.img = this.imageCache[path];
        this.currentImageWalking++;
        if (this.currentImageWalking >= this.IMAGES_WALKING.length) {
          this.currentImageWalking = 0;
        }
      } else {
        let path = this.IMAGES_IDLE[this.currentImageIdle];
        this.img = this.imageCache[path];
        this.currentImageIdle++;
        if (this.currentImageIdle >= this.IMAGES_IDLE.length) {
          this.currentImageIdle = 0;
        }
      }
    }, 70);
  }
}
