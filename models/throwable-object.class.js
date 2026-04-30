class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.height = 50;
    this.width = 50;
    this.speedY = 50;
    this.acceleration = 1.5;
    this.applyGravity();
    this.ground = 360;
    this.throw(this.x + 50, 300);
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
