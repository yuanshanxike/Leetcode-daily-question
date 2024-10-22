/**
 * 直接对数据进行相加取余会导致在 hours 过长时，计算次数太多。
 * 对于大量数据，一种更好的办法是对 hours 中出现的元素通过 hour % 24 计算 key 后进行哈希计数。然后枚举右，维护左。
 * 枚举元素时，只需要用 (24 - (其值 % 24)) % 24 得到一个 key，然后在 hash 表中查看是否存在这个 key，若存在则累加匹配次数。
 * @param hours 
 */
function countCompleteDayPairs(hours: number[]): number {
    const modFreqCnt: number[] = Array(24).fill(0)
    let sum = 0
    for (const hour of hours) {
        const key = (24 - (hour % 24)) % 24
        sum += modFreqCnt[key]
        modFreqCnt[hour % 24]++
    }
    return sum
};

console.log(countCompleteDayPairs([12,12,30,24,24]))
console.log(countCompleteDayPairs([72,48,24,3]))