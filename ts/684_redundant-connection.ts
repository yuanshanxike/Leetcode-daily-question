/**
 * 通过并查集建树，就可以方便地判断两个点是否在同一棵树（无环连通块）上。
 * 遍历 edges 数组中的边，如果：
 * ① 边的两个端点在两棵不同的树中：合并这两棵数；
 * ② 边的两个端点在同一棵树中：返回这条边（它使得树变成了环）。
 * 初始状态下，1 ~ n 的每一个顶点都是一棵树。
 * @param edges 
 */
function findRedundantConnection(edges: number[][]): number[] {
    const unionFindSet = Array.from({ length: edges.length + 1 }, (_, idx) => idx)

    function union(a: number, b: number) {
        const pa = find(a), pb = find(b)
        unionFindSet[pb] = pa
    }

    function find(a: number) {
        let p = a
        while (unionFindSet[p] != p) {
            p = unionFindSet[p]
        }
        return p
    }

    for (const [a, b] of edges) {
        const pa = find(a)
        const pb = find(b)
        if (pa == pb) return [a, b]
        else union(pa, pb)
    }

    return []
};

console.log(findRedundantConnection([[1,2], [1,3], [2,3]]))
console.log(findRedundantConnection([[1,2], [2,3], [3,4], [1,4], [1,5]]))