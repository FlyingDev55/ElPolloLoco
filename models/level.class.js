class Level {
  enemies;
  clouds;
  backgroundObjects;
  levelWidth = 4320;
  coins = [];

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
