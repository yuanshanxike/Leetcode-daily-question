/**
 * 利用“差分”，快速计算车所在区间内元素同时 +1 (时间复杂度 O(1))
 * 然后用前缀和还原差分数组对应原数组（坐标计数数组）中的每一项，并统计大于 0 的位置数量
 * @param nums 
 */
function numberOfPoints(nums: number[][]): number {
    const diff = Array(101).fill(0)  // 原计数数组一开始都是 0，那么差分数组中的元素也都是 0. 原数组的范围是 [0, 100] 有 100 个元素，那么差分数组中的元素个数也保持一致
    // 利用差分数组记录原数组的区间 +1
    for (let [start, end] of nums) {
        diff[start]++     // 车区间左端点处，在原数组中加一，对应差分数组也加一
        // 车区间中间部分的点对应的原数组相应位置都是加一，但差分数组中对应位置值不变
        diff[end + 1]--   // 车区间右端点的右一位，在原数组中加一，对应差分数该位置减一
    }
    let cnt = 0
    // 前缀和还原数组，并统计原数组中大于 1 的位置数量
    diff.reduce((preSum, dif) => {
        if (preSum > 0) cnt++
        return preSum + dif
    }, 0)
    return cnt
};

console.log(numberOfPoints([[3,6],[1,5],[4,7]]))
console.log(numberOfPoints([[1,3],[5,8]]))