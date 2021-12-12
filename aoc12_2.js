const fs = require("fs");
const readline = require("readline");
let routes = [];
let pointConnections = [];
async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc12input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    routes.push(line);
  }
  routes.forEach((item) => {
    let spl = item.split("-");
    if (pointConnections.some((x) => x.name === spl[0])) {
      let i = pointConnections.findIndex((x) => x.name === spl[0]);
      let newObjects = pointConnections[i].connections;
      newObjects = [...newObjects, spl[1]];
      pointConnections[i].connections = newObjects;
    } else {
      pointConnections.push({
        name: spl[0],
        connections: [spl[1]],
      });
    }
    if (pointConnections.some((x) => x.name === spl[1])) {
      let i = pointConnections.findIndex((x) => x.name === spl[1]);
      let newObjects = pointConnections[i].connections;
      newObjects = [...newObjects, spl[0]];
      pointConnections[i].connections = newObjects;
    } else {
      pointConnections.push({
        name: spl[1],
        connections: [spl[0]],
      });
    }
  });
  part1("start");
  console.log(allPosiblePaths.size);
}
let allPosiblePaths = new Set();
const part1 = (n, currPath = [], specialCaveVisited = false) => {
  if (n === "end") {
    let fp = [...currPath, "end"];
    return allPosiblePaths.add(fp);
  }
  findAdjNodes(n).connections.forEach((item) => {
    if (item === "start") return;
    let nextPath = [...currPath, n];
    let isSmall = specialCaveVisited;
    if (isSmallCave(item) && currPath.includes(item)) {
      if (specialCaveVisited) return;
      isSmall = true;
    }
    part1(item, nextPath, isSmall);
  });
};
const findAdjNodes = (n) => {
  let NodeIndex = pointConnections.findIndex((x) => x.name === n);
  return pointConnections[NodeIndex];
};
const isSmallCave = (n) => {
  return n[0] === n[0].toLowerCase();
};
processLineByLine();
