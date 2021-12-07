let FishArray = [2, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5, 1, 1, 3, 5, 1, 1, 3, 1, 1, 3, 1, 4, 4, 4, 5, 1, 1, 1, 3, 1, 3, 1, 1, 2, 2, 1, 1, 1, 5, 1, 1, 1, 5, 2, 5, 1, 1, 2, 1, 3, 3, 5, 1, 1, 4, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 5, 1, 2, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 4, 5, 1, 1, 3, 4, 1, 1, 1, 3, 5, 1, 1, 1, 2, 1, 1, 4, 1, 4, 1, 2, 1, 1, 2, 1, 5, 1, 1, 1, 5, 1, 2, 2, 1, 1, 1, 5, 1, 2, 3, 1, 1, 1, 5, 3, 2, 1, 1, 3, 1, 1, 3, 1, 3, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 4, 1, 1, 3, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 1, 4, 1, 2, 4, 1, 1, 4, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 2, 1, 5, 1, 1, 1, 1, 1, 5, 1, 3, 1, 1, 2, 3, 4, 4, 1, 1, 1, 3, 2, 4, 4, 1, 1, 3, 5, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 5, 3, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 4, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1
];
//Pretty redundant code below,i was too lazy to chain array Methods.
let s1 = FishArray.filter(x => x === 1).length;
let s2 = FishArray.filter(x => x === 2).length;
let s3 = FishArray.filter(x => x === 3).length;
let s4 = FishArray.filter(x => x === 4).length;
let s5 = FishArray.filter(x => x === 5).length;
let startArray = [0, s1, s2, s3, s4, s5, 0, 0, 0]
const getFishCount = (NumberOfDays) => {
    let days = 0;
    while (days < NumberOfDays) {
        let newFishesCount = 0;
        for (let i = 0; i <= 8; i++) {
            if (i === 0) {
                newFishesCount = startArray[0];
                startArray[7] += newFishesCount;
            } else {
                startArray[i - 1] = startArray[i];
            }
        }
        startArray[8] = newFishesCount;
        days++;
    }
    console.log(startArray.reduce((acc, a) => acc + a, 0))
}
getFishCount(80);
getFishCount(256);