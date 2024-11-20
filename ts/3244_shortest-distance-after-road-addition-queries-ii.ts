namespace L3244 {
    /**
     * 相比于 L3243, 题目额外保证了 添加的边(捷径)不会交叉，那么从贪心的角度看，如果遇到捷径就走捷径会是最优的。
     * 把目光从节点转移到边上。
     * 初始状态总共有 n - 1 条边，这些边可以看成是森林中独立的集合。
     * 每次 query 相当于把新加入的边(捷径)所覆盖的边的集合合并成同一个集合。
     * 连一条从 L 到 R 的边，相当于把并查集中的节点 L,L+1,L+2⋯,R−2 合并到并查集中的节点 R−1 上。
     * 合并的同时，维护并查集连通块个数。
     * 所以可以直接使用 并查集 来维护边的集合数量，每次 query 后，集合的数量就是从 0 到 n - 1 的最短路。
     * @param n 
     * @param queries 
     */
    // function shortestDistanceAfterQueries(n: number, queries: number[][]): number[] {
    //     const f = Array.from({ length: n - 1 }, (_, idx) => idx)  // 边集连通块
    //     // 非递归并查集
    //     function find(x: number) : number {
    //         let root = x
    //         // 寻找根节点
    //         while (f[root] != root) {
    //             root = f[root]
    //         }
    //         // 路径压缩
    //         while (f[x] != root) {
    //             [f[x], x] = [root, f[x]]
    //         }
    //         return root
    //     }

    //     const ans: number[] = []
    //     let cnt = n - 1 // 并查集中连通块的个数
    //     for (const [l, r] of queries) {
    //         const fRoot = find(r - 1)  // 规定以 r - 1 (连接 r 节点的边) 作为连通块的根节点
    //         // 尝试合并新边所覆盖的边集
    //         for (let i = find(l); i < r - 1; i = find(i + 1)) {  // 通过 i 来查找连通块的根节点，① 如果当前的连通块根节点大于我们所约定的 r - 1，说明之前加入的边已经包含了当前加入的边，不会发生新的合并；② 如果当前的连通块根节点小于所约定的 r - 1, 说明新加入的边包含了之前存在的边，将之前存在的边合并到新加入的边中.
    //             f[i] = fRoot  // 将存在的边集(连通块)合并到新加入的更大范围的边集中
    //             cnt-- // 减去被合并的边集数量
    //         }
    //         ans.push(cnt)
    //     }
    //     return ans
    // };

    /**
     * 更进一步地，题目中的模型看成是一个数组上的链表。
     * ·初始距离就是链表上的节点数量-1；
     * ·连边等同于断开链表再连接；
     * ·与单纯的链表不同，断开之后遗失无法访问的节点仍然可以通过数组访问
     * 
     * 定义 next[i] 表示 i 能直接连接到的最右节点的编号，
     * 初始时 next[i] = i + 1.
     * 
     * 每次 query 时：
     * ① 如果 [l, r] 被之前的 [l', r'] 包含，则什么都不做；
     * ② 否则更新 next[l] = r，在更新之前，还需要把 [next[l], r - 1] 中节点对应的 next 值更新成一个可以表示连接断开的值，表示路径的删除。
     * @param n 
     * @param queries 
     */
    function shortestDistanceAfterQueries(n: number, queries: number[][]): number[] {
        const next = Array.from({ length: n - 1 }, (_, idx) => idx + 1)
        let cnt = n - 1  // 初始距离
        const ans: number[] = []
        for (const [l, r] of queries) {
            if (next[l] > 0 && next[l] < r) {
                let i = next[l]
                // 删除链表中被新边覆盖的旧链
                while (i < r) {
                    [next[i], i] = [0, next[i]]  // 逐个断开链接
                    cnt--  // 每断开一个链接，路径数减一
                }
                next[l] = r // 链接从 l -> next[l], 变更为 l -> r
            }
            ans.push(cnt)
        }
        return ans
    }
    
    console.log(shortestDistanceAfterQueries(5, [[2,4],[0,2],[0,4]]))
    console.log(shortestDistanceAfterQueries(4, [[0,3],[0,2]]))
}