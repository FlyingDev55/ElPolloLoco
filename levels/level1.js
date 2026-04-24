const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken()],
  [new Cloud(), new Cloud(), new Cloud()],
  createBackgroundObjects(),
);

function createBackgroundObjects() {
  const baseLayerPaths = [
    "../img/5_background/layers/air.png",
    "../img/5_background/layers/3_third_layer/",
    "../img/5_background/layers/2_second_layer/",
    "../img/5_background/layers/1_first_layer/",
  ];

  const objects = [];

  for (let i = -3; i <= 3; i++) {
    baseLayerPaths.forEach((basePath, index) => {
      // air.png hat keine Nummer
      if (index === 0) {
        objects.push(new BackgroundObject(basePath, i * 720));
      } else {
        // Berechne die Nummer (1 oder 2) basierend auf i
        const imageNumber = Math.abs(i) % 2 === 0 ? 1 : 2;
        objects.push(
          new BackgroundObject(`${basePath}${imageNumber}.png`, i * 720),
        );
      }
    });
  }

  return objects;
}
