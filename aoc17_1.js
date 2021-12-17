const miny = -73;
const maxy = -46;
const minx = 253;
const maxx = 280;
const generateFinalCords = (minx, maxx, miny, maxy) => {
    const tempArr = [];
    for (let i = minx; i <= maxx; i++) {
        for (let j = miny; j <= maxy; j++) {
            tempArr.push([i, j]);
        }
    }
    return tempArr;
}
const grid = generateFinalCords(minx, maxx, miny, maxy);
function isArrayEqual(a1, a2) {
    return JSON.stringify(a1) == JSON.stringify(a2);
}
const matchPoint = (currCords) => {
    for (const i of grid) {
        if (isArrayEqual(i, currCords)) {
            return true;
        }
    }
    return false;
}
let goodCords = [];
const step = (velx, vely, px, py, h = 0, i = 0) => {
    let newVelX = velx < 0 ? velx + 1 : velx > 0 ? velx - 1 : velx === 0 && 0;
    let newVelY = vely - 1;
    let nx = px += velx;
    let ny = py += vely;
    let passedH = h;
    if (ny > passedH) {
        passedH = ny;
    }
    if (matchPoint([ny, nx])) {
        return goodCords.push(passedH > h ? passedH : h);
    }
    if (nx > maxx && newVelX === 0) {
        return false;
    } else if (ny < maxy) {
        return false;
    }
    step(newVelX, newVelY, nx, ny, passedH, i + 1)
}
for (let i = -10; i < 50; i++) {
    for (let j = 40; j < 60; j++) {
        step(i, j, 0, 0);
    }
}
console.log(goodCords.sort((a, b) => b - a))