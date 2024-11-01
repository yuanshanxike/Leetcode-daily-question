/**
 * 在 684 的基础上，有向图有指向顺序上的要求
 * @param edges 
 */
function findRedundantDirectedConnection(edges: number[][]): number[] {
    const parent = Array.from({ length: edges.length + 1 }, (_, idx) => idx)

    function union(u: number, v: number) {
        parent[v] = u
    }

    function hasLoop(a: number): boolean {
        const visitedSet = new Set([a])
        while (parent[a] != a) {
            if (visitedSet.has(parent[a])) return true
            a = parent[a]
            visitedSet.add(a)
        }
        return false
    }

    let ans: number[] = []
    let anotherP: number = 0
    let loopAns: number[] = []

    for (const [u, v] of edges) {
        if (parent[v] != v) {  // 入度为 2
            ans = [u, v]  // 作为备选答案
            anotherP = parent[v]
        } else {
            union(u, v)
        }

        if (hasLoop(v) && loopAns.length == 0) loopAns = [u, v]
    }


    if (ans.length == 0) return loopAns

    if (hasLoop(anotherP)) {
        return [anotherP, ans[1]] // ans
    } else {
        return ans // [anotherP, ans[1]]
    }
};

console.log(findRedundantDirectedConnection([[1,2],[1,3],[2,3]]))
console.log(findRedundantDirectedConnection([[1,2],[2,3],[3,4],[4,1],[1,5]]))
console.log(findRedundantDirectedConnection([[2,1],[3,1],[4,2],[1,4]]))
console.log(findRedundantDirectedConnection([[1,2],[3,1],[4,2],[1,4]]))