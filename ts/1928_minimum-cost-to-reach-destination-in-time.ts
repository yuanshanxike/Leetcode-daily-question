/**
 * BellmanFord (本质上是一种 dp)
 * 把通过每个节点需要的费用看成是最短路中的距离，通过道路所需的时间是附加条件，maxTime 是限制条件。
 * 需要计算 [1, maxTime] 时间范围内，从第 0 号城市到达第 n - 1 号城市的最小费用。
 * 不妨把 [1, maxTime] 时间范围耗费各个合法时间，恰好能从 0 号城市到达第 n - 1 号城市的最小费用都算出来，然后再取其中最小值即为答案。
 * 为了能计算出从 0 号城市到达第 n - 1 号城市的最小费用，需要把从 0 号城市到其余城市的最小费用也计算出来，才能对到达第 n - 1 号城市的费用进行“松弛”。
 * 定义 dp[i][t] 表示从第 0 号城市到达第 i 号城市，恰好花费 t 的时长，所需的最小费用。
 * 递推方向：第一个维度是时间，从小到大枚举时间；第二个维度是 edges，包含了 from、to 两个端点，以及通过这条路径所需时间 duration. 比直接枚举端点再对应到时长要方便得多。
 * 递推初始化：设置为 +∞ 表示花费无穷大。
 * 状态转移（也就是图论算法中的松弛操作。假设当前 edge 为 [v, u, time]）：
 * ① 如果从 v 到 u：dp[u][t] = min(dp[u][t], dp[v][t - time] + passingFees[u])
 * ② 如果从 u 到 v：dp[v][t] = min(dp[v][t], dp[u][t - time] + passingFees[v])
 * 递推边界：dp[0][0] = passingFees[0]，表示起点没有时间开销的费用。
 * 目标：dp[n - 1][?]，找到任意合法时间到达终点的最小花费。
 * (递推方式类似于背包问题)
 * @param maxTime 
 * @param edges 
 * @param passingFees 
 */
function minCost(maxTime: number, edges: number[][], passingFees: number[]): number {
    const INF = Number.POSITIVE_INFINITY
    const n = passingFees.length
    const dp = Array.from({ length: n }, () => Array(maxTime + 1).fill(INF))
    dp[0][0] = passingFees[0]
    for (let t = 0; t <= maxTime; t++) {
        for (const [u, v, time] of edges) {
            if (t - time >= 0) {
                // 松弛
                dp[u][t] = Math.min(dp[u][t], dp[v][t - time] + passingFees[u])
                dp[v][t] = Math.min(dp[v][t], dp[u][t - time] + passingFees[v])
            }
        }
    }
    const ans = dp[n - 1].reduce((min, cost) => Math.min(min, cost), INF)
    return ans == INF ? -1 : ans 
};

// BTW: 也可以使用 Dijkstra 算法（需要建图————邻接表）来寻找 maxTime 时间内的最少费用路径。此时需要用一个表(二维数组)记录下从 0 号城市花费特定时间(一个维度)到达特定城市(另一个维度)的最少花费。

console.log(minCost(30, [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], [5,1,2,20,20,3]))
console.log(minCost(29, [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], [5,1,2,20,20,3]))
console.log(minCost(25, [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], [5,1,2,20,20,3]))
console.log(minCost(30, [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15],[4,5,10]], [5,1,2,20,20,3]))