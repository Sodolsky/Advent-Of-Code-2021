const fs = require("fs");
const readline = require("readline");
let arr = [];
const lowPoints = [];
let basins = [];
async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc9input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    arr.push(line.split("").map((x) => +x));
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let e = arr[i][j];
      let top = arr[i - 1] === undefined ? 9 : arr[i - 1][j];
      let bot = arr[i + 1] === undefined ? 9 : arr[i + 1][j];
      let left = arr[i][j - 1] ?? 9;
      let right = arr[i][j + 1] ?? 9;
      if (e < left && e < bot && e < top && e < right) {
        lowPoints.push([i, j]);
      }
    }
  }
  lowPoints.forEach((item, i) => {
    findBasins(item[0], item[1], i);
    const count = arr.flat(2).filter((x) => x === `vis${i}`).length;
    basins.push(count);
  });
  console.log(
    basins
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, a) => acc * a)
  );
}
const findBasins = (x, y, i) => {
  let top = arr[x - 1] === undefined ? 9 : arr[x - 1][y];
  let bot = arr[x + 1] === undefined ? 9 : arr[x + 1][y];
  let left = arr[x][y - 1] === undefined ? 9 : arr[x][y - 1];
  let right = arr[x][y + 1] === undefined ? 9 : arr[x][y + 1];
  arr[x][y] = `vis${i}`;
  if (top !== 9 && top !== `vis${i}`) {
    findBasins(x - 1, y, i);
  }
  if (bot !== 9 && bot !== `vis${i}`) {
    findBasins(x + 1, y, i);
  }
  if (left !== 9 && left !== `vis${i}`) {
    findBasins(x, y - 1, i);
  }
  if (right !== 9 && right !== `vis${i}`) {
    findBasins(x, y + 1, i);
  }
};

processLineByLine();
