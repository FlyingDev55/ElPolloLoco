let canvas;
let world;
let keyboard;

function init() {}

function startGame() {
  document.body.classList.add("game-running");
  document.getElementById("start-screen").style.display = "none";
  canvas = document.getElementById("canvas");
  canvas.style.display = "block";
  keyboard = new Keyboard();
  world = new World(canvas, keyboard, createLevel1());

  initMobileControls();
  console.log("My world is: ", world.character);
}

function restartGame() {
  document.body.classList.add("game-running");
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "none";

  if (world?.stopAllIntervals) {
    world.stopAllIntervals();
  }

  canvas = document.getElementById("canvas");
  canvas.style.display = "block";
  keyboard = new Keyboard();
  world = new World(canvas, keyboard, createLevel1());
  initMobileControls();
}

function goToStartScreen() {
  document.body.classList.remove("game-running");
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";

  canvas = document.getElementById("canvas");
  canvas.style.display = "none";

  if (world?.stopAllIntervals) {
    world.stopAllIntervals();
  }
  world = null;
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

function initMobileControls() {
  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnJump = document.getElementById("btn-jump");
  const btnThrow = document.getElementById("btn-throw");

  btnLeft.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.left = true;
  });

  btnLeft.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.left = false;
  });

  btnRight.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.right = true;
  });

  btnRight.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.right = false;
  });

  btnJump.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.space = true;
  });

  btnJump.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.space = false;
  });

  btnThrow.addEventListener("touchstart", (e) => {
    e.preventDefault();

    if (!keyboard.d) {
      keyboard.dPressedAt = Date.now();
    }

    keyboard.d = true;
  });

  btnThrow.addEventListener("touchend", (e) => {
    e.preventDefault();

    keyboard.d = false;

    const pressDuration = Date.now() - keyboard.dPressedAt;

    world.throwBottle(pressDuration);
  });
}

function showControls() {
  document.getElementById("controls-modal").style.display = "flex";
}

function closeControls() {
  document.getElementById("controls-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("controls-modal");
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeControls();
    }
  });
});
