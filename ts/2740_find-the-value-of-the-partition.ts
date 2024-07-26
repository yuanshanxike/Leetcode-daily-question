/**
 * 原题描述可以转化为求排序后相邻数字间的最小差值
 * @param nums 
 */
function findValueOfPartition(nums: number[]): number {
    nums.sort((a, b) => a - b)
    return nums.reduce((min, num, idx) => {
        if (idx > 0) return Math.min(min, num - nums[idx - 1])
        else return min
    }, 1e9)
};

console.log(findValueOfPartition([1,3,2,4]))
console.log(findValueOfPartition([100,1,10]))