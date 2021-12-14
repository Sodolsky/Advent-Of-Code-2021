const fs = require('fs');
const readline = require('readline');
let str = 'ONHOOSCKBSVHBNKFKSBK';
const dec = {}
let partialString = "";
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
    while (iterator < 40) {
        for (let i = 0; i < str.length - 1; i += 1) {
            findLetterToInsert(`${str[i]}${str[i + 1]}`, i)
        }
        str = partialString
        partialString = '';
        iterator++;
        console.log(iterator)
    }
    const splitedStr = str.split('');
    let countObj = {};
    splitedStr.forEach((x) => countObj[x] = (countObj[x] || 0) + 1);
    const values = Object.values(countObj).sort((a, b) => b - a);
    console.log(values[0] - values[values.length - 1])
}
const findLetterToInsert = (letters, i) => {
    if (letters) {
        let insertedLetter = [dec[`${letters[0]}${letters[1]}`]];
        if (i < 1) {
            partialString += `${letters[0]}${insertedLetter}${letters[1]}`;
        } else {
            partialString += `${insertedLetter}${letters[1]}`;
        }
    }
}
processLineByLine();