let canvas;
let world;
let keyboard;

function init() {
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  console.log("My world is: ", world.character);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    keyboard.right = true;
  }
  if (event.key === "ArrowLeft") {
    keyboard.left = true;
  }

  if (event.key === " ") {
    world.character.jump();
    keyboard.space = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight") {
    keyboard.right = false;
  }
  if (event.key === "ArrowLeft") {
    keyboard.left = false;
  }
  if (event.key === " ") {
    keyboard.space = false;
  }
});
