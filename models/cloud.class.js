class Cloud extends MovableObject {
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.y = Math.random() * 100;
    this.x = Math.random() * 500;
  }
}
