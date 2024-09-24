function maximumSubsequenceCount(text: string, pattern: string): number {
    let ans = 0
    // 统计 pattern[0]、pattern[1] 及 pattern 子序列 出现的数量
    let firstCnt = 0
    let secondCnt = 0
    /* pattern[0] == pattern[1] 的情况，也可以通过直接计算 C(m, 2) + m 的方式计算得出 ans（m 为 pattern[0](pattern[1]) 出现的次数）*/
    for (const c of text) {
        if (pattern[0] == c) {
            firstCnt++
        }
        // 注意 pattern[0] 和 pattern[1] 可能相等，不能把这个判断和上面的判断用 else 连接。
        // 相等时，对于每个 c，还未“成对”时就被统计了一次，所以在统计完成后，ans 的数量已经等于加上了插入一个字符后子序列的数量。
        if (pattern[1] == c) {
            ans += firstCnt
            secondCnt++
        }
    }
    return ans + Math.max(firstCnt, secondCnt) * (pattern[0] == pattern[1] ? 0 : 1)  // 原 text 中子序列出现的数量加上 插入 pattern[0] 或 插入 pattern[1] 所能产生的子序列最多数量 (pattern[0] == pattern[1] 时，相当于已统计过插入一个字符后的子序列数量，则不用额外加上这个数)
};

console.log(maximumSubsequenceCount("abdcdbc", "ac"))
console.log(maximumSubsequenceCount("aabb", "ab"))
console.log(maximumSubsequenceCount("arrrrbrrrcrrrdrrr", "rr"))