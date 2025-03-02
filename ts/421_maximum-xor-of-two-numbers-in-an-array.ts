/**
 * 试填法
 * @param nums 
 */
function findMaximumXOR(nums: number[]): number {
    let ans = 0, mask = 0
    const high_bit = Math.max(... nums).toString(2).length - 1
    for (let i = high_bit; i >= 0; i--) {
        mask |= 1 << i
        const newAns = ans | (1 << i)  // check ans 的第 i 位是否可以为 1
        // 像 “1.两数之和” 一样，使用哈希表来检查是否存在两个数，使得它们的异或结果为 newAns
        const seen = new Set<number>()
        for (const num of nums) {
            const prefix = num & mask  // 忽略比 i 更低的位
            if (seen.has(newAns ^ prefix)) {
                ans = newAns
                break
            }
            seen.add(prefix)
        }
    }
    return ans
};

console.log(findMaximumXOR([3, 10, 5, 25, 2, 8]))
console.log(findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]))
console.log(findMaximumXOR([8, 10, 2]))  // 10

// 此外还可以根据当前需要匹配 0 还是 1，使用字典树来对 nums 中的数字进行匹配
// 字典树的节点可以存储 0 和 1 的值，然后遍历 nums 中的数字，将每个数字的二进制表示插入到字典树中
// 然后遍历 nums 中的数字，对于每个数字，在字典树中查找与其异或结果最大的数字