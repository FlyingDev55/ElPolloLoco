class Bottle extends DrawableObject {
  width = 60;
  height = 80;
  y = 350;
  isCollectable = true;

  offset = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 10,
  };

  constructor(x) {
    super();

    this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");

    this.x = x;
    console.log("Bottle created at x: ", this.x, " and y: ", this.y);
  }
}
