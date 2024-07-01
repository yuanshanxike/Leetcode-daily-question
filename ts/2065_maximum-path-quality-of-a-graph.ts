function maximalPathQuality(values: number[], edges: number[][], maxTime: number): number {
    type Path = {
        next: number
        time: number
    }
    const n = values.length
    const g: Path[][] = Array.from({ length: n }, () => Array<Path>())
    for (let [u, v, time] of edges) {
        g[u].push({ next: v, time: time })
        g[v].push({ next: u, time: time })
    }

    const visited = new Set<number>()
    let maxValue = values[0]

    function dfs(cur: number, timeResidue: number, val: number): void {
        if (visited.has(cur)) {
            var newVal = val
        } else {
            newVal = val + values[cur]
            visited.add(cur)
        }

        g[cur].forEach(({next, time}) => {
            if (timeResidue >= time) {
                dfs(next, timeResidue - time, newVal)
            }
        })
        
        if (newVal != val) visited.delete(cur)  // 恢复现场

        if (visited.has(0) && cur == 0) maxValue = Math.max(maxValue, val)
    }

    dfs(0, maxTime, 0)
    return maxValue
};

console.log(maximalPathQuality([0,32,10,43], [[0,1,10],[1,2,15],[0,3,10]], 49))
console.log(maximalPathQuality([0,32,88,43], [[0,1,10],[1,2,15],[0,3,10]], 49))
console.log(maximalPathQuality([5,10,15,20], [[0,1,10],[1,2,10],[0,3,10]], 30))
console.log(maximalPathQuality([1,2,3,4], [[0,1,10],[1,2,11],[2,3,12],[1,3,13]], 50))
console.log(maximalPathQuality([0,1,2], [[1,2,10]], 10))
console.log(maximalPathQuality([20,1,2], [[1,2,10]], 10))
console.log(maximalPathQuality([95], [], 83))