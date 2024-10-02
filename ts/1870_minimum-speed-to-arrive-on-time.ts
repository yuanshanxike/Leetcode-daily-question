/**
 * 二分答案 (精确计算小数)
 * 因为 “hours 中，小数点后最多存在两位数字”，可以将其乘上 100，从而转化到整数。
 * 同样，时间是距离除以速度，会产生小数、出现误差，可以用时间先乘上 100 后再乘上速度，得到距离。通过比较距离，消除小数的误差。
 * @param dist 
 * @param hour 
 */
function minSpeedOnTime(dist: number[], hour: number): number {
    const n = dist.length
    if (hour <= n - 1) return -1
    const maxDist = dist.reduce((maxDist, dist) => Math.max(maxDist, dist), 0)
    if (hour <= n) return Math.max(maxDist, Math.ceil(dist[n - 1] / +(hour - (n - 1)).toFixed(2)))  // hour in (n - 1, n] 时，速度或许由最后一段行驶距离决定
    
    let l = 1, r = maxDist
    while (l <= r) {
        const mid = Math.floor((l + r) / 2)
        const multSum = dist.reduce((multSum, dist, idx) => {
            return multSum + (idx < n - 1 ? Math.ceil(dist / mid) * mid : dist) * 100
        }, 0)
        if (multSum < Math.round(hour * 100) * mid) { // 速度快了，可能还可以再慢一些
            r = mid - 1
        } else if (multSum > Math.round(hour * 100) * mid) {  // 慢了，需要更快的速度
            l = mid + 1
        } else {
            return mid
        }
    }
    return l
};

console.log(minSpeedOnTime([1,3,2], 6))
console.log(minSpeedOnTime([1,3,2], 2.7))
console.log(minSpeedOnTime([1,3,2], 1.9))
console.log(minSpeedOnTime([1,1,100000], 2.01))
console.log(minSpeedOnTime([5,3,4,6,2,2,7], 10.92))
console.log(minSpeedOnTime([1,1], 1.0))
console.log(minSpeedOnTime([37,64,81], 3.11))