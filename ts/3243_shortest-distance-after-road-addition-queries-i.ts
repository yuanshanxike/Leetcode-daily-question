/**
 * 类似于 Floyd 算法那样计算每一个（前序）节点到达其他（后续）节点的最短路。
 * 因为每次从 queries[i][0] 到 queries[i][1] 新建一条路径时，只会影响到 [0 ... queries[i][0]] 中的城市到达 [queries[i][1] ... n - 1] 中城市的最短路。
 * @param n 
 * @param queries 
 * @returns 
 */
// function shortestDistanceAfterQueries(n: number, queries: number[][]): number[] {
//     const dis: number[][] = Array.from({ length: n }, () => Array(n).fill(0))
//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j <= n - 1; j++) {
//             dis[i][j] = dis[i][j - 1] + 1
//         }
//     }

//     const ans: number[] = []

//     for (const [from, to] of queries) {
//         if (dis[from][to] > 1) {
//             // 用“经由 from 与 to 之间新构建的路径距离”更新 from 及之前的城市到达 to 城市的最短路
//             for (let i = from; i >= 0; i--) {
//                 for (let j = to; j < n; j++) {
//                     dis[i][j] = Math.min(dis[i][j], dis[i][from] + dis[to][j] + 1)
//                 }
//             }
//         }
//         ans.push(dis[0][n - 1])
//     }

//     return ans
// };

/**
 * 方法二：dp
 * 只维护从第 0 个城市到达其他城市的最短路，相比方法一，每次 query 都少维护了区间 [1, qieries[i][0]] 中城市到其后序城市的最短路
 * @param n 
 * @param queries 
 * @returns 
 */
function shortestDistanceAfterQueries(n: number, queries: number[][]): number[] {
    const f = Array.from({ length: n }, (_, idx) => idx)  // f[i] 表示从 0 到 i 的最短路
    const from: number[][] = Array.from({ length: n }, () => [])  // from[i] 对应着直接连接到 i 的除了 i - 1 之外的其他前序城市的集合
    const ans: number[] = []
    for (const [a, b] of queries) {
        from[b].push(a)
        if (f[a] + 1 < f[b]) { // 能使得最短路缩短，新增的路线才有意义
            f[b] = Math.min(f[b], f[a] + 1)
            // 0 到达 b 后序的城市的最短路也可能因为 a -> b 的新路径而被更新
            for (let i = b + 1; i < n; i++) {
                f[i] = Math.min(f[i], f[i - 1] + 1 /* 从前一个城市直接走初始的路径到达 */, ... from[i].map((num) => f[num] + 1) /* 从 queries 中添加的以 i 为终点的路径到达 */)
            }
        }
        ans.push(f[n - 1])
    }
    return ans
};

console.log(shortestDistanceAfterQueries(5, [[2, 4], [0, 2], [0, 4]]))
console.log(shortestDistanceAfterQueries(4, [[0, 3], [0, 2]]))