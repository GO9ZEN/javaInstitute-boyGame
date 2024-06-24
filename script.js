//////////////////////////////////////////////////////
function controller(event) {
  // Enter
  if (event.key == "Enter") {
    if (runWorkerNumber == 0) {
      run();
      runSound.play();

      updateScore();
      background();
      // flameCreateAndMove();
      flameLocations.forEach(flameCreateAndMove);
    }
  }

  // Jump
  if (event.key == " ") {
    if (jumpWorkerNumber == 0) {
      if (runWorkerNumber !== 0) {
        clearInterval(runWorkerNumber);
        runSound.pause();
        jump();
        jumpSound.play();
      }
    }
  }
}

//////////////////////////////////////////////////////
var runImageNumber = 1;
var runWorkerNumber = 0;
var runSound = new Audio("resources/run.mp3");
runSound.loop = true;

function run() {
  runWorkerNumber = setInterval(() => {
    runImageNumber = runImageNumber + 1;

    if (runImageNumber == 9) {
      runImageNumber = 1;
    }

    document.getElementById("boy").src =
      "resources/run" + runImageNumber + ".png";
  }, 150);
}

//////////////////////////////////////////////////////
var jumpImageNumber = 1;
var jumpWorkerNumber = 0;
var jumpSound = new Audio("resources/jump.mp3");
var jumpMarginTop = 540;

function jump() {
  jumpWorkerNumber = setInterval(() => {
    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber < 8) {
      jumpMarginTop = jumpMarginTop - 10;

      document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
    }

    if (jumpImageNumber > 7) {
      jumpMarginTop = jumpMarginTop + 10;

      document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
    }

    if (jumpImageNumber == 13) {
      jumpImageNumber = 1;
      clearInterval(jumpWorkerNumber);
      run();
      runSound.play();
      jumpWorkerNumber = 0;
    }

    document.getElementById("boy").src =
      "resources/jump" + jumpImageNumber + ".png";
  }, 100);
}

//////////////////////////////////////////////////////
var deadImageNumber = 1;
var deadWorkerNumber = 0;
var deadSound = new Audio("resources/dead.mp3");

function dead() {
  deadWorkerNumber = setInterval(() => {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber == 11) {
      deadImageNumber = 1;
      clearInterval(deadWorkerNumber);
      alert("Game Over!");
      window.location.reload();
    }

    document.getElementById("boy").src =
      "resources/dead" + deadImageNumber + ".png";
  }, 100);
}

//////////////////////////////////////////////////////
var scoreWorker = 0;
var score = 0;

function updateScore() {
  scoreWorker = setInterval(() => {
    if (score == 2000) {
      alert("You Won!");
      runSound.pause();
      window.location.reload();
    }

    score = score + 10;
    document.getElementById("score").innerHTML = score;
  }, 100);
}

//////////////////////////////////////////////////////
var backgroundWorker = 0;
var backgroundPosition = 0;

function background() {
  backgroundWorker = setInterval(() => {
    backgroundPosition = backgroundPosition - 20;
    document.getElementById("background").style.backgroundPositionX =
      backgroundPosition + "px";
  }, 100);
}

//////////////////////////////////////////////////////
var flameLocations = [500, 1000, 1500, 2000];
var flameWorker = 0;

function flameCreateAndMove(x) {
  var i = document.createElement("img");
  i.src = "resources/flame.gif";
  i.className = "flame";
  i.style.marginLeft = x + "px";

  document.getElementById("background").appendChild(i);

  flameWorker = setInterval(() => {
    if (x == 170) {
      if (jumpWorkerNumber == 0) {
        clearInterval(runWorkerNumber);
        runSound.pause();
        clearInterval(backgroundWorker);
        clearInterval(scoreWorker);
        dead();
        deadSound.play();
      }
    }

    x = x - 10;
    i.style.marginLeft = x + "px";
  }, 100);
}
