/** 向8个方位依次枚举  */
function checkMove(board: string[][], rMove: number, cMove: number, color: string): boolean {
    const n = 8 

    // 左
    let anotherColor = () => board[rMove][cMove - 1]
    if (cMove > 1 && anotherColor() != '.' && anotherColor() != color) {
        let l = cMove - 1
        while (l && board[rMove][l] == anotherColor()) {
            l--
        }
        if (l >= 0 && board[rMove][l] == color) return true
    }

    // 左上
    anotherColor = () => board[rMove - 1][cMove - 1] 
    if (cMove > 1 && rMove > 1 && anotherColor() != '.' && anotherColor() != color) {
        let l = cMove - 1
        let t = rMove - 1
        while (l && t && board[t][l] == anotherColor()) {
            l--
            t--
        }
        if (l >= 0 && t >= 0 && board[t][l] == color) return true
    }

    // 上
    anotherColor = () => board[rMove - 1][cMove] 
    if (rMove > 1 && anotherColor() != '.' && anotherColor() != color) {
        let t = rMove - 1
        while (t && board[t][cMove] == anotherColor()) {
            t--
        }
        if (t >= 0 && board[t][cMove] == color) return true
    }

    // 右上
    anotherColor = () => board[rMove - 1][cMove + 1] 
    if (cMove < n - 2 && rMove > 1 && anotherColor() != '.' && anotherColor() != color) {
        let r = cMove + 1
        let t = rMove - 1
        while (r < n && t && board[t][r] == anotherColor()) {
            r++
            t--
        }
        if (r < n && t >= 0 && board[t][r] == color) return true
    }

    // 右
    anotherColor = () => board[rMove][cMove + 1] 
    if (cMove < n - 2 && anotherColor() != '.' && anotherColor() != color) {
        let r = cMove + 1
        while (r < n && board[rMove][r] == anotherColor()) {
            r++
        }
        if (r < n && board[rMove][r] == color) return true
    }

    // 右下
    anotherColor = () => board[rMove + 1][cMove + 1] 
    if (cMove < n - 2 && rMove < n - 2 && anotherColor() != '.' && anotherColor() != color) {
        let r = cMove + 1
        let b = rMove + 1
        while (r < n && b < n && board[b][r] == anotherColor()) {
            r++
            b++
        }
        if (r < n && b < n && board[b][r] == color) return true
    }

    // 下
    anotherColor = () => board[rMove + 1][cMove] 
    if (rMove < n - 2 && anotherColor() != '.' && anotherColor() != color) {
        let b = rMove + 1
        while (b < n && board[b][cMove] == anotherColor()) {
            b++
        }
        if (b < n && board[b][cMove] == color) return true
    }

    // 左下
    anotherColor = () => board[rMove + 1][cMove - 1] 
    if (cMove > 1 && rMove < n - 2 && anotherColor() != '.' && anotherColor() != color) {
        let l = cMove - 1
        let b = rMove + 1
        while (l && b < n && board[b][l] == anotherColor()) {
            l--
            b++
        }
        if (l >= 0 && b < n && board[b][l] == color) return true
    }

    return false
};