const fs = require('fs');
const readline = require('readline');
let input = [];
let grid = [];
async function processLineByLine() {
    const fileStream = fs.createReadStream('aoc13input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        const nl = line.split(',').map(x => +x);
        input.push(nl);
    }
    let maxRows = input.sort((a, b) => b[0] - a[0])[0][0];
    let maxCols = input.sort((a, b) => b[1] - a[1])[0][1];
    grid = Array(maxCols + 1).fill('.').map(() => Array(maxRows + 1).fill('.'));
    input.forEach(i => {
        grid[i[1]][i[0]] = '#';
    })
    foldY(7)
    console.log(input)
    // console.table(grid.slice(0, 7));
}
const foldPointY = (line, point, i) => {
    const positionFromLine = point[1] - line;
    if (positionFromLine > 0) {
        grid[line - positionFromLine][point[0]] = '#';
        grid[point[1]][point[0]] = '.'
        input[i] = [point[0], line - positionFromLine];
    }
}
const foldY = line => {
    input.forEach((item, i) => {
        foldPointY(line, item, i);
    })
}
processLineByLine();