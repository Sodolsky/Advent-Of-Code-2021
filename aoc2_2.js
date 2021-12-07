const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input2.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let aim = 0
    let depth = 0;
    let horizontal = 0;
    for await (const line of rl) {
        const name = line.split(' ')[0];
        const val = line.split(' ')[1];
        switch (name) {
            case 'forward':
                horizontal += parseInt(val);
                depth += aim * parseInt(val);
                break;
            case 'down':
                aim += parseInt(val);
                break;
            case 'up':
                aim -= parseInt(val);
                break;
        }
    }
    console.log(horizontal * depth);
}

processLineByLine();