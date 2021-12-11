const { table } = require("console");
const fs = require("fs");
const readline = require("readline");
let totalFlashes = 0;
let grid = [];
let flashesArr = [];
async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc11input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    grid.push(line.split("").map((x) => +x));
  }
  let iterator = 1;
  while (true) {
    step();
    if (grid.flat(2).filter((x) => x === 0).length === 100) {
      console.log(iterator);
      break;
    }
    if (iterator === 100) {
      console.log(totalFlashes);
    }
    iterator++;
  }
}
const step = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] += 1;
      if (grid[i][j] === 10) {
        flashesArr.push([i, j]);
        grid[i][j] = 0;
      }
    }
  }
  flashesArr.forEach((x) => flash(x[0], x[1]));
  flashesArr = [];
};
const flash = (x, y) => {
  totalFlashes += 1;
  let adj = adjusted(x, y);
  adj.forEach((x) => {
    if (grid[x[0]][x[1]] !== 0) {
      grid[x[0]][x[1]] += 1;
    }
    if (grid[x[0]][x[1]] === 10) {
      flash(x[0], x[1]);
      grid[x[0]][x[1]] = 0;
    }
  });
};
const adjusted = (x, y) => {
  let r = [];
  grid[x - 1] !== undefined && grid[x - 1][y] !== 0 && r.push([x - 1, y]);
  grid[x + 1] !== undefined && grid[x + 1][y] !== 0 && r.push([x + 1, y]);
  grid[x][y - 1] !== undefined && grid[x][y - 1] !== 0 && r.push([x, y - 1]);
  grid[x][y + 1] !== undefined && grid[x][y + 1] !== 0 && r.push([x, y + 1]);
  if (grid[x - 1]) {
    grid[x - 1][y - 1] !== undefined &&
      grid[x - 1][y - 1] !== 0 &&
      r.push([x - 1, y - 1]);
  }
  if (grid[x - 1]) {
    grid[x - 1][y + 1] !== undefined &&
      grid[x - 1][y + 1] !== 0 &&
      r.push([x - 1, y + 1]);
  }
  if (grid[x + 1]) {
    grid[x + 1][y - 1] !== undefined &&
      grid[x + 1][y - 1] !== 0 &&
      r.push([x + 1, y - 1]);
  }
  if (grid[x + 1]) {
    grid[x + 1][y + 1] !== undefined &&
      grid[x + 1][y + 1] !== 0 &&
      r.push([x + 1, y + 1]);
  }
  return r;
};
processLineByLine();
