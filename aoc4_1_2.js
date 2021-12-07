const fs = require("fs");
const readline = require("readline");
const numbs = [
  92, 12, 94, 64, 14, 4, 99, 71, 47, 59, 37, 73, 29, 7, 16, 32, 40, 53, 30, 76,
  74, 39, 70, 88, 55, 45, 17, 0, 24, 65, 35, 20, 63, 68, 89, 84, 33, 66, 18, 50,
  38, 10, 83, 75, 67, 42, 3, 56, 82, 34, 90, 46, 87, 52, 49, 2, 21, 62, 93, 86,
  25, 78, 19, 57, 77, 26, 81, 15, 23, 31, 54, 48, 98, 11, 91, 85, 60, 72, 8, 69,
  6, 22, 97, 96, 80, 95, 58, 36, 44, 1, 51, 43, 9, 61, 41, 79, 5, 27, 28, 13,
];
async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc4input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let ArrOf2DArrays = [];
  let tempARR = [];
  let lc = 0;
  for await (const line of rl) {
    if (line.trim()) {
      const nl = line.split(" ").filter((x) => x !== "");
      tempARR.push(nl);
    } else {
      ArrOf2DArrays.push(tempARR);
      tempARR = [];
    }
    // if (tempARR.length === 5) {
    //   ArrOf2DArrays.push(tempARR);
    // }
  }
  let currentIndex = 0;
  while (true) {
    const holdingArray = numbs.slice(0, currentIndex);
    let wf = false;
    ArrOf2DArrays.forEach((item, i) => {
      if (CheckWin(item, holdingArray)) {
        wf = true;
        if (!wonBoards.some((x) => x === i)) {
          wonBoards.push(i);
        }
      }
    });
    if (wonBoards.length === ArrOf2DArrays.length) {
      let indexFirst = wonBoards[0];
      let indexLast = wonBoards[wonBoards.length - 1];
      let sumFirst = ArrOf2DArrays[indexFirst]
        .flat(2)
        .filter((x) => x !== "has")
        .reduce((acc, a) => acc + parseInt(a), 0);
      let sumLast = ArrOf2DArrays[indexLast]
        .flat(2)
        .filter((x) => x !== "has")
        .reduce((acc, a) => acc + parseInt(a), 0);
      console.log("First Board that won:", sumFirst * holdingArray[0]);
      console.log(
        "Last Board that won:",
        sumLast * holdingArray[holdingArray.length - 1]
      );
      break;
    } else {
      currentIndex++;
    }
  }
}
let sumOf = 0;
let wonBoards = [];
const CheckWin = (arr, checkedNumbArr) => {
  let hasMatch = false;
  for (let j = 0; j < 5; j++) {
    let count = 0;
    for (let i = 0; i < 5; i++) {
      checkedNumbArr.forEach((item) => {
        if (arr[j][i] == item) {
          arr[j][i] = "has";
        }
      });
      if (arr[j][i] === "has") {
        count += 1;
      }
      if (i === 4) {
        if (count === 5) {
          hasMatch = true;
          sumOf = arr
            .flat(2)
            .filter((x) => x !== "has")
            .reduce((acc, a) => acc + parseInt(a), 0);
        } else {
          count = 0;
        }
      }
    }
  }
  for (let j = 0; j < 5; j++) {
    let count = 0;
    for (let i = 0; i < 5; i++) {
      checkedNumbArr.forEach((item) => {
        if (arr[i][j] == item) {
          arr[i][j] = "has";
        }
      });
      if (arr[i][j] === "has") {
        count += 1;
      }
      if (i === 4) {
        if (count === 5) {
          hasMatch = true;
          sumOf = arr
            .flat(2)
            .filter((x) => x !== "has")
            .reduce((acc, a) => acc + parseInt(a), 0);
        } else {
          count = 0;
        }
      }
    }
  }
  return hasMatch;
};
processLineByLine();
