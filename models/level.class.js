class Level {
  enemies;
  clouds;
  backgroundObjects;
  levelWidth = 2160;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
