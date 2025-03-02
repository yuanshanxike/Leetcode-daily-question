function numRookCaptures(board: string[][]): number {
    const n = board.length
    const m = board[0].length
    let rookStartX: number = -1
    let rookStartY: number = -1
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == 'R') {
                rookStartY = i
                rookStartX = j

                break
            }
        }
    }

    let ans = 0

    const rookMove: [number, number][] = [[-1, 0], [0, -1], [1, 0], [0, 1]]
    for (const [dx, dy] of rookMove) {
        let cx = rookStartX
        let cy = rookStartY
        while (0 <= cx && cx < m && 0 <= cy && cy < n) {
            if (board[cy][cx] == 'B') break
            else if (board[cy][cx] == 'p') {
                ans++
                break
            }

            cx += dx
            cy += dy
        } 
    }

    return ans
};