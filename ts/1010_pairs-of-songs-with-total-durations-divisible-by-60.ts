/**
 * 哈希计数，维护左、枚举右。
 * @param time 
 */
function numPairsDivisibleBy60(time: number[]): number {
    const modFreqCnt = Array(60).fill(0)
    let sum = 0
    for (const t of time) {
        sum += modFreqCnt[(60 - (t % 60)) % 60]
        modFreqCnt[t % 60]++
    }
    return sum
};

console.log(numPairsDivisibleBy60([30,20,150,100,40]))
console.log(numPairsDivisibleBy60([60,60,60]))