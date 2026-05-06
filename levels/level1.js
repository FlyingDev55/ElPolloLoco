const levelMap = new Map([
  [1, 4320],
  [2, 8640],
  [3, 17280],
]);

const listOfStartChicken = [
  new Chicken(),
  new Chicken(),
  new Chicken(),
  new Chicken(),
  new Chicken(),
  new Chicken(),
  new MiniChicken(),
  new MiniChicken(),
  new MiniChicken(),
  new MiniChicken(),
  new MiniChicken(),
  new Endboss(),
];

const level1 = new Level(
  listOfStartChicken,
  [new Cloud(), new Cloud(), new Cloud()],
  createBackgroundObjects(1),
);
level1.levelWidth = levelMap.get(1);

function createBackgroundObjects(levelNumber) {
  const baseLayerPaths = [
    "../img/5_background/layers/air.png",
    "../img/5_background/layers/3_third_layer/",
    "../img/5_background/layers/2_second_layer/",
    "../img/5_background/layers/1_first_layer/",
  ];

  const objects = [];

  const tileWidth = 720;
  const levelWidth = levelMap.get(levelNumber);

  const maxTiles = levelWidth / tileWidth;

  for (let i = -1; i <= maxTiles; i++) {
    baseLayerPaths.forEach((basePath, index) => {
      if (index === 0) {
        objects.push(new BackgroundObject(basePath, i * tileWidth));
      } else {
        const imageNumber = Math.abs(i) % 2 === 0 ? 1 : 2;
        objects.push(
          new BackgroundObject(`${basePath}${imageNumber}.png`, i * tileWidth),
        );
      }
    });
  }

  return objects;
}
