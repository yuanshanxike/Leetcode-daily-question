/**
 * 从已经是棋盘的状态来倒推可能的初始状态。
 * 需要注意，对于矩阵，处理行和列的意义是相同的，没有本质区别。
 * 
 * 交换*列*是为了使得矩阵上的所有*行*序列(独自来看)成为合法的棋盘序列（此时没有管*列*序列是否是合法的棋盘序列）；
 * 交换*行*是为了使得矩阵上的所有*列*序列(独自来看)成为合法的棋盘序列（此时没有管*行*序列是否是合法的棋盘序列）；
 * 思路：https://leetcode.cn/problems/transform-to-chessboard/solutions/2997293/tu-jie-ni-xiang-si-wei-pythonjavaccgojsr-mixb/?envType=problem-list-v2&envId=matrix
 * @param board 
 */
function movesToChessboard(board: number[][]): number {
    // 第一行，需要满足 0 和 1 的个数之差不超过 1
    const firstRow = board[0]
    const rowCnt: [number, number] = [0, 0]
    firstRow.forEach(x => rowCnt[x]++)  // 统计第一行中 0 和 1 的数量
    if (Math.abs(rowCnt[0] - rowCnt[1]) > 1) {
        return -1
    }

    // 第一列，需要满足 0 和 1 的个数之差不超过 1
    const firstCol = board.map(row => row[0])  // 只取每行的第一个元素形成第一列
    const colCnt: [number, number] = [0, 0]
    firstCol.forEach(y => colCnt[y]++)  // 统计第一列中 0 和 1 的数量
    if (Math.abs(colCnt[0] - colCnt[1]) > 1) {
        return -1
    }

    // 每一行和第一行(A)进行比较，要么完全相同(A)，要么完全不相同(B)
    for (const row of board) {
        const same = row[0] == firstRow[0]
        for (let i = 0; i < row.length; i++) {
            if ((row[i] == firstRow[i]) != same) {
                return -1
            }
        }
    }

    // 以上，可行性判断完毕。如果能执行接下来的代码的话，说明一定存在着可行的变化

    return minSwap(firstRow, rowCnt) + minSwap(firstCol, colCnt)  // 以矩阵的第一行和第一列作为基准比较对象，来对矩阵的行和列进行交换(计算最少交换次数)
};

// 注意这里每次交换的对象不是单个元素，而是矩阵中的一整行/列（相当于对矩阵进行了降维(2 -> 1)后再进行处理）
function minSwap(s: number[], cnt: [number, number]) {
    const n = s.length
    const x0 = cnt[1] > cnt[0] ? 1 : 0  // 偶数位(包括 index-0)是 0 还是 1
    // ① n 若为偶数
    //   x0 = 0, ((i % 2) ^ x0) 为 0101...
    // ② n 若为奇数
    //   a.若 cnt[1] > cnt[0]
    //       x0 = 1, ((i % 2) ^ x0) 为 10101...
    //   b.若 cnt[1] < cnt[0]
    //       x0 = 0, ((i % 2) ^ x0) 为 01010...
    // 总言之, 就是通过 ((i % 2) ^ x0) 表示出应该转换为的结果
    let diff = 0  // 当前的序列与最终的棋盘序列对比，不同的位数
    for (let i = 0; i < n; i++) {
        diff += s[i] ^ i % 2 ^ x0  // 异或满足结合律，原本应该是写成 s[i] ^ ((i % 2) ^ x0)，用来在当前序列与棋盘序列在 i 处不同时产生 1，来累加统计到不同的位数中
    }
    return n % 2 ? diff / 2 /* n 为奇数, 至少有一个 0/1 的位置是正确的(不需要被交换), 最终的棋盘序列是确定的 */: Math.min(diff, n - diff) / 2 /* n 为偶数 */
    // ① 如果 n 是奇数, 有 diff 个不同的 1/0 (与结果相比),那么只需要交换 diff / 2 次
    // ② 如果 n 是偶数, 要么转换为 0101.. 要么转换为 1010.., 两者与原序列不同的位数和为 n（因为两种转换结果的所有位都相反，于其中一个不同的位数是 diff，那么与另一个相比，之前不同的变为相同，之前相同的变为不同，所以这时不同的位数是 n - diff）。
    // 比较两者大小, 取小者（不必担心交换成其中一种棋盘序列会导致与不同于操作的另一个维度(行/列)的相邻(上一/下一)棋盘序列冲突，因为我们实际只会操作矩阵的第一行和第一列(在相同行、列中的元素会一起被交换)，其实每次交换的不是一行/列中的单个元素，而是与操作的行/列垂直的一整列/行，而不是分别对每一行/列进行交换操作）
}

console.log(movesToChessboard([[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]))
console.log(movesToChessboard([[0,1],[1,0]]))
console.log(movesToChessboard([[1,0],[1,0]]))