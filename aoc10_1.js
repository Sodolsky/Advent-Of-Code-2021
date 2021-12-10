const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc10input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const input = [];
  for await (const line of rl) {
    input.push(line.split(""));
  }
  let corruptedChars = [];
  input.forEach((item) => {
    let stack = [];
    for (const i of item) {
      stack = isValidChar(stack, i);
      if (!stack) {
        let points = 0;
        switch (i) {
          case ")":
            points = 3;
            break;
          case "]":
            points = 57;
            break;
          case "}":
            points = 1197;
            break;
          case ">":
            points = 25137;
            break;
        }
        corruptedChars.push(points);
        break;
      }
    }
  });
  console.log(corruptedChars.reduce((acc, a) => acc + a, 0));
}
let obj = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};
const isValidChar = (stack, char) => {
  let isOpening = false;
  Object.keys(obj).forEach((item) => {
    if (char === item) {
      stack.unshift(char);
      isOpening = true;
    }
  });
  if (isOpening) {
    return stack;
  } else if (obj[stack[0]] === char) {
    stack.shift(char);
    return stack;
  } else {
    return false;
  }
};
processLineByLine();
