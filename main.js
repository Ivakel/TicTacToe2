let game = [
  [".", ".", "."],
  [".", ".", "."],
  [".", ".", "."],
];

const whichPlayer = { 0: "O", 1: "X" };

const coOrds = {
  ".s11": [0, 0],
  ".s12": [0, 1],
  ".s13": [0, 2],
  ".s21": [1, 0],
  ".s22": [1, 1],
  ".s23": [1, 2],
  ".s31": [2, 0],
  ".s32": [2, 1],
  ".s33": [2, 2],
};

const playerCross = 1;
const playerCircle = 0;
const wins = new Set(["ooo", "xxx"]);
const message = document.querySelector(".message");
const winner = document.querySelector(".winnner");
const announcer = document.querySelector(".announcer");

let turn = false;

let gameOn = true;
let counter = 0;

function getAvailMoves() {
  let moves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (game[i][j] === ".") {
        moves.push([i, j]);
      }
    }
  }
  console.log(moves);
  return moves;
}

function draw() {
  const equals = '<img src="img/equals.svg" alt="" class="equals"/>';
  winner.innerHTML = equals;
  message.innerHTML = "DRAW";
  announcer.classList.add("show-replay-btn");
}

//function play() {}

//Computer that plays stupid moves
function stupidComputer() {
  if (counter === 9) {
    draw();
    return;
  }
  let moves = getAvailMoves();

  let move = moves[Math.floor(Math.random() * moves.length)];
  const [a, b] = move;
  console.log(`.${a + 1}${b + 1}`);

  const btn = document.querySelector(`.s${a + 1}${b + 1}`);

  if (turn) {
    game[a][b] = "o";
    btn.innerHTML = '<img src="img/circle.png" alt="" />';
  } else {
    game[a][b] = "x";
    btn.innerHTML = '<img src="img/x-icon.png" alt="" />';
  }
  counter++;
  turn = !turn;
  gameOver();
}

function getGame() {
  let g = [];
  for (let i = 0; i < 3; i++) {
    let str = join(game[i]);
    g.push(str);
  }
  return g;
}

//Joins a row to a string
function join(row) {
  let r = ""; // string to append each row element
  for (let i = 0; i < 3; i++) {
    r += row[i];
  }
  // console.log(r);
  return r;
}

// Shows the announcer
function show(player) {
  let w = "";
  if (player === 1) {
    w = '<img src="img/cross2.png" alt="" />';
  } else {
    w = '<img src="img/circle.png" alt="" />';
  }
  winner.innerHTML = w;
  message.innerHTML = "WON";
  announcer.classList.add("show-replay-btn");
}

//Hides the annoncer
function hide() {
  announcer.classList.remove("show-replay-btn");
}

function getCols() {
  let cols = [];

  for (let i = 0; i < 3; i++) {
    let str = "";
    for (let j = 0; j < 3; j++) {
      str += game[j][i];
    }
    cols.push(str);
  }
  return cols;
}
function getCross1() {
  let n = 0;
  let str = "";

  while (n < 3) {
    str += game[n][n];
    n += 1;
  }
  return str;
}

function getCross2() {
  let n = 0;
  let str = "";

  while (n < 3) {
    str += game[2 - n][n];
    n += 1;
  }
  return str;
}

//Checks if there is a winner
function gameOver() {
  //check for each row
  for (let i = 0; i < 3; i++) {
    let str = join(game[i]);

    if (wins.has(str)) {
      //check if someone won
      if (str === "xxx") {
        show(1);
        return;
      }
      show(0);
      return;
    }
  }
  //check for each column and crosses
  let cols = getCols();

  cols.push(getCross1());
  cols.push(getCross2());
  console.log(cols);
  for (let i = 0; i < cols.length; i++) {
    let str = cols[i];
    if (wins.has(str)) {
      if (str === "xxx") {
        show(1);
        return;
      }
      show(0);
      return;
    }
  }
}

function makeMove(el) {
  const btn = document.querySelector("." + el.className);

  if (btn.innerHTML === "") {
    const [a, b] = coOrds["." + el.className];

    if (turn) {
      game[a][b] = "o";
      btn.innerHTML = '<img src="img/circle.svg" alt="" />';
    } else {
      game[a][b] = "x";
      btn.innerHTML = '<img src="img/cross2.png" alt="" class="circle"/>';
    }
    counter++;
    turn = !turn;
    gameOver();
    sleep(9000).then(() => {});
    stupidComputer();
  }
}

function myFunction(el) {
  makeMove(el);
}

// Time delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resetGame() {
  game = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
}
function resetSquare() {
  const squares = document.querySelectorAll("#square");

  squares.forEach((e) => {
    e.innerHTML = "";
  });
}
function replay() {
  resetGame();
  resetSquare();
  hide();
  turn = false;
  counter = 0;
}
