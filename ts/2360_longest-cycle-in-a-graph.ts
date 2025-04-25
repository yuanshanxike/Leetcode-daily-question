function longestCycle(edges: number[]): number {
    const n = edges.length
    const orders = Array(n).fill(-1)
    const visited = new Map<number, number>()  // order -> 起点序号
    let maxLoopStep = -1
    for (let i = 0; i < n; i++) {
        if (orders[i] >= 0 || edges[i] < 0) continue   // 一个节点最多在一个环中，因为每个节点的出度最大为 1
        // visited.clear()   // 发现 clear 显著增加耗时，对于该题，每次循环使用 clear 会超时
        let order = 0, cur = i
        while (cur >= 0 && !visited.has(cur)) {
            visited.set(cur, i)
            orders[cur] = order
            cur = edges[cur]
            order++
        }

        if (visited.has(cur) && visited.get(cur) == i) {
            maxLoopStep = Math.max(maxLoopStep, order - orders[cur])
        }
    }
    return maxLoopStep
};

console.log(longestCycle([3,3,4,2,3]))
console.log(longestCycle([2,-1,3,1]))
console.log(longestCycle([-1,4,-1,2,0,4]))