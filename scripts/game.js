let canvas;
let world;
let keyboard;

function init() {}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  canvas = document.getElementById("canvas");
  canvas.style.display = "block";
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
    keyboard.space = true;
  }

  if (event.key === "d") {
    if (!keyboard.d) {
      keyboard.dPressedAt = Date.now();
    }
    keyboard.d = true;
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
  if (event.key === "d") {
    keyboard.d = false;

    const pressDuration = Date.now() - keyboard.dPressedAt;

    world.throwBottle(pressDuration);
  }
});
