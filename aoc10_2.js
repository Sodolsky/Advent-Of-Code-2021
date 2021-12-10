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
  let uncorruptedLines = [];
  let scores = [];
  input.forEach((item) => {
    let stack = [];
    for (const i of item) {
      stack = isValidChar(stack, i);
      if (!stack) break;
    }
    if (stack) {
      uncorruptedLines.push(stack);
    }
  });
  uncorruptedLines.forEach((item) => {
    let scoreOfLine = 0;
    item.forEach((x) => {
      let c = findClosingChar(x);
      switch (c) {
        case ")":
          scoreOfLine = scoreOfLine * 5 + 1;
          break;
        case "]":
          scoreOfLine = scoreOfLine * 5 + 2;
          break;
        case "}":
          scoreOfLine = scoreOfLine * 5 + 3;
          break;
        case ">":
          scoreOfLine = scoreOfLine * 5 + 4;
          break;
      }
    });
    scores.push(scoreOfLine);
  });
  let sortedScores = scores.sort((a, b) => a - b);
  console.log(sortedScores[Math.floor(sortedScores.length / 2)]);
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
const findClosingChar = (char) => {
  return obj[char];
};
processLineByLine();
