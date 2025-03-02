/**
 * 枚举选哪个(枚举左边第一个值，向右选取数字)
 * @param candidates 
 * @param target 
 */
function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b)
    const n = candidates.length
    const ans: number[][] = []
    const path: number[] = []
    function dfs(i: number, left: number) {
        // 所选元素之和恰好等于 target
        if (left === 0) {
            ans.push([... path])
            return
        }

        // 没有可以选的数字
        if (i === n) return

        // 所选元素之和无法恰好等于 target 了 （剪枝）
        const x = candidates[i]
        if (left < x) return

        // 选 x
        path.push(x)
        dfs(i + 1, left - x)
        path.pop()  // 恢复现场

        // 不选 x，那么后面所有等于 x 的数都不选
        // 如果不跳过这些数，会导致「选 x 不选 x'」和「不选 x 选 x'」这两种情况都会加到 ans 中，这就重复了
        i++
        while (i < n && candidates[i] === x) i++
        dfs(i, left)
    }
    dfs(0, target)
    return ans
};

console.log(combinationSum2([10,1,2,7,6,1,5], 8))
console.log(combinationSum2([2,5,2,1,2], 5))
