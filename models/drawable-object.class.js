class DrawableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = [];
  currentImageWalking = 0;
  currentImageJumping = 0;
  currentImageFalling = 0;
  currentImageIdle = 0;
  currentImageHurt = 0;
  currentImageDead = 0;
  currentImageBottleRotation = 0;
  currentImageBottleBroken = 0;
  currentImageRotate = 0;
  currentImageAlert = 0;
  currentImageAttack = 0;
  ground = 420;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    return this.img;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // drawFrame(ctx) {
  //   if (
  //     this instanceof Character ||
  //     this instanceof Chicken ||
  //     this instanceof ThrowableObject
  //   ) {
  //     const offset = this.offset ?? {
  //       top: 0,
  //       left: 0,
  //       right: 0,
  //       bottom: 0,
  //     };

  //     ctx.beginPath();
  //     ctx.lineWidth = "5";
  //     ctx.strokeStyle = "blue";

  //     ctx.rect(
  //       this.x + offset.left,
  //       this.y + offset.top,
  //       this.width - offset.left - offset.right,
  //       this.height - offset.top - offset.bottom,
  //     );

  //     ctx.stroke();

  //     if (this.bodyOffset) {
  //       const body = this.bodyOffset;

  //       ctx.beginPath();
  //       ctx.lineWidth = "5";
  //       ctx.strokeStyle = "red";

  //       ctx.rect(
  //         this.x + body.left,
  //         this.y + body.top,
  //         this.width - body.left - body.right,
  //         this.height - body.top - body.bottom,
  //       );

  //       ctx.stroke();
  //     }
  //   }
  // }
}
