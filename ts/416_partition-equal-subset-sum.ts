/**
 * bitset 优化
 * （0|1 背包写法参考 rust 版本代码）
 * @param nums 
 */
function canPartition(nums: number[]): boolean {
    let s = nums.reduce((pre, num) => pre + num, 0)
    if (s % 2) return false
    s /= 2
    let f = 1n  // target == 0 是递归边界（对应 nums 中不进行选择）
    for (const num of nums) {
        f |= f << BigInt(num)
        
        if (f >> BigInt(s) & 1n) return true
    }
    return false
};