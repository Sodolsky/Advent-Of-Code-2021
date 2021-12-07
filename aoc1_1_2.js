const fs = require("fs");
const readline = require("readline");
const readLines = async () => {
  const newStream = fs.createReadStream("adv1.txt");
  const rl = readline.createInterface({
    input: newStream,
    crlfDelay: Infinity,
  });
  const dataArray = [];
  for await (const i of rl) {
    const dt = i.trim();
    dataArray.push(dt);
  }
  let count = 0;
  let inspectedEles = [];
  let prevSum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    inspectedEles[0] = dataArray[i] ?? null;
    inspectedEles[1] = dataArray[i + 1] ?? null;
    inspectedEles[2] = dataArray[i + 2] ?? null;
    if (inspectedEles.some((x) => x === null)) {
      return console.log(count);
    } else {
      const reducer = (accumulator, curr) =>
        parseInt(accumulator) + parseInt(curr);
      const sum = inspectedEles.reduce(reducer);
      if (prevSum === 0) {
        prevSum = sum;
      } else {
        if (sum > prevSum) {
          prevSum = sum;
          count++;
        } else {
          prevSum = sum;
        }
      }
    }
  }
  console.log(count);
};
readLines();
