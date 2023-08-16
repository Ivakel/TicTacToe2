let game = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const whichPlayer = { 0: "O", 1: "X" };

const coOrds = {
  ".s11": [0, 0],
  ".s12": [0, 1],
  ".s13": [0, 3],
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
const announcer = document.querySelector(".announcer");

let turn = false;

let gameOn = true;
let counter = 0;

//Joins a row to a string
function join(row) {
  let r = ""; // string to append each row element
  for (let i = 0; i < 3; i++) {
    r += row[i];
  }
  return r;
}

function winner(player) {
  let w = "";
  if (player === 1) {
    w = "X";
  } else {
    w = "O";
  }
  announcer.innerHTML = w + " HAS WON!!!";
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

function gameOver() {
  //check for each row
  for (let i = 0; i < 3; i++) {
    let str = join(game[i]);

    if (wins.has(str)) {
      //check if someone won
      if (str === "xxx") {
        winner(1);
        return;
      }
      winner(0);
      return;
    }
  }
  //check for each column and crosses
  let cols = getCols();
  let n = 0;
  let str = "";

  while (n < 3) {
    str += game[n][n];
    n += 1;
  }
  cols.push(str);

  n = 0;
  str = "";

  while (n < 3) {
    str += game[n][2 - n];
    n += 1;
  }
  cols.push(str);

  for (let i = 0; i < 3; i++) {
    let str = cols[i];
    if (wins.has(str)) {
      if (str === "xxx") {
        winner(1);
      }
      winner(0);
      return;
    }
  }
}

function myFunction(el) {
  const btn = document.querySelector("." + el.className);
  //btn.innerHTML = '<img src="img/circle.png" alt="" />';
  if (btn.innerHTML === "") {
    if (turn) {
      [a, b] = coOrds["." + el.className];
      game[(a, b)] = "o";
      btn.innerHTML = '<img src="img/circle.png" alt="" />';
    } else {
      [a, b] = coOrds["." + el.className];
      game[(a, b)] = "x";
      btn.innerHTML = '<img src="img/x-icon.png" alt="" />';
    }
    counter++;
    turn = !turn;

    gameOver();
  }
  if (counter >= 9) {
    // announcer.innerHTML = game;
    console.log(game);
  }
}
