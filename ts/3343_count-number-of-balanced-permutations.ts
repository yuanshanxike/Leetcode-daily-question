// 预处理计算
const MOD = BigInt(1e9) + 7n
const MX = 40

const fac: bigint[] = Array(MX + 1).fill(0n)  // fac[i] = i!
fac[0] = 1n
for(let i = 1; i <= MX; i++) {
    fac[i] = fac[i - 1] * BigInt(i) % MOD
}

const invF: bigint[] = Array(MX + 1).fill(0n)  // inv_f[i] = i!^-1
invF[MX] = pow(BigInt(fac[MX]), MOD - 2n)  // 除法的取模公式
for(let i = MX; i > 0; i--) {
    invF[i - 1] = invF[i] * BigInt(i) % MOD
}

/**
 * 多重集排列数 + 计数 DP
 * (本体的 ts/js 版本，数值结算的变量类型需要使用 bigint 代替 number。否则使用 number 会有比较严重的精度丢失的问题。如果可以，这种要求高精度计算的题尽量不要使用 js/ts 来编写)
 * https://leetcode.cn/problems/count-number-of-balanced-permutations/solutions/2975507/duo-zhong-ji-pai-lie-shu-ji-shu-dppython-42ky/?envType=daily-question&envId=2025-05-09
 * @param num 
 */
function countBalancedPermutations(num: string): number {
    const cnt = Array(10).fill(0)
    let total = 0
    for(const c of num) {
        const d = c.charCodeAt(0) - '0'.charCodeAt(0)
        cnt[d]++
        total += d
    }

    if (total % 2 == 1) return 0

    for(let i = 1; i < 10; i++) {
        cnt[i] += cnt[i - 1]
    }

    const n = num.length
    const n1 = n >> 1
    const memo: bigint[][][] = Array.from({ length: 10 }, () => Array.from({ length: n1 + 1 }, () => Array((total >> 1) + 1).fill(-1n)))  // -1 表示没有计算过

    function dfs(i: number, left1: number, leftS: number): bigint {
        if (i < 0) {
            if (leftS > 0) return 0n
            return 1n
        }
        const p = memo[i][left1][leftS]
        if (p != -1n) {  // 之前计算过
            return p
        }
        let res = 0n
        let c = cnt[i]
        if (i > 0) {
            c -= cnt[i - 1]
        }
        const left2 = cnt[i] - left1
        for(let k = Math.max(c - left2, 0); k <= Math.min(c, left1) && k * i <= leftS; k++) {
            const r = dfs(i - 1, left1 - k, leftS - k * i)
            res = (res + BigInt(r) * BigInt(invF[k]) % MOD * BigInt(invF[c - k])) % MOD
        }
        memo[i][left1][leftS] = res  // 记忆化
        return res
    }

    return Number(fac[n1] * fac[n - n1] % MOD * dfs(9, n1, total >> 1) % MOD)
}

function pow(x: bigint, n: bigint): bigint {
    let res = 1n
    for (; n > 0n; n >>= 1n) {
        if (n % 2n == 1n) {
            res = res * x % MOD
        }
        x = x ** 2n % MOD
    }
    return res
}

console.log(countBalancedPermutations('123'))
console.log(countBalancedPermutations('112'))
console.log(countBalancedPermutations('12345'))
console.log(countBalancedPermutations('125312'))
console.log(countBalancedPermutations('2719707018802576'))