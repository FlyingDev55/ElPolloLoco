const levelMap = new Map([
  [1, 4320],
  [2, 8640],
  [3, 17280],
]);

const BOTTLE_SPAWN_COUNT = 12;
const BOTTLE_MIN_SPACING = 200;
const BOTTLE_SPAWN_START_X = 300;

function createLevel1() {
  const endboss = new Endboss();

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
    endboss,
  ];

  const cloudsAtStart = createCloudsAtStart(levelMap.get(1));

  const level = new Level(
    listOfStartChicken,
    cloudsAtStart,
    createBackgroundObjects(1),
  );

  level.levelWidth = levelMap.get(1);

  level.bottles = createBottles(
    BOTTLE_SPAWN_COUNT,
    BOTTLE_SPAWN_START_X,
    endboss.DEFAULT_LOCATION,
    BOTTLE_MIN_SPACING,
  );

  return level;
}

function createBottles(count, minX, maxX, minSpacing) {
  const positions = [];
  const maxAttempts = count * 30;
  let attempts = 0;

  while (positions.length < count && attempts < maxAttempts) {
    attempts++;

    const x = minX + Math.random() * (maxX - minX);
    const tooClose = positions.some(
      (existingX) => Math.abs(existingX - x) < minSpacing,
    );

    if (!tooClose) {
      positions.push(x);
    }
  }

  return positions.map((x) => new Bottle(x));
}

const level1 = createLevel1();

function createCloudsAtStart(levelWidth) {
  const clouds = [];
  const spacing = 400;

  for (let x = 0; x < levelWidth; x += spacing) {
    const randomOffset = Math.random() * 200;
    const cloudX = x + randomOffset;
    const cloudY = Math.random() * 150;

    clouds.push(new Cloud(cloudX, cloudY));
  }

  return clouds;
}

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
