function countPairsOfConnectableServers(edges: number[][], signalSpeed: number): number[] {
    const n = edges.length + 1
    const ans = Array<number>(n)
    // <[No., weight]>
    const g = Array<[number, number][]>(n)
    for (const [from, to, w]of edges) {
        if (!g[from]) g[from] = []
        if (!g[to]) g[to] = []
        g[from].push([to, w])
        g[to].push([from, w])
    }
    const dfs = (x: number, fa: number, s: number): number => {
        let cnt = s % signalSpeed ? 0 : 1
        for (const [to, w] of g[x]) {
            if (to == fa) continue
            const num = dfs(to, x, w + s)
            cnt += num
        }
        return cnt
    }
    for (let i = 0; i < n; i++) {
        const m = g[i].length
        if (m < 2) ans[i] = 0
        else {
            // 通过 乘法原理 计算所有路径数量。需要记录每次左边数字的累加和 sum
            let sum = 0
            let num = 0
            for (let j = 0; j < m; j++) {
                const [to, w] = g[i][j]
                const k = dfs(to, i, w)
                num += sum * k
                sum += k
            }
            ans[i] = num
        }
    }
    return ans
};

// 如果 signalSpeed 不大，可以使用换根 dp 来优化 枚举根 + dfs 的时间复杂度：
// 第一次 dfs 任选一个节点作为根节点，计算出每个节点(包括自身)到它的 sumWeight，并统计它为根时能被 signalSpeed 整除的点的数量；
// 第二次 dfs 换根访问其他的每个节点，根据每次移动的路径，动态地对 sumWeight[i] 的值进行更新，然后计算 ans

console.log(countPairsOfConnectableServers([[0,1,1],[1,2,5],[2,3,13],[3,4,9],[4,5,2]], 1))
console.log(countPairsOfConnectableServers([[0,6,3],[6,5,3],[0,3,1],[3,2,7],[3,1,6],[3,4,2]], 3))