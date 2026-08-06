class Character extends MovableObject {
  height = 280;
  y = 152;
  world;
  speed = 5;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  coinCount = 0;
  knockbackSpeed = 0;
  energy = 100;
  ground = 435;
  currentAnimation = "";
  lastY = 0;
  bottleCount = 0;
  idleSince = null;
  LONG_IDLE_THRESHOLD = 5000;

  offset = {
    top: 140,
    left: 25,
    right: 35,
    bottom: 20,
  };

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
  ];

  IMAGES_FALLING = [
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
  ];

  IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-43.png"];

  IMAGES_DEAD = ["img/2_character_pepe/5_dead/D-51.png"];

  constructor() {
    super();
    this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_FALLING);
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
    this.y -= 20;
    this.speedY = 15;
  }

  collectCoin() {
    if (this.coinCount < 5) {
      this.coinCount++;
    }
  }

  calculateMovement() {
    this.moveInterval = setInterval(() => {
      if (this.isDead()) {
        return;
      }
      this.applyKnockback();
      this.applyMovement();
      this.applyJump();
      this.applyBackgroundMovement();
    }, 1000 / 60);
  }

  applyBackgroundMovement() {
    const maxLeft = 0;
    const maxRight = -this.world.level.levelWidth + this.world.canvas.width;
    this.world.camera_x = Math.max(maxRight, Math.min(maxLeft, -this.x + 100));
  }

  applyMovement() {
    if (this.knockbackSpeed === 0) {
      if (this.world.keyboard.right && this.x < this.world.level.levelWidth) {
        this.moveRight(this.speed);
      } else if (this.world.keyboard.left && this.x > 0) {
        this.moveLeft(this.speed);
      }
    }
  }

  applyKnockback() {
    if (this.knockbackSpeed !== 0) {
      this.x += this.knockbackSpeed;
      this.x = Math.max(0, Math.min(this.x, this.world.level.levelWidth));

      this.knockbackSpeed *= 0.85;

      if (Math.abs(this.knockbackSpeed) < 1) {
        this.knockbackSpeed = 0;
      }
    }
  }

  applyJump() {
    if (this.world.keyboard.space && !this.isAboveGround()) {
      this.jump();
    }
  }

  isFalling() {
    return this.speedY < 0 && this.isAboveGround();
  }

  changeGraphics() {
    this.graphicsInterval = setInterval(() => {
      if (this.isDead()) {
        this.idleSince = null;
        this.playAnimationOncePerState(
          this.IMAGES_DEAD,
          "currentImageDead",
          "dead",
        );
      } else if (this.isHurt()) {
        this.idleSince = null;
        this.playAnimation(this.IMAGES_HURT, "currentImageHurt");
      } else if (this.isFalling()) {
        this.idleSince = null;
        this.playAnimationOncePerState(
          this.IMAGES_FALLING,
          "currentImageFalling",
          "falling",
        );
      } else if (this.isAboveGround()) {
        this.idleSince = null;
        this.playAnimationOncePerState(
          this.IMAGES_JUMPING,
          "currentImageJumping",
          "jumping",
        );
      } else if (this.world.keyboard.right || this.world.keyboard.left) {
        this.idleSince = null;
        this.playAnimation(this.IMAGES_WALKING, "currentImageWalking");
      } else {
        this.playIdleAnimation();
      }
    }, 70);
  }

  playIdleAnimation() {
    if (this.idleSince === null) {
      this.idleSince = Date.now();
    }

    if (Date.now() - this.idleSince >= this.LONG_IDLE_THRESHOLD) {
      this.playAnimation(this.IMAGES_LONG_IDLE, "currentImageLongIdle");
    } else {
      this.playAnimation(this.IMAGES_IDLE, "currentImageIdle");
    }
  }

  takeBossHit(enemy) {
    if (this.isHurt()) return;

    this.energy -= 20;

    this.lastHit = Date.now();

    this.bounceBack(enemy);
  }

  bounceBack(enemy) {
    this.speedY = 10;

    if (this.x < enemy.x) {
      this.knockbackSpeed = -15;
    }
  }

  loseCoins(amount) {
    this.coinCount -= amount;

    if (this.coinCount < 0) {
      this.coinCount = 0;
    }

    this.world.statusBarCoin.setPercentage(this.coinCount * 20);
  }

  hit() {
    if (this.isHurt()) return;

    super.hit();

    this.loseCoins(1);
  }

  collectBottle() {
    this.bottleCount = 100;
  }
}
