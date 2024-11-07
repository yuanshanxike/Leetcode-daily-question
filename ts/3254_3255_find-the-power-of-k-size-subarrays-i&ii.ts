/**
 * 滑动窗口:
 * 但需要预处理 nums 数组，使之成为能够进行可逆运算元素（为了方便滑动窗口进出元素）
 * 可以将相邻连续上升的元素置为 1，相邻非连续上升元素置为 0.
 * 如果滑动窗口内的元素和为 k，则整个窗口是连续上升的；
 * 如果滑动窗口内的元素和小于 k，则该窗口的能量值为 -1.
 * @param nums 
 * @param k 
 */
// function resultsArray(nums: number[], k: number): number[] {
//     const n = nums.length
//     const originArr = Array.from(nums)

//     if (k == 1) return nums

//     for (let i = 0; i < n - 1; i++) {
//         if (nums[i + 1] - nums[i] == 1) nums[i] = 1
//         else nums[i] = 0
//     }

//     const ans: number[] = []
//     let l = 0, r = 0
//     let sum = 0
//     for (; r < n - 1; r++) {
//         sum += nums[r]
//         while (r - l > k - 2) {  // 因为新的 nums 中储存的值是 原nums 中相邻两个元素的关系值，因此映射过来后，窗口实际长度 -1，变为 k - 1 (左右两端的下标只差为 k - 2)
//             sum -= nums[l]
//             l++
//         }
//         if (r - l == k - 2) {
//             ans.push(sum == k - 1 ? originArr[r + 1] : -1)
//         }
//     }
//     return ans
// };

/**
 * 简洁 O(n) 写法：
 * 上述的滑动窗口可以再进一步简化为直接遍历计数的方式
 */
function resultsArray(nums: number[], k: number): number[] {
    const n = nums.length
    let cnt = 0
    const ans: number[] = []
    for (let i = 0; i < n; i++) {
        if (i == 0 || nums[i] - nums[i - 1] == 1) {
            cnt++
        } else {
            cnt = 1
        }

        if (i >= k - 1) {
            if (cnt >= k) {
                ans.push(nums[i])   
            } else {
                ans.push(-1)
            }
        }
    }
    return ans
}

console.log(resultsArray([1,2,3,4,3,2,5], 3))
console.log(resultsArray([2,2,2,2,2], 4))
console.log(resultsArray([3,2,3,2,3,2], 2))
console.log(resultsArray([1,3,4], 2))