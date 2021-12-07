const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('aoc3input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    const lineArray = [];
    const range = []
    for await (const line of rl) {
        lineArray.push(line);
    }
    for (let i = 0; i < 12; i++) {
        let c0 = 0;
        let c1 = 0;
        for (let j = 0; j < lineArray.length; j++) {
            const element = lineArray[j];
            if (element[i] === '1') {
                c1 += 1;
            } else {
                c0 += 1;
            }
        }
        range.push({ c0: c0, c1: c1 });
    }
    let FinalString = [];
    for (const i of range) {
        if (i.c1 > i.c0) {
            FinalString.push(1);
        } else {
            FinalString.push(0)
        }
    }
    const Epsilon = FinalString.map(item => {
        if (item === 0) {
            return 1
        } else {
            return 0
        }
    })
    const d1 = parseInt(FinalString.join(''), 2);
    const d2 = parseInt(Epsilon.join(''), 2);
    console.log('Wynik to ', d1 * d2)
}
processLineByLine();