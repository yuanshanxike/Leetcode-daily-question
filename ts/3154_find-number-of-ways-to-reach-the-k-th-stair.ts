/**方法一：记忆化搜索
 *  
 * 2^jump: 1, 2, 4, 8, 16, ...
 * jump:   0, 1, 2, 3, 4, ... 
 */
function waysToReachStair(k: number): number {
    const memory = new Map<BigInt, number>()

    function getKey(cur: number, jump: number, lastDown: boolean): BigInt {
        let key = 0n
        let offset = 0n
        key += (lastDown ? 1n : 0n)
        offset += 1n
        key += BigInt(jump) << offset
        offset += 5n // 0 <= jump <= 5
        key += BigInt(cur) << offset
        return key
    }

    // 递归无副作用，相同参数，无论什么时候调用，调用几次，只要参数相同，结果都一致，所以可以使用记忆化
    function dfs(cur: number, jump: number, lastDown: boolean): number {
        const key = getKey(cur, jump, lastDown)
        if (memory.has(key)) return memory.get(key)!

        let times = cur == k ? 1 : 0 // 每次到达目标台阶，则可行的方案数 +1
        if (cur > k) {  // 当前位置在目标台阶之上
            if (!lastDown) {  // 且可以往下走就一定选择往下走（因为往上走了之后就回不来了）
                times += dfs(cur - 1, jump, true)
            } else return times  // 如果此时不能够往下走，就不能再到达 k
        } else {  // cur <= k, 当前位置在目标台阶之下或已经处于目标台阶
            if (cur + (1 << jump) - k <= 1) { // 确保下次能够跳回 k
                times += dfs(cur + (1 << jump), jump + 1, false)
            }/* else if (!lastDown) {
                times += dfs(cur - 1, jump, true) // 否则如果此时能够继续往下跳就往下跳
            } else return times  // 否则不能够到达 k*/
            
            if (cur > 0 && !lastDown) { // 此时如果能够往下跳，也可以选择先往下跳
                times += dfs(cur - 1, jump, true)
            }
        }

        memory.set(key, times)

        return times
    }

    return dfs(1, 0, false)
};

console.log(waysToReachStair(0))
console.log(waysToReachStair(1))
console.log(waysToReachStair(1e9))

// 方法二：组合数学（时间复杂度: O(1)）
/**
 * 假设使用了 m 次操作一，j 次操作二，那么有:
 * 1 + 2^0 + 2^1 + 2^2 + ... + 2^(j-1) - m = k  (第一个“1”是起始位置)
 * 化简得到： m = 2^j - k
 * 根据题目要求，不能有连续的操作一，意味着在操作序列中，操作一需要被操作二“隔开”，也就是说可以用“隔板法”来进行解答:
 * 可以在操作二的前后和相邻元素之间插入操作一（m 次），共 j + 1 个空位，那么有 C(j + 1，m) 种插法。
 * 
 * 数据上限是 1e9，用二进制表示就是 2^30 以内的，那么 j + 1 的上限就是 31，预先计算出 n,m = 0~31 的 C(n, m),
 * (j = 0 -> 30)Σ C(j + 1, m), 其中 0 <= m <= j + 1。就是所求的答案
 * 
 * 可优化：只需从 m >= 0 => 2^j >= k 开始枚举，相当于 j 至少是 max(k - 1, 0) 的二进制长度（0 的二进制长度视为 0），
 * 当 2^j - k > j + 1 时，结束循环。
 */
namespace L3154_combinatorics {
    const N = 31
    const c: number[][] = Array.from({ length: N }, () => Array(N).fill(0))

    // 预计算 0 ~ 31 的组合数
    for (let i = 0; i < 31; i++) {
        c[i][0] = c[i][i] = 1
        for (let j = 1; j < i; j++) {
            c[i][j] = c[i - 1][j] + c[i - 1][j - 1]
        }
    }

    function waysToReachStair(k: number): number {
        let ans = 0
        for (let j = 0; j < N - 1; j++) {
            const m = (1 << j) - k
            if (0 <= m && m <= j + 1) {
                ans += c[j + 1][m]
            }
        }
        return ans
    }

    console.log(waysToReachStair(0))
    console.log(waysToReachStair(1))
    console.log(waysToReachStair(1e9))
}