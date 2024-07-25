/**
 * 最后两位是 00、25、50、75 的数字都可以被 25 整除。
 * 所以只需要从后往前查找数字：
 * 可以把先前出现过的数字放到 hash 表中，
 * 当遇到的数字是 0 时，查看 hash 中有没有 0；
 * 当遇到的数字是 2 时，查看 hash 中有没有 5；
 * 当遇到的数字是 5 时，查看 hash 中有没有 0；
 * 当遇到的数字是 7 时，查看 hash 中有没有 5。
 * 把期间不匹配的其他数字删除并计数。
 * @param num 
 */
function minimumOperations(num: string): number {
    const len = num.length
    let matched = false
    const set = new Set<string>()
    loop: for (var i = len - 1; i >= 0; i--) {
        const numChar = num[i]
        switch (numChar) {
            case '0':
            case '5':
                if (set.has('0')) {
                    matched = true
                    break loop
                }
                break
            case '2':
            case '7':
                if (set.has('5')) {
                    matched = true
                    break loop
                }
                break
        }
        set.add(numChar)
    }
    return matched ? len - 1 - i - 1 : (set.has('0') ? len - 1 : len)  // 判断是否有匹配上，如果未匹配上还要判断原数字字符串中是否有 0
};

console.log(minimumOperations("2245047"))
console.log(minimumOperations("2908305"))
console.log(minimumOperations("10"))
console.log(minimumOperations("1"))
console.log(minimumOperations("0"))
console.log(minimumOperations("25"))
console.log(minimumOperations("75"))
console.log(minimumOperations("50"))
console.log(minimumOperations("51"))
console.log(minimumOperations("53478"))