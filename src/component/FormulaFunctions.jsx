import { rows, col } from "./Assets";
class Qitems {
  constructor(row, col, dist) {
    this.row = row;
    this.col = col;
    this.dist = dist;
  }
}

function minDist(maze, dest) {
  let visited = new Array(rows);

  for (let i = 0; i < rows; i++) {
    visited[i] = new Array(col);
    for (let j = 0; j < col; j++) {
      if (maze[i][j] === 1) {
        visited[i][j] = true;
      } else {
        visited[i][j] = false;
      }
    }
  }
  visited[rows - 1][0] = true;
  // console.log(visited);

  var q = [];
  q.push(new Qitems(rows - 1, 0, 0));
  // let i = 0;
  while (q.length !== 0) {
    let p = q.shift();
    // q.pop(0);
    // console.log(p, q);

    if (p.row === dest.x && p.col === dest.y) return p.dist;

    if (p.row - 1 >= 0 && visited[p.row - 1][p.col] === false) {
      q.push(new Qitems(p.row - 1, p.col, p.dist + 1));
      visited[p.row - 1][p.col] = true;
    }

    if (
      p.row + 1 >= 0 &&
      p.row + 1 < rows &&
      visited[p.row + 1][p.col] === false
    ) {
      q.push(new Qitems(p.row + 1, p.col, p.dist + 1));
      visited[p.row + 1][p.col] = true;
    }

    if (p.col - 1 >= 0 && visited[p.row][p.col - 1] === false) {
      q.push(new Qitems(p.row, p.col - 1, p.dist + 1));
      visited[p.row][p.col - 1] = true;
    }

    if (
      p.col + 1 >= 0 &&
      p.col + 1 < col &&
      visited[p.row][p.col + 1] === false
    ) {
      q.push(new Qitems(p.row, p.col + 1, p.dist + 1));
      visited[p.row][p.col + 1] = true;
    }
  }

  // console.log(maze, visited);
  return -1;
}

export default minDist;
