/**
 * N 皇后问题：
 * 需要保证“每一行，每一列，每一条对角线最多只能出现一个皇后”，
 * 如果我们按照通常遍历二维数组的方式————从左上到右下逐行遍历。每一行枚举列，只放置一个皇后。天然地就保证了每行只有一个皇后。
 * 其余的维度（列和两种方向的对角线）可以用一个 bool 数组来记录放置过皇后的列或对角线。
 * 递归地去找出符合条件的方案，同时对于不符合条件的 case 进行剪枝，不会进一步地递归。
 * 
 * 主对角线的行列关系可以用一个二维线性方程来表示：y = x + k  =>  y - x = k, 每一条主对角线所穿过的所有棋盘格子对应着相同的(且从每条线的角度看 唯一的)一个 k 值；
 * 次对角线上的行列关系同样可以用一个二维线性方程来表示：y = -x + k  =>  y + x = k, 每一条次对角线所穿过的所有棋盘格子对应着相同的(且从每条线的角度看 唯一的)一个 k 值。
 * @param n 
 * @returns 
 */
function solveNQueens(n: number): string[][] {
    const ans: string[][] = []
    const cols: boolean[] = Array(n).fill(false)  // 每列是否被皇后占据
    const diags1: boolean[] = Array(2 * n - 1).fill(false)  // 每条主对角线是否被皇后占据
    const diags2: boolean[] = Array(2 * n - 1).fill(false)  // 每条次对角线是否被皇后占据
    
    /**
     * 在第 row 行，第 col 列放置一个皇后
     * @param row 
     * @param col 
     */
    function place(row: number, col: number, curChessboard: string[]) {
        const diag1Idx = row - col + n - 1, diag2Idx = row + col

        if (cols[col] || diags1[diag1Idx] || diags2[diag2Idx]) return

        cols[col] = diags1[diag1Idx] = diags2[diag2Idx] = true

        let line: string = ''
        for (let i = 0; i < n; i++) {
            line += i == col ? 'Q' : '.'
        }
        curChessboard.push(line)

        if (row == n - 1) {
            ans.push(Array.from(curChessboard))  // push a copy arr
        } else {
            for (let i = 0; i < n; i++) {
                if (i != col) {
                    place(row + 1, i, curChessboard)
                }
            }
        }

        // 恢复现场
        curChessboard.pop()
        cols[col] = diags1[diag1Idx] = diags2[diag2Idx] = false
    }

    for (let i = 0; i < n; i++) {
        place(0, i, [])
    }

    return ans
};

console.log(solveNQueens(4))
console.log(solveNQueens(1))



function totalNQueens(n: number): number {
    let ans: number = 0
    const cols: boolean[] = Array(n).fill(false)  // 每列是否被皇后占据
    const diags1: boolean[] = Array(2 * n - 1).fill(false)  // 每条主对角线是否被皇后占据
    const diags2: boolean[] = Array(2 * n - 1).fill(false)  // 每条次对角线是否被皇后占据
    
    /**
     * 在第 row 行，第 col 列放置一个皇后
     * @param row 
     * @param col 
     */
    function place(row: number, col: number) {
        const diag1Idx = row - col + n - 1, diag2Idx = row + col

        if (cols[col] || diags1[diag1Idx] || diags2[diag2Idx]) return

        cols[col] = diags1[diag1Idx] = diags2[diag2Idx] = true

        if (row == n - 1) {
            ans++
        } else {
            for (let i = 0; i < n; i++) {
                if (i != col) {
                    place(row + 1, i)
                }
            }
        }

        // 恢复现场
        cols[col] = diags1[diag1Idx] = diags2[diag2Idx] = false
    }

    for (let i = 0; i < n; i++) {
        place(0, i)
    }

    return ans
};

console.log(totalNQueens(4))
console.log(totalNQueens(1))