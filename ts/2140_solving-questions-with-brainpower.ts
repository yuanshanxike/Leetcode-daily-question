function mostPoints(questions: [number, number][]): number {
    const n = questions.length

    const memo = new Map<number, number>()
    function dfs(idx: number): number {
        if (idx >= n) return 0
        if (memo.has(idx)) return memo.get(idx)!
        const [point, bp] = questions[idx]
        const res = Math.max(point + dfs(idx + bp + 1), dfs(idx + 1))
        memo.set(idx, res)
        return res
    }
    return dfs(0)
};

console.log(mostPoints([[3,2],[4,3],[4,4],[2,5]]))
console.log(mostPoints([[1,1],[2,2],[3,3],[4,4],[5,5]]))