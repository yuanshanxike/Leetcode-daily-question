/**
 * 根据 disappear 的限制跑 Dijkstra 算法
 * @param n 
 * @param edges 
 * @param disappear 
 */
function minimumTime(n: number, edges: number[][], disappear: number[]): number[] {
    // 邻接表
    const g: number[][][] = Array.from({length: n}, () => [])
    for (const [u, v, len] of edges) {
        g[u].push([v, len])
        g[v].push([u, len])
    }
    const dis = Array(n).fill(-1) // 最短距离数组
    dis[0] = 0
    const pq = new MinPriorityQueue<number[]>(([dx]) => dx) // 稀疏图使用优先队列方式的 Dijkstra 算法（含有已经确定了最短路径的节点和他们相邻的节点）
    pq.enqueue([0, 0])
    while (!pq.isEmpty()) {
        const [dx, x] = pq.dequeue()
        if (dx > dis[x]) continue  // （从起点到）已经被更新过距离的节点的旧距离
        for (const [y, len] of g[x]) {
            const newDis = dx + len
            if (newDis < disappear[y] && (dis[y] < 0 || newDis < dis[y])) {
                dis[y] = newDis
                pq.enqueue([newDis, y])
            }
        }
    }
    return dis
};

console.log(minimumTime(3, [[0,1,2],[1,2,1],[0,2,4]], [1,1,5]))
console.log(minimumTime(3, [[0,1,2],[1,2,1],[0,2,4]], [1,3,5]))