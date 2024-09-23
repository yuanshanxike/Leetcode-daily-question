function edgeScore(edges: number[]): number {
    const n = edges.length
    const indegreeArr = Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        const dest = edges[i]
        indegreeArr[dest] += i
    }
    let ans = -1
    let maxVal = 0
    for (let i = 0; i < n; i++) {
        const indegree = indegreeArr[i]
        if (indegree > maxVal) {
            maxVal = indegree
            ans = i
        }
    }
    return ans
};

console.log(edgeScore([1,0,0,0,0,7,7,5]))
console.log(edgeScore([2,0,0,2]))