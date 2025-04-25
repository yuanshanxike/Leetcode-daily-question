/**
 * 考虑每次只比较一对字母的 variance，比如当 (a, b) 时，
 * 当遇到 a 时，把 variance +1；当遇到 b 时，把 variance -1。
 * 其余的字母当作 0 来处理。
 * 对于计算选择 (a, b) 时的最大值，可以使用状态机 dp 来进行计算。
 * 
 * 状态机 dp
 * 
 * 与 “53.最大子数组和” 不同的是：
 * - 对于只包含 a 的子串，实际的波动值是 0，而不是 a 出现的次数；
 * - 对于只包含 b 的子串，由于我们把 b 当作 −1，这样算出的「子数组和」是负数，不会更新答案的最大值;
 * - 当子串包含 b 且「子数组和」是正数，那么子串一定包含 a。
 * 我们最终需要求解的答案，也是希望能包含最少的 b 的，所以只要保证子串包含 b 就行（子串全为 b 也没关系，不会影响答案）。
 * 
 * 状态定义。在 53 题的基础上，用一个额外的参数 j 表示是否需要包含 b：
 * - 定义 f[i+1][0] 表示以 s[i] 结尾的最大子数组和，包不包含 b 都可以(不确定是否包含 b)。加一是方便定义初始值。(f[i+1][0] 可以看成是 s[0 ... i] 上的“最大子数组和”)
 * - 定义 f[i+1][1] 表示以 s[i] 结尾的、一定包含 b 的最大子数组和。
 * 
 * 状态转移方程：
 * - 对于 f[i+1][0]，转移方程同 53 题，即 f[i+1][0]=max(f[i][0],0)+v，其中 v 等于 1、−1 或 0。
 * - 对于 f[i+1][1]：
 *  - 如果 s[i]=a，那么只能在以 s[i−1] 结尾的、且一定包含 b 的子数组后面加上 s[i]，即 f[i+1][1]=f[i][1]+1。
 *  - 如果 s[i]=b，那么问题等价于以 s[i] 结尾的最大子数组和（此时必然包含 b），即 f[i+1][1]=f[i+1][0]。（等于 s[0 ... i] 上的“最大子数组和”，也就是 f[i+1][0]）
 *  - 其他情况和 s[i]=a 是一样的，只能在以 s[i−1] 结尾的、且一定包含 b 的子数组后面加上 s[i]，即 f[i+1][1]=f[i][1]+0=f[i][1]。
 * 
 * 初始值：
 * - f[0][0]=0。一开始什么也没有，子数组和为 0。
 * - f[0][1]=−∞。一开始什么也没有，一定包含 b 的情况不存在，用 −∞ 表示，这样计算 max 不会取到 −∞。
 * 
 * 时间复杂度 O(26 * 25 * n)
 * @param s 
 */
function largestVariance(s: string): number {
    let ans = 0  // 初始化为结果可能的最小值 0，防止被负数更新
    const aCode = 'a'.charCodeAt(0), zCode = 'z'.charCodeAt(0)
    for (let a = aCode; a <= zCode; a++) {
        for (let b = aCode; b <= zCode; b++) {
            // 枚举所有小写字母对
            if (a == b) continue  // (a, b) 中 a != b
            let f0 = 0, f1 = -Infinity
            for (const chr of s) {
                if (chr.charCodeAt(0) == a) {
                    f0 = Math.max(f0, 0) + 1
                    f1++
                } else if (chr.charCodeAt(0) == b) {
                    f1 = f0 = Math.max(f0, 0) - 1
                }
                // else: f0 = max(f0, 0) 可以留到 ch 等于 a 或者 b 的时候计算，f1 不变
                ans = Math.max(ans, f1)
            }
        }
    }
    return ans
}

/**
 * 优化：
 * 在遍历 s 时，同时更新所有会变化的状态。
 * 
 * 具体做法：创建两个 26 × 26 的矩阵 f0[a][b] 和 f1[a][b]（a 出现的次数最多，b 出现的次数最少），在遍历 s 的同时，只更新那些会变化的状态，即 a=s[i] 或者 b=s[i] 的状态。
 * 
 * 时间复杂度：O(26 * n)
 * @param s 
 * @returns 
 */
function largestVariance1(s: string): number {
    let ans = 0
    const f0 = Array.from({ length: 26 }, () => Array(26).fill(0))  // s[0 ... i] 上的“最大子数组和”
    const f1 = Array.from({ length: 26 }, () => Array(26).fill(-Infinity))  // s[0 ... i] 上的“最大波动值”

    for (let chr of s) {
        const code = chr.charCodeAt(0) - 'a'.charCodeAt(0)
        // 遍历到 chr 时，只需计算 a=chr 或者 b=chr 的状态，其他状态和 chr 无关，f 值不变
        for (let i = 0; i < 26; i++) {
            if (i == code) continue  // (a, b) 中 a != b
            // 假设出现次数最多的字母 a=chr，更新所有 b=i 的状态
            f0[code][i] = Math.max(f0[code][i], 0) + 1
            f1[code][i]++
            // 假设出现次数最少的字母 b=chr，更新所有 a=i 的状态
            f1[i][code] = f0[i][code] = Math.max(f0[i][code], 0) - 1
            
            ans = Math.max(ans, f1[code][i], f1[i][code])  // 更新当前“最大后缀和”的同时，维护“最大波动值”的最大值
        }
    }
    return ans
};

console.log(largestVariance('aababbb'))
console.log(largestVariance('aababbbb'))
console.log(largestVariance('aaaaaaa'))
console.log(largestVariance('abcde'))