const targetY = { min: -73, max: -46 };
const targetX = { min: 253, max: 280 };
let goodCords = [];
let count = 0;
const step = (velx, vely, px, py, h = 0) => {
  let newVelX = velx < 0 ? velx + 1 : velx > 0 ? velx - 1 : velx === 0 && 0;
  let newVelY = vely - 1;
  let nx = (px += velx);
  let ny = (py += vely);
  let passedH = ny > h ? ny : h;
  if (
    ny >= targetY.min &&
    ny <= targetY.max &&
    nx >= targetX.min &&
    nx <= targetX.max
  ) {
    count++;
    goodCords.push(passedH > h ? passedH : h);
    return;
  } else if (nx > targetX.max || ny < targetY.min) {
    return;
  }
  step(newVelX, newVelY, nx, ny, passedH);
};
for (let i = 1; i < 500; i++) {
  for (let j = -500; j < 500; j++) {
    step(i, j, 0, 0);
  }
  console.log(i);
}
console.log("Part1:", goodCords.sort((a, b) => b - a)[0]);
console.log("Part2:", count);
