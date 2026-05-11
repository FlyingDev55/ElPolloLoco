class World {
  character;
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusbar;
  statusbarBoss;
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.character = new Character();
    this.statusbar = new StatusBar();
    this.statusbarBoss = new StatusBar(true, 510, 10);
    this.setWorld();
    this.startCloudSpawning();
    this.draw();
    this.run();
  }

  throwBottle(duration) {
    const maxTime = 3000;
    const limitedDuration = Math.min(duration, maxTime);
    const power = limitedDuration / maxTime;

    let throwableObject = new ThrowableObject(
      this.character.x + 50,
      this.character.y + 150,
    );
    throwableObject.speed = 5 + power * 10;
    throwableObject.speedY = 10 + power * 10;

    this.throwableObjects.push(throwableObject);
  }

  startCloudSpawning() {
    this.scheduleNextCloud();
  }

  scheduleNextCloud() {
    setTimeout(() => {
      this.spawnCloud();
      this.scheduleNextCloud();
    }, this.getRandomCloudSpawningTime());
  }

  getRandomCloudSpawningTime() {
    return 1000 + Math.random() * 4000;
  }

  spawnCloud() {
    const rightEdge = -this.camera_x + this.canvas.width;
    let cloudPositionX = rightEdge + 200;
    let cloudPositionY = Math.random() * 150;
    let cloud = new Cloud(cloudPositionX, cloudPositionY);
    cloud.speed = cloud.speed + Math.random() * 0.3;

    this.level.clouds.push(cloud);
  }

  addEnemy(enemy) {
    enemy.world = this;
    this.level.enemies.push(enemy);
  }

  setWorld() {
    this.character.world = this;

    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCoinCollisions();
      this.checkThrowableObjectCollisions();
      this.cleanUpThrowableObjects();
      this.cleanUpEnemies();
      this.cleanUpClouds();
    }, 100);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isCollidingFromAbove(enemy)) {
        console.log("Jumping on enemy!", enemy);
        this.character.bounce();
        AudioHub.playOne(AudioHub.CHICKENDEAD);
        enemy.hit();
      } else if (this.character.isColliding(enemy)) {
        console.log("Collision with enemy!", enemy);
        this.character.hit();

        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

  checkCoinCollisions() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        return false;
      }
      return true;
    });
  }

  checkThrowObjects() {
    if (this.keyboard.d) {
      console.log("Throwing object!");
      let throwableObject = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
      );
      this.throwableObjects.push(throwableObject);
    }
  }

  checkThrowableObjectCollisions() {
    this.throwableObjects.forEach((throwableObject, index) => {
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          console.log("Throwable object hit enemy!", enemy);
          throwableObject.hit();
          enemy.hit();

          if (enemy instanceof Endboss) {
            this.statusbarBoss.setPercentage(enemy.energy);
          }
        }
      });
    });
  }

  cleanUpThrowableObjects() {
    this.throwableObjects = this.throwableObjects.filter((obj) => {
      if (!obj.isBroken()) return true;

      return Date.now() - obj.lastHit < 1000;
    });
  }

  cleanUpEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (enemy.isDead()) {
        if (Date.now() - enemy.lastHit > 3000) {
          enemy.destroy();
          return false;
        }
        return true;
      }

      if (enemy instanceof Endboss) return true;

      const screenX = enemy.x + this.camera_x;

      if (screenX < -600) {
        enemy.destroy();
        return false;
      }

      return true;
    });
  }

  cleanUpClouds() {
    this.level.clouds = this.level.clouds.filter((cloud) => {
      const screenX = cloud.x + this.camera_x;
      if (screenX < -600) {
        cloud.destroy();
        return false;
      }

      return true;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    if (this.shouldShowBossBar()) {
      this.addToMap(this.statusbarBoss);
    }
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  shouldShowBossBar() {
    const boss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    return boss && Math.abs(this.character.x - boss.x) < 600;
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(movableObject) {
    if (!movableObject?.img) {
      console.warn("Kein Bild für Objekt:", movableObject);
      return;
    }

    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }

    movableObject.draw(this.ctx);
    // movableObject.drawFrame(this.ctx);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}
