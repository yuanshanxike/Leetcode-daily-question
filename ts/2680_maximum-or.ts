/**
 * 贪心
 * 优先选择二进制位数最多的数右移 k 位再 OR，因为这样可以尽可能获得更高的二进制位。
 * 如果存在多个二进制位数相同的数，则分别对它们右移 k 位并和其他数的或值 OR。
 * 为了更快地计算其他数的 OR 值，第一次遍历时，分别计算出 nums 前缀和后缀的或值。
 * @param nums 
 * @param k 
 */
function maximumOr(nums: number[], k: number): number {
    const n = nums.length
    const prefixOr = Array(n).fill(0)
    const suffixOr = Array(n).fill(0)
    let maxBit = 0
    let p = 0, s = 0
    for (let i = 0; i < n; i++) {
        const j = n - 1 - i
        p |= nums[i]
        s |= nums[j]
        prefixOr[i] = p
        suffixOr[j] = s
        maxBit = Math.max(maxBit, nums[i].toString(2).length)
    }

    let res = 0n
    for (let i = 0; i < n; i++) {
        const val = BigInt(i > 0 ? prefixOr[i - 1] : 0) | (BigInt(nums[i]) << BigInt(k)) | BigInt(i < n - 1 ? suffixOr[i + 1] : 0)
        if (val > res) {
            res = val
        }
    }
    return Number(res)
};

console.log(maximumOr([12, 9], 1))
console.log(maximumOr([8, 1, 2], 2))
console.log(maximumOr([7, 932969725, 1, 10], 15))