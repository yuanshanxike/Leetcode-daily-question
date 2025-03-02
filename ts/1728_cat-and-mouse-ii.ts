/**
 * 拓扑排序：
 * 从已知结果的状态，倒推初始状态的结果。
 * @param grid 
 * @param catJump 
 * @param mouseJump 
 */
function canMouseWin(grid: string[], catJump: number, mouseJump: number): boolean {
    type Turn = 0 | 1
    const MOUSE_TURN: Turn = 0, CAT_TURN: Turn = 1  // 定义回合标志

    type Res = 0 | 1 | 2  // 0：待定，1：老鼠赢，2：猫赢

    type Left = [0, -1]
    type Right = [0, 1]
    type Up = [-1, 0]
    type Down = [1, 0]
    type Direct = Left | Right | Up | Down

    const n = grid.length, m = grid[0].length
    const dirs: Direct[] = [[1, 0], [-1, 0], [0, 1], [0, -1]]

    /**
     * 获取二维坐标的一维索引
     * @param row 
     * @param col 
     * @returns 
     */
    function getPos(row: number, col: number): number {
        return row * m + col
    }

    /**
     * 获得在 dir 方向上，下一个可移动的位置
     * @param row0 当前玩家所在行
     * @param col0 当前玩家所在列
     * @param row1 另一个玩家所在行
     * @param row2 另一个玩家所在列
     * @param dir 
     * @param maxJump 
     */
    function getValidMoves(row0: number, col0: number, row1: number, col1: number, dir: Direct, maxJump: number): [number, number, number][] {
        const validMoves: [number, number, number][] = []
        for (let jump = 1; jump <= maxJump; jump++) {
            const row = row0 + dir[0] * jump, col = col0 + dir[1] * jump
            // 越界或撞墙
            if (row < 0 || row >= n || col < 0 || col >= m || grid[row][col] == '#') break
            // 不能移动到同一格子
            if (row != row1 || col != col1) {
                validMoves.push([row, col, jump])
            }
        }
        return validMoves
    }

    let startMouse = -1, startCat = -1, food = -1
    // 寻找老鼠、猫和食物的位置
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] == 'M') {  // 老鼠的位置
                startMouse = getPos(i, j)
            } else if (grid[i][j] == 'C') {  // 猫的位置
                startCat = getPos(i, j)
            } else if (grid[i][j] == 'F') {  // 食物的位置
                food = getPos(i, j)
            }
        }
    }

    const total = n * m
    // degrees 记录每个状态的出度
    const degrees: [number, number][][] = Array.from({ length: total }, () => Array.from({ length: total }, () => [0, 0]))
    // results 记录每个状态的胜负结果
    const results: [Res, Res][][] = Array.from({ length: total }, () => Array.from({ length: total }, () => [0, 0]))

    // 计算每个状态的度（即可能的移动数/边数）。鼠在 mouse，猫在 cat
    for (let mouse = 0; mouse < total; mouse++) {
        const mouseRow = Math.floor(mouse / m)
        const mouseCol = mouse % m
        if (grid[mouseRow][mouseCol] == '#') {  // 墙壁
            continue
        }
        for (let cat = 0 ; cat < total; cat++) {
            const catRow = Math.floor(cat / m)
            const catCol = cat % m
            if (grid[catRow][catCol] == '#') {  // 墙壁
                continue
            }
            // “它们可以停留在原地”
            degrees[mouse][cat][MOUSE_TURN]++
            degrees[mouse][cat][CAT_TURN]++
            // 从其他有效的格子 jump 过来
            for (const dir of dirs) {
                // 老鼠的合法移动
                for (const [row, col] of getValidMoves(mouseRow, mouseCol, catRow, catCol, dir, mouseJump)) {
                    degrees[getPos(row, col)][cat][MOUSE_TURN]++
                }
                // 猫的合法移动
                for (const [row, col] of getValidMoves(catRow, catCol, mouseRow, mouseCol, dir, catJump)) {
                    degrees[mouse][getPos(row, col)][CAT_TURN]++
                }
            }
        }
    }

    // 记录确定结果的状态（猫位置、鼠位置、当前轮数）
    const queue: [number, number, Turn][] = []

    // 初始化已知的必胜状态(三种情况的边界)

    // 猫和老鼠在同一个单元格，猫获胜
    for (let pos = 0; pos < total; pos++) {
        const row = Math.floor(pos / m)
        const col = pos % m
        if (grid[row][col] == '#') continue
        results[pos][pos][MOUSE_TURN] = 2
        results[pos][pos][CAT_TURN] = 2
        queue.push([pos, pos, MOUSE_TURN])
        queue.push([pos, pos, CAT_TURN])
    }

    // 猫和食物在同一个单元格，猫获胜
    for (let mouse = 0; mouse < total; mouse++) {
        const row = Math.floor(mouse / m)
        const col = mouse % m
        if (grid[row][col] == '#' || mouse == food) continue
        results[mouse][food][MOUSE_TURN] = 2
        results[mouse][food][CAT_TURN] = 2
        queue.push([mouse, food, MOUSE_TURN])
        queue.push([mouse, food, CAT_TURN])
    }

    // 老鼠和食物在同一个单元格且猫和食物不在同一个单元格，老鼠获胜
    for (let cat = 0; cat < total; cat++) {
        const row = Math.floor(cat / m)
        const col = cat % m
        if (grid[row][col] == '#' || cat == food) continue
        results[food][cat][MOUSE_TURN] = 1
        results[food][cat][CAT_TURN] = 1
        queue.push([food, cat, MOUSE_TURN])
        queue.push([food, cat, CAT_TURN])
    }

    // 如果当前状态已知胜负结果，则尝试推导前一个状态的结果
    function getNextResult(prevMouse: number, prevCat: number, prevTurn: Turn, res: Res) {
        if (results[prevMouse][prevCat][prevTurn] == 0) {  // 该状态尚未确定
            const canWin = res == prevTurn + 1  // 如果后继状态是自己胜利，则自己可以赢
            if (canWin) {
                results[prevMouse][prevCat][prevTurn] = res  // 标记为胜利状态
                queue.push([prevMouse, prevCat, prevTurn])
            } else {
                degrees[prevMouse][prevCat][prevTurn]--  // 自己无法直接胜利，减少出度（规避去走导致 res 的这条路）
                if (degrees[prevMouse][prevCat][prevTurn] == 0) {  // 如果没有其他出路，则判定为失败
                    const loseRes = (2 - prevTurn) as Res  // 失败意味着对手赢
                    results[prevMouse][prevCat][prevTurn] = loseRes
                    queue.push([prevMouse, prevCat, prevTurn])
                }
            }
        }
    }

    const MAX_MOVES = 1000
    let moves = 0
    // 进行 BFS 拓扑更新所有状态
    while (queue.length) {
        if (moves == MAX_MOVES) break  // 到达最大步数
        for (let i = 0 ; i < queue.length; i++) {
            const [mouse, cat, turn] = queue.shift()!
            const res = results[mouse][cat][turn]  // 获取当前状态的胜负结果
            const prevTurn = (turn ^ 1) as Turn  // 上一轮的行动者，0 变 1，1 变 0
            getNextResult(mouse, cat, prevTurn, res)  // 上一个状态选择停留在原地
            if (prevTurn == MOUSE_TURN) {  // 上一个状态是老鼠移动（猫不动）
                for (const dir of dirs) {
                    for (const [row, col] of getValidMoves(Math.floor(mouse / m), mouse % m, Math.floor(cat / m), cat % m, dir, mouseJump)) {
                        getNextResult(getPos(row, col), cat, prevTurn, res)
                    }
                }
            } else {  // 上一个状态是猫移动（老鼠不动）
                for (const dir of dirs) {
                    for (const [row, col] of getValidMoves(Math.floor(cat / m), cat % m, Math.floor(mouse / m), mouse % m, dir, catJump)) {
                        getNextResult(mouse, getPos(row, col), prevTurn, res)
                    }
                }
            }
        }
        moves++  // 每次从所有格子可能的移动情况已经计算完成
    }

    return results[startMouse][startCat][MOUSE_TURN] == 1
};

console.log(canMouseWin(["####F","#C...","M...."], 1, 2))
console.log(canMouseWin(["M.C...F"], 1, 4))
console.log(canMouseWin(["M.C...F"], 1, 3))
console.log(canMouseWin(["C...#","...#F","....#","M...."], 2, 5))
console.log(canMouseWin([".M...","..#..","#..#.","C#.#.","...#F"], 3, 1))