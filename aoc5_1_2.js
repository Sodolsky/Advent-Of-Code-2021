const { Console } = require("console");
const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc5input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let arrOfLines = [];
  let HorizonArr = [];
  for await (const line of rl) {
    let splittedLine = line.split("->");
    splittedLine = splittedLine.map((item) => item.trim());
    let x1 = splittedLine[0].split(",")[0];
    let y1 = splittedLine[0].split(",")[1];
    let x2 = splittedLine[1].split(",")[0];
    let y2 = splittedLine[1].split(",")[1];
    if (x1 === x2) {
      let ObjectWrapper = {
        s: parseInt(y1),
        e: parseInt(y2),
        o: parseInt(x1),
        type: "updown",
      };
      arrOfLines.push(ObjectWrapper);
    } else if (y1 === y2) {
      let ObjectWrapper = {
        s: parseInt(x1),
        e: parseInt(x2),
        o: parseInt(y1),
        type: "leftright",
      };
      arrOfLines.push(ObjectWrapper);
    } else {
      let ObjectWrapper = {
        x1: parseInt(x1),
        x2: parseInt(x2),
        y1: parseInt(y1),
        y2: parseInt(y2),
      };
      HorizonArr.push(ObjectWrapper);
    }
  }
  let CordinateTable = Array(1000)
    .fill()
    .map(() => Array(1000).fill(0));
  arrOfLines.forEach((item) => {
    if (item.type === "updown") {
      if (item.e > item.s) {
        for (let i = item.e; i >= item.s; i--) {
          CordinateTable[i][item.o] += 1;
        }
      } else {
        for (let i = item.e; i <= item.s; i++) {
          CordinateTable[i][item.o] += 1;
        }
      }
    } else {
      if (item.e > item.s) {
        for (let i = item.e; i >= item.s; i--) {
          CordinateTable[item.o][i] += 1;
        }
      } else {
        for (let i = item.e; i <= item.s; i++) {
          CordinateTable[item.o][i] += 1;
        }
      }
    }
  });

  HorizonArr.forEach((item) => {
    const { x1, x2, y1, y2 } = item;
    if (x1 > x2 && y1 > y2) {
      for (let i = x1, j = y1; i >= x2; i--, j--) {
        CordinateTable[j][i] += 1;
      }
    } else if (x2 > x1 && y2 > y1) {
      for (let i = x2, j = y2; i >= x1; i--, j--) {
        CordinateTable[j][i] += 1;
      }
    } else if (x1 > x2 && y2 > y1) {
      for (let i = x1, j = y1; i >= x2; i--, j++) {
        CordinateTable[j][i] += 1;
      }
    } else if (x2 > x1 && y1 > y2) {
      for (let i = x2, j = y2; i >= x1; i--, j++) {
        CordinateTable[j][i] += 1;
      }
    }
  });
  let newArr = CordinateTable.flat(2);
  let count = newArr.filter((x) => x > 1).length;
  console.log(count);
}
processLineByLine();
