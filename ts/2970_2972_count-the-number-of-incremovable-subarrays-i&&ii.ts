/**
 * 枚举滑动窗口长度，分别滑动求解（时间复杂度: O(n^2)~O(n^3), 简单难度可过）
 * @param nums 
 */
// function incremovableSubarrayCount(nums: number[]): number {
//     const n = nums.length
//     let count = 0
//     for (let len = 1; len <= n; len++) {
//         sliding: for (let l = 0, r = l + len - 1; r < n; l++, r++) {
//             count++
//             let lastNum = -1
//             for (let i = 0; i < l; i++) {
//                 if (nums[i] <= lastNum) {
//                     count--
//                     continue sliding
//                 }
//                 lastNum = nums[i]
//             }
//             for (let i = r + 1; i < n; i++) {
//                 if (nums[i] <= lastNum) {
//                     count--
//                     continue sliding
//                 }
//                 lastNum = nums[i]
//             }
//         }
//     }
//     return count
// };

/**
 * 上述的算法其实存在着大量的重复计算：每次滑动一格窗口，都会检查一遍窗口两侧的前缀和后缀所构成的序列是否是严格递增的。
 * 这样，不同前缀和后缀的公共部分就会被重复检测多次。
 * 把视角转换为观测前缀和后缀，符合条件的子数组删除，一定是保证 前缀 和 后缀 都是严格递增的，
 * (假设严格递增前缀的最后一个数下标是 i，严格递增后缀的第一个数下标是 j, 被删除的子数组区间是 [i + 1, j - 1] )，
 * 那么还需要满足的是 nums[i] < nums[j], 且 i 和 j 中间至少需要有一个元素（因为不允许删除空集），也就是 i + 1 < j.
 * (还需要考虑一种特殊情况——nums中所有数严格递增，这时候删除任意非空子数组都是被允许的，可枚举出来的非空子数组数量为 n*(n+1)/2)
 * 对于枚举到的每个严格递增非空后缀左边界元素 nums[j] 所对应的 最长严格递增前缀，假设此时下标为 i',
 * 移除子数组的左边界可以是 0, 1, 2, 3, ... , i'-1, i', i'+1，一共是 i' + 2 种可能的情况。
 * 枚举所有可能的严格递增后缀左边界下标 j，累加对应的删除子数组的左边界情况 i + 2 种。
 * @param nums 
 */
function incremovableSubarrayCount(nums: number[]): number {
    const n = nums.length
    // 确认最长严格递增前缀的右边界
    let i = 0
    for (; i < n - 1; i++) {
        if (nums[i] >= nums[i + 1]) break
    }
    if (i == n - 1) return n * (n + 1) / 2  // 整个数组严格递增，直接计算返回结果

    let ans = i + 2 // 后缀长度为 0 对应的前缀可能情况数量

    let j = n - 1
    while (j == n - 1 || j > 0 && nums[j] < nums[j + 1]) {  // j 不能取到 0，因为被删除的子数组不能为空数组
        while (i >= 0 &&  nums[i] >= nums[j]) {  // 非整个数组严格递增时，必然满足 i + 1 < j，所以不用判断这一条件
            i--
        }
        ans += i + 2  // 当 i 移动到 -1 时，i + 2 = 1，此时的 j + 1 对应着一种子数组删除方式，也是正确的
        j--
    }
    return ans
}

console.log(incremovableSubarrayCount([1,2,3,4]))
console.log(incremovableSubarrayCount([6,5,7,8]))
console.log(incremovableSubarrayCount([8,7,6,6]))