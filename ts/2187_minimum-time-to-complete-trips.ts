/**
 * 因为 totalTrips 与需要花费的时间正相关，具有单调性，所以能够使用
 * 二分答案：
 * totalTrips = sumTime / 单个trip耗时 * time.length
 * =》 sumTime = totlTrips / time.length * 单个耗时  （totlTrips 及 time.length 是函数调用者给定参数）
 * 所以可以得到：
 * 下界是 Math.ceil(totalTrips / times.length * time 中的最小值)，上界是 Math.ceil(totalTrips / times.length * time 中的最大值).
 * @param time 
 * @param totalTrips 
 * @returns 
 */
function minimumTime(time: number[], totalTrips: number): number {
    let minTime = 1e7, maxTime = 1
    for (const t of time) {
        minTime = Math.min(t, minTime)
        maxTime = Math.max(t, maxTime)
    }

    let l = Math.ceil(totalTrips / time.length) * minTime, r = Math.ceil(totalTrips / time.length) * maxTime
    while (l <= r) {
        const mid = Math.floor((l + r) / 2)
        const tTrips = time.reduce((total, val) => total + Math.floor(mid / val), 0)  // O(n)
        if (tTrips >= totalTrips) {  // 总时间可能可以更小
            r = mid - 1
        } else {  // 总时间不够 totalTrips
            l = mid + 1
        }
    }
    return l
};

console.log(minimumTime([1,2,3], 5))
console.log(minimumTime([2], 1))
console.log(minimumTime([9,7,10,9,10,9,10], 1))