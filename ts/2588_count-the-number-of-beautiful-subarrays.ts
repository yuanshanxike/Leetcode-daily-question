/**
 * 将 nums 中的所有元素 num 都用二进制进行表示。
 * 循环遍历 nums 中的元素，并统计每个二进制位中出现 1 的次数。
 * 如果这些 1 都是成对出现（出现次数能被 2 整除），则 nums 是一个美丽数组。
 * 更进一步地，这个性质与 异或运算(XOR) 的性质是相符的，可以直接对数组元素进行异或操作，如果最终结果未 0，该数组就是一个美丽数组。
 * 
 * 至于统计一个数组中包含的美丽子数组数量，我们可以使用 XOR 的满足 结合律 及 对合运算 的性质进行快速求解。
 * 具体来说，从左到右计算前缀异或值，并用一个哈希表统计 nums 中的前缀异或值出现的次数。每次遇到已有的前缀异或值就把已存在的次数统计到答案中。
 * 原理：假如 [0, i] 的异或值与 [0, j] 的异或值相等，根据上述的 XOR 性质，可以推导出 [i, j] 的异或值位 0. 
 * @param nums 
 */
function beautifulSubarrays(nums: number[]): number {
    let xor = 0, ans = 0
    const xorCnt: Record<number, number> = {
        0: 1  // 前缀数组自身也可以是一个美丽子数组
    }
    for (const num of nums) {
        xor ^= num
        if (xorCnt[xor]) {
            ans += xorCnt[xor]  // 更新答案
            xorCnt[xor]++
        } else {
            xorCnt[xor] = 1
        }
    }
    return ans
};

console.log(beautifulSubarrays([4,3,1,2,4]))
console.log(beautifulSubarrays([1,10,4]))