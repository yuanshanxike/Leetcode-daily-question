function canAliceWin(nums: number[]): boolean {
    let singleSum = 0, doubleSum = 0
    for (const num of nums) {
        if (num >= 10) {
            doubleSum += num
        } else {
            singleSum += num
        }
    }
    return singleSum != doubleSum
};

console.log(canAliceWin([1,2,3,4,10]))
console.log(canAliceWin([1,2,3,4,5,14]))
console.log(canAliceWin([5,5,5,25]))