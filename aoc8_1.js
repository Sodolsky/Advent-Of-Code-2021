const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input8aoc.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let Arr = []
    for await (const line of rl) {
        let digitArray = line.split("");
        digitArray = digitArray.map(x => +x);
        Arr.push(digitArray);
    }
    const nums = [];
    for (let i = 0; i < Arr.length; i++) {
        for (let j = 0; j < Arr[i].length; j++) {
            let e = Arr[i][j]
            let top = Arr[i - 1] === undefined ? 100000 : Arr[i - 1][j]
            let bot = Arr[i + 1] === undefined ? 100000 : Arr[i + 1][j]
            let left = Arr[i][j - 1] ?? 100000;
            let right = Arr[i][j + 1] ?? 100000;
            if (e < left && e < bot && e < top && e < right) {
                nums.push(e)
            }

        }
    }
    console.log(nums.reduce((acc, a) => acc + (a) + 1, 0))
}
processLineByLine();