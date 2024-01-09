const snakeBoardEle = document.getElementById("snakeboard");
const SIZE = 20;
let score = 0;
let foodCoord = [];
let lastKeyPress = null;
let highestScore = localStorage.getItem("highestScore") || 0;
let snake = [
  [0, 3],
  [0, 2],
  [0, 1],
  [0, 0],
];

document.getElementById("highestScore").innerText = highestScore;

// To Create Board
for (let i = 0; i < SIZE; i++) {
  const row = document.createElement("div");
  row.setAttribute("class", "row");
  for (let j = 0; j < SIZE; j++) {
    const divEle = document.createElement("div");
    divEle.setAttribute("class", "cell");
    divEle.setAttribute("id", `cell-${i}-${j}`);
    row.appendChild(divEle);
  }
  snakeBoardEle.appendChild(row);
}

// To Create Snake
function createSnake(list) {
  for (let v of list) {
    addSnakeCell(v[0], v[1]);
  }
}
createSnake(snake);

// To get new food Coordinates
function createFoodCoord() {
  foodCoord = [
    Math.floor(Math.random() * SIZE),
    Math.floor(Math.random() * SIZE),
  ];
  if (snake.join("-").includes(foodCoord.toString())) {
    //matches the exiting one call again
    createFoodCoord();
  }
}

function showFood() {
  createFoodCoord();
  const divEle = document.getElementById(
    `cell-${foodCoord[0]}-${foodCoord[1]}`
  );
  divEle.classList.add("food");
}

showFood();

function removeLastEntry(i, j) {
  const divEle = document.getElementById(`cell-${i}-${j}`);
  divEle.classList.remove("snake-part");
}

function addSnakeCell(i, j) {
  const divEle = document.getElementById(`cell-${i}-${j}`);
  divEle.classList.add("snake-part");
}

function moveSnake(x, y, keyCode) {
  addSnakeCell(x, y);
  lastKeyPress = keyCode;
  snake.unshift([x, y]);
  if (x === foodCoord[0] && y === foodCoord[1]) {
    // Add Snake Length
    score++;
    const divEle = document.getElementById(`cell-${x}-${y}`);
    divEle.classList.remove("food");
    document.getElementById("score").innerText = score;
    showFood();
  } else {
    removeLastEntry(...snake.pop());
  }
}

function checkScore() {
  alert("Game Over");
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    document.getElementById("highestScore").innerText = highestScore;
  }
  location.reload();
  return;
}

document.addEventListener("keypress", (event) => {
  let firstEntry = snake[0];
  switch (event.keyCode) {
    case 97: {
      // Left
      if (lastKeyPress != 100) {
        if (firstEntry[1] === 0) {
          checkScore();
        }
        let x = firstEntry[0];
        let y = firstEntry[1] - 1;
        moveSnake(x, y, event.keyCode);
        break;
      }
    }
    case 119: {
      // Top
      if (lastKeyPress != 115) {
        if (firstEntry[0] === 0) {
          checkScore();
        }
        let x = firstEntry[0] - 1;
        let y = firstEntry[1];
        moveSnake(x, y, event.keyCode);
        break;
      }
    }
    case 100: {
      // Right
      if (lastKeyPress != 97) {
        if (firstEntry[1] === SIZE - 1) {
          checkScore();
        }
        let x = firstEntry[0];
        let y = firstEntry[1] + 1;
        moveSnake(x, y, event.keyCode);
        break;
      }
    }
    case 115: {
      // Bottom
      if (lastKeyPress != 119) {
        if (firstEntry[0] === SIZE - 1) {
          checkScore();
        }
        let x = firstEntry[0] + 1;
        let y = firstEntry[1];
        moveSnake(x, y, event.keyCode);
        break;
      }
    }
  }
});
