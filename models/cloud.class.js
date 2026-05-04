class Cloud extends MovableObject {
  width = 500;
  height = 250;
  speed = 0.15;

  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.y = Math.random() * 100;
    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }
}
