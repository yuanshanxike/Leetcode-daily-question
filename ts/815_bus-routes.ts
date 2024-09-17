/**
 * 广度优先遍历 BFS
 * 可以把 routes[i] 看作是编号为 i 的公交车的停车站点表。
 * 为了简化计算，还需要每个站点对应的经过的公交车编号表，用 stopToBuses 来表示, 例如 stopToBuses[0] 表示 0 号站路过的公交车列表。
 * 这样就可以从起点站开始，通过 BFS 遍历经过该站的所有公交车路线，把这些路线中的所有站点（不包括已经统计过的站）加入到 BFS 的队列中。
 * 为了简化代码逻辑，每次只出队一个站点，并把途径该站点的所有公交路线的站点都入队。
 * 为了防止同一站点多次入队，，每条线路的站点在入队后都要清空每条路线中包含的站点。
 * 为了方便统计乘车次数，可以使用一个 minNumns (HashMap) 记录从起点站到达每一站的最少换乘次数。同时还可以通过判断每个站点是否已近存在于 minNums 中，来得知到达每个站点的最少换乘次数是否已经被计算出来了。
 * @param routes 
 * @param source 
 * @param target 
 */
function numBusesToDestination(routes: number[][], source: number, target: number): number {
    // 通过每条公交路线的站点表构建每个站点对应的经过其的公交线路表
    const stopToBuses: Record<number, number[]>= {}
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        for (const stop of route) {
            if (stopToBuses[stop] == undefined) stopToBuses[stop] = [i]
            else stopToBuses[stop].push(i)
        }
    }
    // 优化（如果起点站或终点站没有公交路线经过，则不能经由起点到达终点（直接返回 -1），除非起点站和终点站是同一个站（返回 0））
    if (stopToBuses[source] == undefined || stopToBuses[target] == undefined) {
        return source == target ? 0 : -1
    }
    // BFS 计算最少乘车次数
    const minNums: Record<number, number> = {}
    const deque: number[] = [source]
    minNums[source] = 0
    while (deque.length > 0) {
        const fromStop = deque.shift()
        const buses: number[] = stopToBuses[fromStop!]
        for (const bus of buses) {
            for (const stop of routes[bus]) {
                if (minNums[stop] == undefined) {
                    minNums[stop] = minNums[fromStop!] + 1  // 从当前出队的站点 fromStop 乘坐编号为 bus 的公交车到达 stop 的最少换乘次数(如果还没统计过)都等于从起始站点到达 fromStop 站点的最少换乘次数 +1. 
                    deque.push(stop)
                }
            }
            routes[bus].splice(0, routes[bus].length)  // 已经计算过最少乘车次数能达到的站点，需要从路线列表中去除，避免重复计算。
        }
    }
    return minNums[target] ?? -1
};

console.log(numBusesToDestination([[1,2,7],[3,6,7]], 1, 6))
console.log(numBusesToDestination([[7,12],[4,5,15],[6],[15,19],[9,12,13]], 15, 12))