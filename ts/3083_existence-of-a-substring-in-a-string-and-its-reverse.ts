/**
 * “判断字符串 s 是否存在一个长度为 2 的子字符串，在 s 反转后的字符串中也出现”
 * 等价于
 * “判断字符串 s 是否存在一对长度为 2 的子字符串 xy 和 yx（其中，x 和 y 都代表一个字符）”
 * 
 * 可以使用 bool vis[26][26] 表示两个字符组成的字符串是否在 s 中出现过，
 * 比如当前遍历到的字符串是 xy, 如果 vis[y][x] 等于 true，直接返回 true。
 * @param s 
 */
function isSubstringPresent(s: string): boolean {
    const vis = Array.from({ length: 26 }, () => Array(26).fill(false))
    for (let i = 1; i < s.length; i++) {
        const x = s[i - 1].charCodeAt(0) - 'a'.charCodeAt(0)
        const y = s[i].charCodeAt(0) - 'a'.charCodeAt(0)
        vis[x][y] = true
        if (vis[y][x]) return true
    }
    return false
};

console.log(isSubstringPresent('leetcode'))
console.log(isSubstringPresent('abcba'))
console.log(isSubstringPresent('abcd'))