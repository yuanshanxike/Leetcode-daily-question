/**
 * 拓扑排序：
 * 从已知结果的状态，倒推初始状态的结果。
 * @param graph 
 * @returns 
 */
function catMouseGame(graph: number[][]): number {
    type Turn = 0 | 1
    const MOUSE_TURN: Turn = 0, CAT_TURN: Turn = 1  // 定义回合标志

    type Res = 0 | 1 | 2  // 0：平局，1：老鼠赢，2：猫赢
    
    const n = graph.length
    // 记录每个状态的出度
    const degrees: [number, number][][] = Array.from({ length: n }, () => Array.from({ length: n }, () => [0, 0]))
    // 记录每个状态的胜负结果
    const results: [Res, Res][][] = Array.from({ length: n }, () => Array.from({ length: n }, () => [0, 0]))

    // 计算每个状态的度（即可能的移动数/边数）
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n; j++) {  // 猫不会在 0 位置开始
            degrees[i][j][MOUSE_TURN] = graph[i].length
            degrees[i][j][CAT_TURN] = graph[j].length
        }
    }

    // 由于猫不能进入洞（节点 0），减少猫到达该点的出度
    for (const direct of graph[0]) { // 所有可以直接到达洞的点
        for (let i = 0; i < n; i++) {
            degrees[i][direct][CAT_TURN]--  // 猫进入洞是不允许的，减少度数
        }
    }

    const queue: [number, number, Turn][] = []  // 记录确定结果的状态（猫位置、鼠位置、当前轮数）

    // 初始化已知的必胜状态
    for (let j = 1; j < n; j++) {  // 老鼠赢
        results[0][j][MOUSE_TURN] = 1
        results[0][j][CAT_TURN] = 1
        queue.push([0, j, MOUSE_TURN])
        queue.push([0, j, CAT_TURN])
    }

    for (let i = 0; i < n; i++) {  // 猫赢
        results[i][i][MOUSE_TURN] = 2
        results[i][i][CAT_TURN] = 2
        queue.push([i, i, MOUSE_TURN])
        queue.push([i, i, CAT_TURN])
    }

    function getNextResult(prevMouse: number, prevCat: number, prevTurn: Turn, res: Res) {
        if (results[prevMouse][prevCat][prevTurn] == 0) {  // 该状态尚未确定
            const canWin = res == prevTurn + 1  // 如果后继状态是自己胜利，则自己可以赢
            if (canWin) {
                results[prevMouse][prevCat][prevTurn] = res  // 标记为胜利状态
                queue.push([prevMouse, prevCat, prevTurn])
            } else {
                degrees[prevMouse][prevCat][prevTurn] -= 1  // 自己无法直接胜利，减少出度（规避去走导致 res 的这条路）
                if (degrees[prevMouse][prevCat][prevTurn] == 0) {  // 如果没有其他出路，则判定为失败
                    const loseRes = (2 - prevTurn) as Res  // 失败意味着对手赢
                    results[prevMouse][prevCat][prevTurn] = loseRes
                    queue.push([prevMouse, prevCat, prevTurn])
                }
            }
        }
    }

    // 进行 BFS 拓扑更新所有状态
    while (queue.length) {
        const [mouse_pos, cat_pos, turn] = queue.shift()!
        const res = results[mouse_pos][cat_pos][turn]  // 获取当前状态的胜负结果
        const prevTurn = (turn ^ 1) as Turn  // 上一轮的行动者，0 变 1，1 变 0

        if (prevTurn == MOUSE_TURN) {  // 上一个状态是老鼠移动（猫不动）
            for (const prevMouse of graph[mouse_pos]) {  // 老鼠可以从哪些位置走到 mouse_pos
                getNextResult(prevMouse, cat_pos, prevTurn, res)
            }
        } else {  // 上一个状态是猫移动（老鼠不动）
            for (const prevCat of graph[cat_pos]) {  // 猫可以从哪些位置走到 cat_pos
                getNextResult(mouse_pos, prevCat, prevTurn, res)
            }
        }
    }

    return results[1][2][MOUSE_TURN]  // 从 (1, 2, MOUSE_TURN) 开始的最终结果
};

console.log(catMouseGame([[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]))
console.log(catMouseGame([[1,3],[0],[3],[0,2]]))