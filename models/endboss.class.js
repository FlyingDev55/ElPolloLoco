class Endboss extends Chicken {
  y = 60;
  height = 400;
  width = 400;
  energy = 100;
  speed = 0;
  DEFAULT_LOCATION = 4000;
  isAttacking = false;
  isReturning = false;
  attackTargetX = 0;
  agroDistance = 250;
  recentHits = [];
  rageThreshold = 3;
  attackSpeed = 8;
  returnSpeed = 4;
  rageTimeWindow = 3000;
  isAlerted = false;
  hasSeenCharacter = false;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACKING = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  offset = {
    top: 80,
    left: 40,
    right: 270,
    bottom: 200,
  };

  bodyOffset = {
    top: 200,
    left: 70,
    right: 250,
    bottom: 100,
  };

  constructor() {
    super();
    this.loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.x = this.DEFAULT_LOCATION;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.startSpawning();
    this.startAiLoop();
  }

  changeGraphics() {
    this.graphicsInterval = setInterval(() => {
      if (this.isDead()) {
        this.playAnimationOnce(this.IMAGES_DEAD, "currentImageDead");
        return;
      }

      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT, "currentImageHurt");
        return;
      }

      if (this.isAlerted) {
        this.playAnimation(this.IMAGES_ALERT, "currentImageAlert");
        return;
      }

      if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACKING, "currentImageAttack");
        return;
      }

      if (this.isReturning) {
        this.playAnimation(this.IMAGES_WALKING, "currentImageWalking");
        return;
      }

      this.img = this.imageCache["img/4_enemie_boss_chicken/1_walk/G1.png"];
    }, 120);
  }

  startAiLoop() {
    this.aiInterval = setInterval(() => {
      if (this.isDead()) return;

      if (this.isCharacterTooClose() && !this.hasSeenCharacter) {
        this.enterAlertMode();
      }
    }, 200);
  }

  enterAlertMode() {
    this.hasSeenCharacter = true;
    this.isAlerted = true;

    setTimeout(() => {
      if (!this.isDead()) {
        this.startAttack();
      }
    }, 1000);
  }

  isCharacterTooClose() {
    if (!this.world) return false;

    const distance = Math.abs(this.x - this.world.character.x);

    return distance < this.agroDistance;
  }

  startSpawning() {
    this.scheduleNextSpawn();
  }

  scheduleNextSpawn() {
    this.spawnTimeout = setTimeout(() => {
      this.spawnChicken();
      this.scheduleNextSpawn();
    }, this.getRandomSpawnTime());
  }

  startAttack() {
    if (!this.world || this.isDead()) return;

    if (this.isAttacking || this.isReturning) return;

    this.isAlerted = false;
    this.isAttacking = true;

    const randomExtraDistance = Math.random() * 250;

    this.attackTargetX = Math.max(
      200,
      this.world.character.x - randomExtraDistance,
    );

    this.speed = 10;
  }

  spawnChicken() {
    if (!this.world) return;

    let chicken;
    if (Math.random() < 0.5) {
      chicken = new Chicken();
      chicken.y = 360;

      if (Math.random() < 1 / 3) {
        chicken.speed *= 5;
        chicken.hasCoin = true;
      }
    } else {
      chicken = new MiniChicken();
      chicken.y = 385;
    }
    chicken.x = this.x + this.width - 80;
    this.world.addEnemy(chicken);
  }

  getRandomSpawnTime() {
    return 1000 + Math.random() * 2000;
  }

  calculateMovement() {
    this.moveInterval = setInterval(() => {
      if (this.isDead()) {
        this.speed = 0;
        this.isCollidable = false;
        return;
      }

      if (this.isAttacking) {
        this.moveLeft(this.attackSpeed);

        if (this.x <= this.attackTargetX) {
          this.isAttacking = false;
          this.isReturning = true;
        }

        return;
      }

      if (this.isReturning) {
        this.moveRight(this.returnSpeed);

        if (this.x >= this.DEFAULT_LOCATION - 5) {
          this.x = this.DEFAULT_LOCATION;

          this.isReturning = false;
          this.hasSeenCharacter = false;

          this.speed = 0;
        }

        return;
      }
    }, 1000 / 60);
  }

  hit() {
    super.hit();

    this.registerHitReaction();
  }

  registerHitReaction() {
    const now = Date.now();

    this.recentHits.push(now);

    this.recentHits = this.recentHits.filter(
      (time) => now - time < this.rageTimeWindow,
    );

    if (this.recentHits.length >= this.rageThreshold) {
      this.startAttack();

      this.recentHits = [];
    }
  }

  stopAttack() {
    this.isAttacking = false;
    this.isReturning = true;
  }
}
