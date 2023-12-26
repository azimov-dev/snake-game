// canvas
const canvas = document.getElementById("canvas");
// canvas 2d
const context = canvas.getContext("2d");

// max Score
const mScore = document.getElementById("score");

// o'yin maydonidagi o'lcham
var grid = 16;
var count = 0;
var score = 0;
var max = 0;

// snake
const snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,

  maxCells: 1,

  cells: [],
};

// ovqat
const food = {
  x: 320,
  y: 320,
};

// random son olish uchun
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  snake.x += snake.dx;
  snake.y += snake.dy;

  // gorizontal
  if (snake.x < 0) {
    snake.x = canvas.clientWidth - grid;
  } else if (snake.x >= canvas.clientWidth) {
    snake.x = 0;
  }

  // vertikal
  if (snake.y < 0) {
    snake.y = canvas.clientHeight - grid;
  } else if (snake.y >= canvas.clientHeight) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y }); // uzunligini oshirish uchun
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  //ovqat rangi
  context.fillStyle = "#fff";
  context.fillRect(food.x, food.y, grid - 1, grid - 1);

  // snake style
  context.fillStyle = "green";
  context.strokeStyle = "black";

  snake.cells.forEach(function (cell, index) {
    context.strokeText("instagram: azimov_o6", 10, 20);
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    if (cell.x === food.x && cell.y === food.y) {
      // snakeni uzunligi
      snake.maxCells++;
      // ochko
      score += 1;
      mScore.innerHTML = score;

      food.x = getRandomInt(0, 25) * grid;
      food.y = getRandomInt(0, 25) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        if (score > max) {
          max = score;
        }
        (snake.x = 160), (snake.y = 160), (snake.cells = []);
        snake.maxCells = 1;
        snake.dx = grid;
        snake.dy = 0;
        score = 0;
        food.x = getRandomInt(0, 25) * grid;
        food.y = getRandomInt(0, 25) * grid;
        mScore.innerHTML = max;
      }
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 37 && snake.dx === 0) {
    // chap
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.keyCode === 38 && snake.dy === 0) {
    // tepa
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.keyCode === 39 && snake.dx === 0) {
    // o'ng
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.keyCode === 40 && snake.dy === 0) {
    // past
    snake.dy = grid;
    snake.dx = 0;
  } else {
    return;
  }
});

requestAnimationFrame(loop);
