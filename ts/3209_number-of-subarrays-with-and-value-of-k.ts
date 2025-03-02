/**
 * 从左往右枚举 i ∈ [0, n) 作为子数组的右边界，
 * 对于每个 i，从右往左枚举 j ∈ [0, i] 作为子数组的左边界。
 * 则通过 [i, j] 能够表示出所有的子数组。
 * 根据 AND 不变大原理，剪枝 O(n^2) 的循环，时间复杂度优化到：O(n*logU)
 * @param nums 
 * @param k 
 */
function countSubarrays(nums: number[], k: number): number {
    const n = nums.length
    let ans = 0
    let left = 0, right = 0  // 用三指针计算每次 i 后移之后 [left, right) 之间的元素个数
    for (let i = 0; i < n; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[j] == (nums[j] & nums[i])) break  // 从集合的角度看，左边储存的数一定是右边储存数字的子集
            nums[j] &= nums[i]
        }

        // 根据 AND 只会使得结果不变或变小的性质，目标区间一定只会后移
        while (left <= i && nums[left] < k) {
            left++
        }
        while (right <= i && nums[right] <= k) {
            right++
        }
        ans += right - left
    }
    return ans
};

console.log(countSubarrays([1,1,1], 1))
console.log(countSubarrays([1,1,2], 1))
console.log(countSubarrays([1,2,3], 2))