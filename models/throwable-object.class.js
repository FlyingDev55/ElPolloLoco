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
    this.throw();
  }

  offset = {
    top: 5,
    left: 15,
    right: 15,
    bottom: 5,
  };

  throw() {
    this.speedY = 15;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
