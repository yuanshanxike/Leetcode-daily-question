/**
 * 因为，数值波动的范围是 ±k. 原数组最大值和最小值之间的元素可以尽量往中间靠拢.
 * @param nums 
 * @param k 
 * @returns 
 */
function smallestRangeI(nums: number[], k: number): number {
    let minVal = Infinity, maxVal = -1
    for (const num of nums) {
        minVal = Math.min(num, minVal)
        maxVal = Math.max(num, maxVal)
    }
    return Math.max(maxVal - minVal - 2 * k, 0)
};

console.log(smallestRangeI([1], 0))
console.log(smallestRangeI([0,10], 2))
console.log(smallestRangeI([1,3,6], 3))