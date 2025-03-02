/**
 * 前后缀分解 + 二维 0-1 背包（刷表法）
 * @param nums 
 * @param k 
 * @returns 
 */
function maxValue(nums: number[], k: number): number {
    const MX: number = 1 << 7
    const n: number = nums.length
    // 计算后缀数组
    const suf: boolean[][] = Array(n - k + 1).fill(null)  // 后缀数组
    let f: boolean[][] = Array.from({ length: k + 1 }, () => Array(MX).fill(false))
    f[0][0] = true
    for (let i = n - 1; i >= k; i--) {  // 子数组范围这一维度滚动计算
        const v = nums[i]
        for (let j = Math.min(k - 1, n - 1 - i); j >= 0; j--) {  // “刷表法”（为了不影响到同一轮次中尚未处理的状态），一般是从大到小遍历
            for (let x = 0; x < MX; x++) {
                if (f[j][x]) {
                    f[j + 1][x | v] = true  // 刷表法(正向更新)
                }
            }
        }
        if (i <= n - k) {  // 保证 nums[i] ... nums[n - 1] 中至少有 k 个数
            suf[i] = Array.from(f[k])  // 后缀数组中只需要保存 nums[i] ... nums[n - 1] 中的 k 个数能否 or 出对应值的 array
        }
    }
    
    // 计算前缀数组，并同时维护异或最大值
    let ans: number = 0
    f = Array.from({ length: k + 1 }, () => Array(MX).fill(false))
    f[0][0] = true
    for (let i = 0; i < n - k; i++) {
        const v = nums[i]
        for (let j = Math.min(k - 1, i); j >= 0; j--) {  // “刷表法”（为了不影响到同一轮次中尚未处理的状态），一般是从大到小遍历
            for (let x = 0; x < MX; x++) {
                if (f[j][x]) {
                    f[j + 1][x | v] = true
                }
            }
        }
        if (i < k - 1) {  // nums[i] ... nums[n - 1] 中的数字少于 k 个， 无法构成子数组
            continue
        }
        // 当 i 在合法范围内时，枚举前缀数组和后缀数组中存在的 or 结果，维护两个结果的 xor 最大值
        for (let x = 0; x < MX; x++) {
            if (f[k][x]) {
                for (let y = 0; y < MX; y++) {
                    if (suf[i + 1][y]) {
                        ans = Math.max(ans, x ^ y)
                    }
                }
            }
            if (ans == MX - 1) {
                break
            }
        }
    }
    return ans
};

console.log(maxValue([2,6,7], 1))
console.log(maxValue([4,2,5,6,7], 2))