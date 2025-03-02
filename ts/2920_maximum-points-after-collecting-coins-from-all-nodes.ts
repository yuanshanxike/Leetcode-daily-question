/**
 * 树形 DP
 * 方法二的子树上节点的积分折半操作延后进行
 * @param edges 
 * @param coins 
 * @param k 
 */
function maximumPoints(edges: number[][], coins: number[], k: number): number {
    const n = coins.length
    const g: number[][] = Array.from({ length: n }, () => [])
    for (const [x, y] of edges) {
        g[x].push(y)
        g[y].push(x)
    }
    const maxPower = Math.ceil(Math.log2(Math.max(... coins, 1)))  // 递归过程中，如果遇到大于等于 maxPower 的 power，直接返回 0 即可，因为此时子树中的所有 coins[i] 已经变为 0。此时选择都执行方案二是一定不劣于方案一的（只有当 k == 0 时结果一致）。
    const memo: number[][] = Array.from({ length: n }, () => Array(maxPower).fill(undefined))
    /**
     * 
     * @param x 当前节点
     * @param power 记录当前节点折半的次数
     * @param p 父节点
     * @returns 
     */
    function dfs(x: number, power: number, p: number): number {
        if (power >= maxPower) return 0  // 此时 x 子树上的节点积分已经全为 0
        if (memo[x][power] != undefined) return memo[x][power]
        let res = 0
        for (const y of g[x]) {
            if (y === p) continue
            res += Math.max(Math.floor(coins[y] / (1 << power + 1)) + dfs(y, power + 1, x), coins[y] / (1 << power) - k + dfs(y, power, x))
        }
        memo[x][power] = res
        return res
    }
    return Math.max(dfs(0, 0, -1) + coins[0] - k, dfs(0, 1, -1) + Math.floor(coins[0] / 2))
};

console.log(maximumPoints([[0, 1], [1, 2], [2, 3]], [10, 10, 3, 3], 5))
console.log(maximumPoints([[0,1],[0,2]], [8, 4, 4], 0))
console.log(maximumPoints([[0,1]], [0, 0], 8))