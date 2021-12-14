const fs = require("fs");
const readline = require("readline");
//Honeslty i have no idea what this code is doing it was the worst problem for me so  far
let str = "ONHOOSCKBSVHBNKFKSBK";
const dec = {};
let pairs = {};
let LetterCount = {};
async function processLineByLine() {
  const fileStream = fs.createReadStream("aoc14input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const nl = line.split("->").map((item) => item.trim());
    dec[nl[0]] = nl[1];
    let lc = nl[0].split("");
    LetterCount[lc[0]] = 0;
    LetterCount[lc[1]] = 0;
    pairs[nl[0]] = 0;
  }
  let iterator = 0;
  for (let i = 0; i < str.length - 1; i++) {
    pairs[`${str[i]}${str[i + 1]}`] = 1;
  }
  for (const i of str) {
    LetterCount[i] += 1;
  }
  while (iterator < 40) {
    pairs = splitPairs(pairs, iterator);
    iterator++;
  }
  let total = Object.values(LetterCount).sort((a, b) => b - a);
  console.log(total[0] - total[total.length - 1]);
}
const splitPairs = (pairs) => {
  let copy = { ...pairs };
  Object.keys(pairs).forEach((item) => {
    let spl = item.split("");
    const letter = getPairLetter(item);
    let fp = `${spl[0]}${letter}`;
    let sp = `${letter}${spl[1]}`;
    let val = pairs[item];
    copy[fp] += val;
    copy[sp] += val;
    LetterCount[letter] += val;
    copy[item] -= val;
  });
  return copy;
};
const getPairLetter = (pair) => {
  return dec[pair];
};
processLineByLine();
