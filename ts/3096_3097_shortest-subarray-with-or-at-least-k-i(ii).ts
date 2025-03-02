// /**
//  * 方法一：LogTrick
//  * @param nums 
//  * @param k 
//  */
// function minimumSubarrayLength(nums: number[], k: number): number {
//     const n = nums.length
//     let ans = n + 1
//     for (let i = 0; i < n; i++) {
//         if (nums[i] >= k) return 1
//         for (let j = i - 1; j >= 0; j--) {
//             if ((nums[i] | nums[j]) == nums[j]) break  // nums[i] 如果已经是 nums[j] 的子集，那么 nums[i] 也一定是 nums[k]（0 <= k <= i）的子集。也就是继续向前或运算也不能改变上次计算的结果，终止继续向前或运算。
//             nums[j] = nums[i] | nums[j]  // 如果能执行到，nums[j] 一定会变大，且最多执行（变大）log(max(nums)) 次
//             if (nums[j] >= k) ans = Math.min(ans, i - j + 1)
//         }
//     }
//     return ans > n ? -1 : ans
// };

/**
 * 方法二：滑动窗口 + BitCount
 * 当窗口元素的 or 结果大于等于 k 时，尝试右移窗口的左端点来减小窗口，如果窗口的 or 结果又变得小于 k，尝试右移窗口右端点来扩大窗口。
 * 因为 or 运算有一定的单调性，窗口变大是向着 or 运行结果变得的方向在推进。
 * @param nums 
 * @param k 
 */
function minimumSubarrayLength(nums: number[], k: number): number {
    const n = nums.length
    const bitLen = Math.ceil(Math.log2(10 ** 9))
    const bitCnt = Array(bitLen).fill(0)
    let l = 0, orRes = 0
    let ans = n + 1
    for (let r = 0; r < n; r++) {
        orRes |= nums[r]
        for (let i = 0 ; i <= bitLen; i++) {
            if (nums[r] >> i & 1) {
                bitCnt[i]++
            }
        }

        while (l <= r && orRes >= k) {
            ans = Math.min(ans, r - l + 1)

            for (let i = 0 ; i <= bitLen; i++) {
                if (nums[l] >> i & 1) {
                    bitCnt[i]--

                    if (!bitCnt[i]) {
                        orRes ^= 1 << i  // 将第 i 位置 0
                    }
                }
            }
            l++
        }
    }
    return ans > n ? -1 : ans
}

console.log(minimumSubarrayLength([1,2,3], 2))
console.log(minimumSubarrayLength([2,1,8], 10))
console.log(minimumSubarrayLength([1,2], 0))