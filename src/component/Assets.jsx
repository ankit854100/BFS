import minDest from "./FormulaFunctions";
import blackCoordinates1, {
  blackCoordinates2,
  blackCoordinates3,
  blackCoordinates4,
  blackCoordinates5
} from "./levels";

const dimension = { w: 300, h: 300 };

let blackCoordinates;

// for making clicked path grey
let path = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];
// app.jsx line 92
let target = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

// app.jsx line 93
let start = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0]
];

const rows = 6;
const col = 6;
const factor = 50;
let possibleXY = [0, 50, 100, 150, 200, 250, 300];

let mouse = { x: 0, y: 0, state: 0 };
let shortestPath = 0;

function createDestinations() {
  let x = possibleXY[Math.floor(Math.random() * rows)];
  let y = possibleXY[Math.floor(Math.random() * col)];

  while (
    blackCoordinates[y / factor][x / factor] === 1 ||
    start[y / factor][x / factor] === 1
  ) {
    x = possibleXY[Math.floor(Math.random() * rows)];
    y = possibleXY[Math.floor(Math.random() * col)];
  }

  target[y / factor][x / factor] = 1;

  // console.log("coordinates: ", x, y);
  // console.log("indexes:", y / factor, x / factor);
  shortestPath = minDest(blackCoordinates, {
    x: y / factor,
    y: x / factor
  });
  // console.log("shortest path: ", shortestPath);
}

// for drawing visited path and black blocks
function drawBlock(ctx, color, coordinates) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      if (coordinates[i][j] === 1) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = "lightgrey";
        ctx.fillRect(j * factor, i * factor, factor, factor);
        ctx.strokeRect(j * factor, i * factor, factor, factor);
        ctx.closePath();
      }
    }
  }
}

function drawGrid(ctx) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "lightgrey";
      ctx.fillRect(j * factor, i * factor, factor, factor);
      ctx.strokeRect(j * factor, i * factor, factor, factor);
      ctx.closePath();
    }
  }
}

function resetPath() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      path[i][j] = 0;
      target[i][j] = 0;
    }
  }
  mouse.x = 0;
  minDest.y = 0;
  mouse.state = 0;
  shortestPath = 0;
}

function loadLevels(level) {
  if (level === 1) {
    blackCoordinates = blackCoordinates1;
  } else if (level === 2) {
    blackCoordinates = blackCoordinates2;
  } else if (level === 3) {
    blackCoordinates = blackCoordinates3;
  } else if (level === 4) {
    blackCoordinates = blackCoordinates4;
  } else if (level === 5) {
    blackCoordinates = blackCoordinates5;
  }
}

export default dimension;
export {
  blackCoordinates,
  path,
  possibleXY,
  drawBlock,
  mouse,
  shortestPath,
  drawGrid,
  createDestinations,
  factor,
  start,
  target,
  rows,
  col,
  resetPath,
  loadLevels
};

// const blackCoordinates = [
//   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
//   [0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
//   [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
//   [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
//   [0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
//   [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
//   [0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
//   [1, 1, 0, 1, 0, 0, 1, 0, 0, 0],
//   [0, 0, 0, 1, 0, 0, 0, 1, 0, 0]
// ];

// possible destinations
// const possibleDestination = [
//   [13, 14, 15, 16, 17, 0, 31, 30, 29, 30],
//   [12, 13, 14, 15, 16, 0, 30, 29, 28, 29],
//   [11, 0, 0, 16, 17, 0, 0, 0, 27, 28],
//   [10, 11, 12, 0, 0, 17, 0, 25, 26, 27],
//   [9, 0, 13, 14, 15, 16, 0, 24, 25, 26],
//   [8, 7, 0, 0, 16, 17, 0, 23, 24, 25],
//   [7, 6, 5, 0, 17, 0, 0, 22, 23, 24],
//   [8, 0, 4, 0, 18, 19, 20, 21, 0, 25],
//   [0, 0, 3, 0, 19, 20, 0, 22, 23, 24],
//   [0, 1, 2, 0, 20, 21, 22, 0, 24, 25]
// ];

// function findClosetPath(x, y) {
//   let n = x / factor;
//   let m = y / factor;

//   if (possibleDestination[m][n] !== 0) {
//     return possibleDestination[m][n];
//   }

//   return -1;
// }
