class Cloud extends MovableObject {
  width = 500;
  height = 250;
  speed = 0.15;
  isCollidable = false;

  constructor(x, y) {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    this.calculateMovement();
  }

  calculateMovement() {
    this.moveInterval = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }
}
