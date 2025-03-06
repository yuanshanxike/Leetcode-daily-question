/**
 * 本题可以直接调用 1278 的代码，直接 return palindromePartition(s, 3) == 0.
 * 
 * 也可以像 132 那样使用 dp 预先计算出所有的回文字符串 palDp，palDp[i][j] 表示 s[i .. j] 是否为回文字符串。
 * 因为需要分割成三个 非空 回文字符串，首尾的两个回文字符串一定包含下标 0 的字符串及下标为 n - 1 的字符串。
 * 那么我们可以在 palDp 中进行枚举 (i, j) 为 true 的格子，然后用 i - 1 和 j + 1 分别在 palDp 中进行查表。
 * 如果 palDp[0][i - 1] && palDp[j + 1][n - 1] == true. 则放回 true，找不到这样的 (i, j) 则返回 false.
 * @param s 
 */
function checkPartitioning(s: string): boolean {
    const n = s.length
    const palDp: Boolean[][] = Array.from({ length: n }, (_, i) => Array(n).fill(false))

    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            if (j - i <= 1 || palDp[i + 1][j - 1]) {
                palDp[i][j] = s[j] == s[i]
            }
        }
    }

    // 枚举中间判断两边
    for (let i = 1; i < n - 1; i++) {
        for (let j = i; j < n - 1; j++) {
            if (palDp[i][j] && palDp[0][i - 1] && palDp[j + 1][n - 1]) return true 
        }
    }
    return false
};

console.log(checkPartitioning('abcbdd'))
console.log(checkPartitioning('bcbddxy'))