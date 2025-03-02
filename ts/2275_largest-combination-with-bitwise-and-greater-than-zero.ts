// /**
//  * 记忆化搜素（或者动态规划）
//  * 由于 candidates.length 最大为 10^5, 而 candidates[i] 最大为 10^7.
//  * 状态数最多可能为 10^12.
//  * 
//  * TLE
//  * @param candidates 
//  * @returns 
//  */
// function largestCombination(candidates: number[]): number {
//     const n = candidates.length
//     const memo: Record<number, number> = {}
//     function dfs(i: number, res: number): number {
//         if (i >= n) return 0
//         const key = (res << 14) + i
//         if (memo[key] != undefined) return memo[key] 

//         let max = dfs(i + 1, res)

//         if (res & candidates[i]) {
//             max = Math.max(max, dfs(i + 1, res & candidates[i]) + 1)
//         }
//         memo[key] = max
//         return max
//     }

//     return dfs(0, (1 << 30) - 1)
// };

/**
 * 换一个角度来看待这个问题：
 * 题目要求 and 之不为 0 的最长子集的长度，那么可以考虑一下“怎样的多个数字 and 结果不会等于 0?”.
 * 根据 and 位运算的定义，如果这些参与 and 的数字，至少有一个二进制位都等于 1，那么它们 and 的结果一定就不会等于 0.
 * 
 * 这启发我们可以从二进制的最低位开始，通过遍历 candidates 分别与其中元素进行 and 运算，统计该二进制位为 1 的元素数量。
 * 维护每个二进制位为 1 时对应的元素数量的最大值，即为答案。
 * 其中，candidates 中的每个元素可能会被统计到不同的二进制位为 1 的数量中，但这不会有任何影响。
 * @param candidates 
 */
function largestCombination(candidates: number[]): number {
    let ans = 1
    const highestBit = Math.floor(Math.log2(10 ** 7))
    for (let i = 0; i <= highestBit; i++) {
        let cnt = 0, isEnd = true
        for (const c of candidates) {
            if ((c & (1 << i)) > 0) cnt++

            if (c > (1 << i)) isEnd = false
        }
        ans = Math.max(cnt, ans)

        if (isEnd) break  // 当前枚举到的二进制数已经大于 candidates 中所有的元素，并且之后也不会有 (c & (1 << i)) > 0 成立，终止循环
    }
    return ans
}

console.log(largestCombination([16,17,71,62,12,24,14]))
console.log(largestCombination([8,8]))