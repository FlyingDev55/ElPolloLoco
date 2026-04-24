class Character extends MovableObject {
  height = 280;
  y = 155;
  world;
  speed = 5;
  otherDirection = false;

  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  jump() {
    console.log("jumping");
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.right && this.x < this.world.level.levelWidth) {
        this.moveRight(this.speed);
        this.otherDirection = false;
      }

      if (this.world.keyboard.left && this.x > 0) {
        this.moveLeft(this.speed);
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.right || this.world.keyboard.left) {
        let path = this.IMAGES_WALKING[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage >= this.IMAGES_WALKING.length) {
          this.currentImage = 0;
        }
      }
    }, 70);
  }
}
