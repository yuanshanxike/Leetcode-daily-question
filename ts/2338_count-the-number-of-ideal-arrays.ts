const MOD = 1e9 + 7
const MAX_N = 1e4
const MAX_K = 13 // 2^13 < 10^4 < 2^14, 表示相同质因子小球的最多数量

// 预处理: 分解质因子
const exp = Array.from({ length: MAX_N + 1 }, () => [] as number[])  // EXP[x] 为 x 分解质因数后，每个质因数的指数 (每种相同小球的个数)
for (let x = 2; x < exp.length; x++) {
    let t = x, i = 2
    while (i ** 2 <= t) {
        let k = 0
        while (t % i == 0) {
            k += 1
            t = Math.floor(t / i)
        }
        if (k) exp[x].push(k);
        i += 1
    }
    if (t > 1) exp[x].push(1);  // “试除法”分解出来的最后一个质因子的指数为 1 (对应这种质因子只有一个小球)
}

// 预处理组合数
const c = Array.from({ length: MAX_N + MAX_K }, () => Array(MAX_K + 1).fill(0))
for (let i = 0; i < c.length; i++) {
    c[i][0] = 1
    for (let j = 1; j <= Math.min(i, MAX_K); j++) {
        c[i][j] = (c[i - 1][j] + c[i - 1][j - 1]) % MOD  // 组合数递推公式（选或不选第 i 个数的两种情况之和）
    }
}

/**
 * 组合数学：https://leetcode.cn/problems/count-the-number-of-ideal-arrays/solutions/1659088/shu-lun-zu-he-shu-xue-zuo-fa-by-endlessc-iouh/?envType=daily-question&envId=2025-04-22
 * @param n 
 * @param maxValue 
 */
function idealArrays(n: number, maxValue: number): number {
    let ans = 0
    for (let x = 1; x <= maxValue; x++) {
        let res = 1n
        for (const k of exp[x]) {
            res = res * BigInt(c[n + k - 1][k]) % BigInt(MOD)  // 此处的乘法运算如果不使用 bitInt，使用 number 可能会导致精度溢出
        }
        ans += Number(res)
    }
    return ans % MOD
};

console.log(idealArrays(2, 5))
console.log(idealArrays(5, 3))