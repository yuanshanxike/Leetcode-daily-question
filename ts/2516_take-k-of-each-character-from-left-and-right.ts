// /**
//  * 预处理前后缀和 + 记忆化搜索
//  * （s 太长会报内存）
//  * @param s 
//  * @param k 
//  * @returns 
//  */
// function takeCharacters(s: string, k: number): number {
//     const n = s.length
//     const prefix: number[][] = []
//     const suffix: number[][] = []

//     let lcs = [0, 0, 0]
//     for (let i = 0; i < n; i++) {
//         const c = s[i]
//         switch (c) {
//             case 'a':
//                 lcs[0]++
//                 break
//             case 'b':
//                 lcs[1]++
//                 break
//             case 'c':
//                 lcs[2]++
//                 break
//         }
//         prefix.push([... lcs])
//     }

//     if (prefix[n - 1][0] < k || prefix[n - 1][1] < k || prefix[n - 1][2] < k) {
//         return -1
//     }

//     lcs = [0, 0, 0]
//     for (let i = n - 1; i >= 0; i--) {
//         const c = s[i]
//         switch (c) {
//             case 'a':
//                 lcs[0]++
//                 break
//             case 'b':
//                 lcs[1]++
//                 break
//             case 'c':
//                 lcs[2]++
//                 break
//         }
//         suffix.push([... lcs])
//     }
//     suffix.reverse()

//     const memory: number[][] = Array.from({ length: n }, () => Array(n).fill(-1))  // 如果字符串太长，申请开辟记忆化数组会爆内存: FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory

//     function dfs(l: number, r: number): number {
//         if (l >= r) return n

//         if (l >= 0 && r < n && memory[l][r] != -1) return memory[l][r]

//         const a = (l >= 0 ? prefix[l][0] : 0) + (r < n ? suffix[r][0] : 0)
//         const b = (l >= 0 ? prefix[l][1] : 0) + (r < n ? suffix[r][1] : 0)
//         const c = (l >= 0 ? prefix[l][2] : 0) + (r < n ? suffix[r][2] : 0)

//         if (a >= k && b >= k && c >= k) {
//             return l + 1 + n - r
//         }

//         if (l >= 0 && r < n) {
//             memory[l][r] = Math.min(dfs(l + 1, r), dfs(l, r - 1))

//             return memory[l][r]
//         } else {
//             return Math.min(dfs(l + 1, r), dfs(l, r - 1))
//         }
//     }

//     return dfs(-1, n)
// };


/**
 * 逆向思维：从两边开始，三种字母至少要取走 k 个，那么中间就最多剩余 cnt('a') - k 个 a、 cnt('b') - k 个 b、cnt('c') - k 个 c.
 * 由于只能从 s 最左侧和最右侧取走字母，所以剩下的字母是 s 的子串。
 * 由于子串越短越能满足要求，越长越不能满足要求，有单调性，可以用滑动窗口解决。
 * 需要求解的是：最长满足要求的子串长度。
 * 使用 滑动窗口 来计算中间剩余部分的最大长度，那么就对应着两边的最短长度（需要的最少分钟数）
 * 先遍历一遍字符串，统计每种字母的总数。
 * 可以统计窗口外字母的数量。初始窗口长度为 0，表示所有字母都被取走。
 * 每次得到合法的窗口长度后，通过字符串长度 - 窗口长度更新最小值。
 * @param s 
 * @param k 
 */
function takeCharacters(s: string, k: number): number {
    const n = s.length
    const cntAbc: number[] = [0, 0, 0]
    for (const alpha of s) {
        cntAbc[alpha.charCodeAt(0) - 'a'.charCodeAt(0)]++
    }

    if (!cntAbc.every((cnt) => cnt >= k)) {  // 任意字母的出现总数如果都不到 k，可以直接返回 -1
        return -1
    }

    let maxWinLin = 0  // 初始窗口长度为 0（所有元素都被取走），对应最小窗口长度
    // 滑动窗口
    let l = 0, r = 0
    for (; r < n; r++) {
        const rAbcIdx = s[r].charCodeAt(0) - 'a'.charCodeAt(0)
        cntAbc[rAbcIdx]--  // 右移窗口右端点，导致可被取走的字母数量减少
        while (cntAbc[rAbcIdx] < k) {  // 当有可被取走的字母数量少于 k 时，需要不断右移左端点，补充可被取走的字母数量，直到 s[r] 字母可被取走数量增加回 k
            const lAbcIdx = s[l++].charCodeAt(0) - 'a'.charCodeAt(0)
            cntAbc[lAbcIdx]++
        }
        maxWinLin = Math.max(maxWinLin, r - l + 1)
    }
    return n - maxWinLin
}

console.log(takeCharacters("aabaaaacaabc", 2))
console.log(takeCharacters("a", 1))
console.log(takeCharacters("aabaaaacbabcbacbabcabcbabbabacaabc", 8))
console.log(takeCharacters("aabaaaacbabcbacbabcabcbabbabacaabc", 7))
console.log(takeCharacters("aabaaaacbabcbacbabcabcbabbabacaabc", 6))
console.log(takeCharacters("abccba", 2))
console.log(takeCharacters("a", 0))