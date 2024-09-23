/**数位 dp */
function findIntegers(n: number): number {
    let highestBit = -1
    for (let i = n; i > 0; i >>= 1) {
        highestBit++
    }

    const dp = Array(highestBit)  // dp[i] 表示二进制数的最高位为 i（也就是第 i 位一定为 1）时（低位的数字任意，但要符合题目“二进制表示不存在连续的 1”的要求），能容纳的相邻位没有全为 1 的二进制数字
    if (n > 0) dp[0] = 2 // "0" 和 "1" 是符合要求的
    if (n > 1) dp[1] = dp[0] + 1 // 比第 1 位第一位的第 0 位有两种符合要求的情况，再加上 "10" 这种新的符合要求的情况
    for (let i = 2; i <= highestBit; i++) {
        dp[i] = dp[i - 2] + dp[i - 1]  // 状态转移方程：在低一位满足条件的数的数量（dp[i - 1]）的基础上，再加上第 i 位为 1 时符合要求的数的数量(dp[i - 2], 也就是等于比最高位低两位时的满足条件的数的数量)
    }

    let ans = 0, pre = 0
    for (let i = highestBit; i >= 0; i--) {
        if (n & (1 << i)) {
            if (i > 0) ans += dp[i - 1]  // i == highestBit 时，计算的 i - 1 是位数比 highestBit 少的合法数字的数量，再加上每一位不与 "1" 相邻的 "1" 取 "0" 时, 然后比它更低的一位取 "1" 时, 合法的数字数量（同状态转移方程中的 dp[i - 1] 释义）
            else ans += 1 // 
            if (pre == 1) break  // 在 n 中遇到连续的 "1"，说明如果把重复的 "1" 变成 "0"，后面的位变成 "1 0 1 0 ..." 的形式，则能够构造出小于 n 中最大的合法数字。这样的合法数字有多少个呢？答案是 dp[i - 1] 个
            pre = 1
        } else {
            pre = 0
        }

        if (i == 0) ans++  //
    }

    return ans
};

console.log(findIntegers(5))
console.log(findIntegers(1))
console.log(findIntegers(2))
console.log(findIntegers(4))
console.log(findIntegers(1024))
console.log(findIntegers(113)) // 113: 1110001, 81: 1010001  85：1010101
console.log(findIntegers(85))
console.log(findIntegers(13)) // 13: 1101, 9: 1001
console.log(findIntegers(10)) // 13: 1101, 9: 1001
console.log(findIntegers(20)) // 20: 10100

/*
0
1
10

100
101

1010101

     0  1

-1： 1 1

0: 10(2)  1

① 100(4) - 101(5) 2

1001
② 1000(8) - 1001(9) - 1010(10)  1 + 1 + 1 = 3

③ 10000(16) - 10101(21)  1 + 1 + 1 + 2 = 5

21（10101）: 5 + 3 + 2 + 1 + 1 + 1 = 13
*/


/*

111 -> 101

*/