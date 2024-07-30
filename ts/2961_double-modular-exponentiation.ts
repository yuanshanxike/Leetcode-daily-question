/**
 * 根据模幂运算法则 —— a^b% p = ((a % p)^b) % p 可将幂运算的底数减小，
 * 然后用快速幂进行幂运算，同时将计算二进制幂的幂运算的每一步用上面公式 a^2% p = ((a % p)^2) % p,
 * 然后在把对应幂指数的结果相加时，运用乘法模运算的法则 (a * b) % p = ((a % p) * (b % p)) % p。
 * 保证每一步运算不会溢出。
  */
function getGoodIndices(variables: number[][], target: number): number[] {
    const ans: number[] = []
    variables.forEach(([a, b , c, m], idx) => {
        if (modularMultiplication(modularMultiplication(a, b, 10), c, m) == target) {
            ans.push(idx)
        }
    })
    return ans
};

// 模幂运算
function modularMultiplication(b: number, n: number, mod: number): number {
    return quickpow(b % mod, n, mod) % mod
}

// 快速幂
function quickpow(b: number, n: number, mod: number): number {
    let ans = 1
    let divisor = b
    while (n > 0) {
        if ((n & 1) == 1) {
            ans = (ans % mod) * (divisor % mod) % mod
        }
        divisor = ((divisor % mod) ** 2) % mod
        n >>= 1
    }
    return ans
}

console.log(getGoodIndices([[2,3,3,10],[3,3,3,1],[6,1,1,4]], 2))
console.log(getGoodIndices([[39,3,1000,1000]], 17))
console.log(getGoodIndices([[1000,1000,1000,1000]], 0))
console.log(getGoodIndices([ [ 64, 8, 83, 81 ], [ 63, 80, 11, 90 ], [ 72, 3, 19, 83 ] ], 34))