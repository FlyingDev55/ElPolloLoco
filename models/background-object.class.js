class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  x = 0;
  y = 0;
  isCollidable = false;

  constructor(imagePath, xCoordinate) {
    super();
    this.loadImage(imagePath);
    this.x = xCoordinate;
  }
}
