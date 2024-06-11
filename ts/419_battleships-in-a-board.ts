function countBattleships(board: string[][]): number {
    const m = board.length
    const n = board[0].length
    let ans = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 寻找战舰的起点
            if (board[i][j] == 'X') {
                // 当前点为起点时，需要满足其左边和上面都不是 X
                if ((i == 0 || board[i - 1][j] != 'X') && (j == 0 || board[i][j - 1] != 'X')) {
                    ans++
                }
            }
        }
    }
    return ans
};

console.log(countBattleships([["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]))
console.log(countBattleships([["."]]))