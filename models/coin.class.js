class Coin extends MovableObject {
  IMAGES_ROTATE = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  width = 100;
  height = 100;
  acceleration = 2;

  constructor() {
    super();
    this.loadImages(this.IMAGES_ROTATE);
    this.animate();
  }

  animate() {
    this.changeGraphics();
  }

  changeGraphics() {
    this.graphicsInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATE, "currentImageRotate");
    }, 200);
  }
}
