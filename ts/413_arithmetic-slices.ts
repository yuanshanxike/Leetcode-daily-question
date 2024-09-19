/**
 * 先找到每个最长等差数列的子数组，然后用区间中连续不同长度滑动窗口数量的计算方法（本身也是求等差数列和）分别计算合法数量后累加
 * @param nums 
 */
function numberOfArithmeticSlices(nums: number[]): number {
    const n = nums.length
    let ans = 0, len = 0, diff: number | undefined = undefined
    for (let i = 0; i < n - 1; i++) {
        if (diff == undefined) {
            diff = nums[i + 1] - nums[i]
            len = 2
        } else if (nums[i + 1] - nums[i] == diff) {
            len++
        } else { // nums[i + 1] - nums[i] != diff
            if (len >= 3) ans += (1 + (len - 2)) * (len - 2) / 2
            len = 0
            diff = undefined
            i--
        }
    }
    // i == n - 1
    if (diff != undefined && len >= 3) {
        ans += (1 + (len - 2)) * (len - 2) / 2
    }
    return ans
};

console.log(numberOfArithmeticSlices([1,2,3,4]))
console.log(numberOfArithmeticSlices([1,2,3,4,6,8]))
console.log(numberOfArithmeticSlices([1]))
console.log(numberOfArithmeticSlices([1,2]))