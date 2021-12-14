const fs = require('fs');
const readline = require('readline');
let str = 'NNCB';
const dec = {}
const pairs = {};
async function processLineByLine() {
    const fileStream = fs.createReadStream('aoc14input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const nl = line.split('->').map(item => item.trim());
        dec[nl[0]] = nl[1];
    }
    let iterator = 0;
    while (iterator < 10) {
        iterator++;
    }
    //Gettings First Pairs to start with
    for (let i = 0; i < str.length - 1; i++) {
        pairs[`${str[i]}${str[i + 1]}`] = 1;
    }
    splitPairs(pairs)
}
const splitPairs = (pairs) => {
    let copy = { ...pairs };
    let decreaseArr = new Set();
    Object.keys(pairs).forEach(item => {
        let spl = item.split('');
        const letter = getPairLetter(item);
        let fp = `${spl[0]}${letter}`;
        let sp = `${letter}${spl[1]}`;
        let val = pairs[item];
        console.log(pairs, copy)
        decreaseArr.add([item, val]);
        pairs[fp] === undefined ? pairs[fp] = 1 : pairs[fp] += 1 * val;
        pairs[sp] === undefined ? pairs[sp] = 1 : pairs[sp] += 1 * val;
    })
    console.log(decreaseArr)
}
const getPairLetter = pair => {
    return dec[pair];
}
processLineByLine();