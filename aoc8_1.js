const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc8input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let lineArray = [];
  for await (const line of rl) {
    let newLine = line.split("|")[1];
    lineArray.push(newLine.trim());
  }
  // Digits-signals
  //1-2
  //4-4
  //7-3
  //8-7
  const digitsArray = Array.from({ length: 10 }, (x) => (x = 0));
  lineArray.forEach((item) => {
    let array = item.split(" ");
    array.forEach((item) => {
      if (item.length === 2) {
        digitsArray[1] += 1;
      } else if (item.length === 4) {
        digitsArray[4] += 1;
      } else if (item.length === 3) {
        digitsArray[7] += 1;
      } else if (item.length === 7) {
        digitsArray[8] += 1;
      }
    });
  });
  console.log(digitsArray.reduce((acc, a) => acc + a, 0));
}
processLineByLine();
