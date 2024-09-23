/**
 * 数位 dp
 * 在一定的限制下，构造并统计能够构造出的合法情况数量
 * 
 * 用10位的二进制数表示一个 0 ~ 9 的集合，如果第 i (0 <= i <= 9) 位为 1，则表示数字 i 已经出现过，为 0 则表示未出现过。
 * 
 * @param n 
 * @returns 
 */
function countSpecialNumbers(n: number): number {
    const s = n.toString()
    const m = s.length
    const memory = Array.from({ length: m }, () => Array(1 << 10).fill(-1))  // 只去记忆化“不受限”(受限：由于之前构造的高位和 n 的高位相等，当前构造到的第 i 位不能任取)且已经开始构造数(不能选择跳过第 i 位)的情况。因为对于任意(i, mask)“受限”和没开始构造数的情况只会递归到一次，没必要记忆化
    function dfs(i: number, mask: number, isLimit: boolean, isNum: boolean) {
        if (i == m) {
            return isNum ? 1 : 0  // is_num 为 true 表示得到了一个合法的数字
        }
        if (!isLimit && isNum && memory[i][mask] != -1) {
            return memory[i][mask]
        }
        let res = 0
        if (!isNum) { // 可以跳过当前数位
            res += dfs(i + 1, mask, false, false)
        }
        // 如果前面填的数字都和 n 的一样，那么这一位至多填数字 s[i]（否则就超过 n 了）
        const up = isLimit ? +s[i] : 9
        // 枚举要填入的数字 d
        // 如果前面没有填数字，则必须从 1 开始（因为不能有前导零）
        for (let d = isNum ? 0 : 1; d <= up; d++) {
            if ((mask >> d & 1) == 0) {  // d 不在 mask 中，说明之前没有填过 d
                res += dfs(i + 1, mask | (1 << d), isLimit && d == up, true)
            }
        }
        if (!isLimit && isNum) {
            memory[i][mask] = res // 记忆化
        }
        return res
    }
    return dfs(0, 0, true, false)
};

console.log(countSpecialNumbers(20))
console.log(countSpecialNumbers(5))
console.log(countSpecialNumbers(135))