function countTexts(pressedKeys: string): number {
    const MOD = 10 ** 9 + 7
    const n = pressedKeys.length
    const dp = new Array(n + 1).fill(0)
    dp[0] = 1  // 第一个按键单独作为一个字符
    for (let i = 1; i <= n; i++) {
        const key = pressedKeys[i]
        dp[i] = dp[i - 1]  // i 单独作为一个字符
        const TextCnt = key === '7' || key === '9' ? 3 : 2
        for (let j = 1; j <= TextCnt; j++) {
            if (i - j >= 0 && pressedKeys[i - j] == key) {
                dp[i] = (dp[i] + (dp[i - j - 1] ?? 1)) % MOD
            } else {
                break
            }
        }
    }
    return dp[n]
};

console.log(countTexts("22233"))
console.log(countTexts("222222222222222222222222222222222222"))
