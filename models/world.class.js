class World {
  character;
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusbar = new StatusBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.character = new Character();
    this.setWorld();
    this.draw();
    this.run();
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
      this.checkThrowObjects();
      this.checkThrowableObjectCollisions();
      this.cleanUpThrowableObjects();
      this.cleanUpEnemies();
    }, 100);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isCollidingFromAbove(enemy)) {
        console.log("Jumping on enemy!", enemy);
        this.character.bounce();
        enemy.hit();
      } else if (this.character.isColliding(enemy)) {
        console.log("Collision with enemy!", enemy);
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
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
      if (enemy instanceof Endboss) return true;

      const screenX = enemy.x + this.camera_x;

      if (screenX < -600) {
        enemy.destroy();
        return false;
      }

      return true;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
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
    movableObject.drawFrame(this.ctx);

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
