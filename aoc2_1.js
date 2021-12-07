const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input2.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let depth = 0;
    let horizontal = 0
    for await (const line of rl) {
        const name = line.split(' ')[0];
        const val = line.split(' ')[1];
        switch (name) {
            case 'forward':
                horizontal += parseInt(val);
                break;
            case 'down':
                depth += parseInt(val);
                break;
            case 'up':
                depth -= parseInt(val);
                break;
        }
    }
    console.log(depth * horizontal);
}

processLineByLine();