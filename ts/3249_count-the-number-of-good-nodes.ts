/**
 * 统计树的每个分支的子树的节点数量，完美契合深度优先遍历
 * @param edges 
 */
function countGoodNodes(edges: number[][]): number {
    const n = edges.length + 1
    const adjacencyList: number[][] = Array.from({ length: n }, () => [])
    for (const [a, b] of edges) {
        adjacencyList[a].push(b)
        adjacencyList[b].push(a)
    }

    let ans = 0

    /**
     * 
     * @param from 父节点
     * @param cur 当前所在节点
     * @returns 该子树的节点数目
     */
    function dfs(from: number, cur: number): number {
        let nodeCnt = 1
        let subTreeNodeCnt: number | undefined = undefined
        let isGood = true
        for (const i of adjacencyList[cur]) {
            if (i == from) continue

            const cnt = dfs(cur, i)
            nodeCnt += cnt
            isGood &&= subTreeNodeCnt == undefined || subTreeNodeCnt == cnt
            if (isGood) {
                subTreeNodeCnt = cnt
            }
        }

        if (isGood) ans++
        
        return nodeCnt
    }

    dfs(-1, 0)

    return ans
};

console.log(countGoodNodes([[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]))
console.log(countGoodNodes([[0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,7],[3,8]]))
console.log(countGoodNodes([[0,1],[1,2],[1,3],[1,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[9,12],[10,11]]))