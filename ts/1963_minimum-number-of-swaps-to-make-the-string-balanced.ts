/**
 * 左右括号匹配问题
 * 把左括号 [ 看成 1，右括号 ] 看成 -1.
 * 那么，正确匹配括号时，从左往右遍历 s，前缀和应该始终 >= 0.
 * 每次把左边的 ] 和右边的 [ 进行交换时，都会使得左边位置的前缀和 +2.
 * 实际交换次数就等于前缀和的最小值的绝对值 / 2 并向上取整，保证 s 中的任意前缀和始终 >= 0.
 * @param s 
 */
function minSwaps(s: string): number {
    let prefixSum = 0, minPrefix = s.length
    for (const chr of s) {
        prefixSum += chr == '[' ? 1 : -1
        minPrefix = Math.min(minPrefix, prefixSum)
    }
    return Math.ceil(Math.abs(minPrefix) / 2)
};

console.debug(minSwaps('][]['))
console.debug(minSwaps(']]][[['))
console.debug(minSwaps('[]'))
console.debug(minSwaps('[]]['))
console.debug(minSwaps(']]]]][[[[['))
console.debug(minSwaps(']][][[]][['))