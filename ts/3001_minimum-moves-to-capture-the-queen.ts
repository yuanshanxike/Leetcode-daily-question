/**
 * 黑皇后即使和白车不在同一行或同一列，将白车移动最多两次一定能够捕获黑皇后；
 * 如果黑皇后如果与白象在同一对角线上，且白象与黑皇后之间没有白车的阻挡，那么白象可以直接移动一次捕获到黑皇后;
 * 白车和黑皇后共(水平、竖直)线时同理。
 * @param a 
 * @param b 
 * @param c 
 * @param d 
 * @param e 
 * @param f 
 */
function minMovesToCaptureTheQueen(a: number, b: number, c: number, d: number, e: number, f: number): number {
    // 判断一个点是否为两个点的中间点时，对角线上的点也可以投影到横坐标上进行判断
    function isBetween(l: number, m: number, r: number) {
        return Math.min(l, r) <= m && m <= Math.max(l, r)
    }

    const canBishopDirect = c - d == e - f && (c - d != a - b || !isBetween(c, a, e)) || c + d == e + f && (c + d != a + b || !isBetween(c, a, e))
    const canRookDirect = a == e && (a != c || !isBetween(a, c, e)) || b == f && (b != d || !isBetween(a, c, e))

    if (canBishopDirect || canRookDirect) {
        return 1
    } else return 2
};

console.log(minMovesToCaptureTheQueen(1, 1, 8, 8, 2, 3))
console.log(minMovesToCaptureTheQueen(5, 3, 3, 4, 5, 2))