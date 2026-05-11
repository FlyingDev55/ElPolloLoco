class Endboss extends Chicken {
  y = 60;
  height = 400;
  width = 400;
  energy = 100;
  speed = 0;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
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

  constructor() {
    super();
    this.loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 4000;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.startSpawning();
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
}
