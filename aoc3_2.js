const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('aoc3input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    const lineArray = [];
    for await (const line of rl) {
        lineArray.push(line)
    }
    lineArray.map(x => +x);
    let ogr = lineArray;
    let c02 = lineArray;
    for (let i = 0; i < 12; i++) {
        let c0 = 0;
        let c1 = 0;
        if (c02.length === 1) {
            console.log(ogr)
            break;
        }
        c02.forEach(item => {
            item[i] == 1 ? c1 += 1 : c0 += 1
        })
        if (c1 === c0) {
            c02 = c02.filter(x => x[i] == '0')
        } else if (c1 > c0) {
            c02 = c02.filter(x => x[i] == '0')
        } else {
            c02 = c02.filter(x => x[i] == '1');
        }
    }
    for (let i = 0; i < 12; i++) {
        let c0 = 0;
        let c1 = 0;
        if (ogr.length === 1) {
            console.log(ogr)
            break;
        }
        ogr.forEach(item => {
            item[i] == 1 ? c1 += 1 : c0 += 1
        })
        if (c1 === c0) {
            ogr = ogr.filter(x => x[i] == '1')
        } else if (c1 > c0) {
            ogr = ogr.filter(x => x[i] == '1')
        } else {
            ogr = ogr.filter(x => x[i] == '0');
        }
    }
    console.log(parseInt(ogr[0], 2) * parseInt(c02[0], 2))
}
processLineByLine();