/**
 * 主要难点在于几何数学的分析层面。
 * 题目给的是作为障碍物的若干圆形，需要在给定的矩形范围内寻找一条未被阻断的通路。
 * 这个问题可以转化成：题目所给的⚪是否能够把起点和终点所在的矩形区域切断，使得起点和终点无路可走。
 * 我们需要做的，就是计算给定的⚪中，是否存在与矩形的 左/上 边相切的⚪，并经过与之 相交/相切 的其他⚪，从而到达与矩形的 右/下 边 相交/相切的⚪。
 * （注意上述的做法是完全可以通过⚪与⚪ 相交/相切 的部分在矩形外部的区域去连接矩形的 左/上 和 右/下 的，那么这样就不能起到阻断通路的效果，因此需要考虑⚪与⚪ 相交/相切 区域在矩形外部的情况）
 * 可以将每一个⚪抽象成图论中的一个节点，遇到⚪与⚪ 相交/相切 区域严格在矩形内的情况时将两个节点连接，
 * 最后从与矩形区域 左/上 相交的⚪出发，dfs，没到达一个新的⚪时判断是否与矩形区域的 右/下 相交，
 * 存在上述图论中的路径，则表示起点和终点间的区域被⚪所切断，返回 false 表示不可达，否则返回 true 表示可达。
 * @param xCorner 
 * @param yCorner 
 * @param circles 
 */
function canReachCorner(xCorner: number, yCorner: number, circles: number[][]): boolean {
    // 判断点 (x, y) 是否在圆 (ox, oy, r) 内
    function inCirCle(ox: number, oy: number, r: number, x: number, y: number) {
        return BigInt(ox - x) ** 2n + BigInt(oy - y) ** 2n <= BigInt(r) ** 2n
    }

    const xn = BigInt(xCorner), yn = BigInt(yCorner)
    const visited = Array(circles.length).fill(false)
    function dfs(i: number): boolean {
        const [x1, y1, r1] = circles[i]
        // 圆 i 是否与矩形右边界/下边界相交相切。判断条件依据见题解里的图：https://leetcode.cn/problems/check-if-the-rectangle-corner-is-reachable/solutions/2860214/deng-jie-zhuan-huan-bing-cha-ji-pythonja-yf9y/
        if (y1 <= yCorner && Math.abs(x1 - xCorner) <= r1 ||
            x1 <= xCorner && y1 <= r1 ||
            x1 > xCorner && inCirCle(x1, y1, r1, xCorner, 0)
        ) {
            return true
        }
        const x1n = BigInt(x1), y1n = BigInt(y1), r1n = BigInt(r1)
        visited[i] = true
        for (let j = 0; j < circles.length; j++) {
            if (!visited[j]) {
                const [x2, y2, r2] = circles[j]
                const x2n = BigInt(x2), y2n = BigInt(y2), r2n = BigInt(r2)
                // 在两圆相交相切的前提下，点 A 是否严格在矩形内
                if ((x1n - x2n) ** 2n + (y1n - y2n) ** 2n <= (r1n + r2n) ** 2n &&
                    x1n * r2n + x2n * r1n < (r1n + r2n) * xn &&
                    y1n * r2n + y2n * r1n < (r1n + r2n) * yn &&
                    dfs(j)
                ) {
                    return true
                }
            }
        }
        return false
    }

    for (let i = 0; i < circles.length; i++) {
        const [x, y, r] = circles[i]
        // 先判断⚪与矩形的 左/上 边界是否相交，若相交，则再递归判断通过其或其他的⚪能否与矩形的 右/下 相交
        if (inCirCle(x, y, r, 0, 0) ||  // 圆 i 包含矩形左下角
            inCirCle(x, y ,r, xCorner, yCorner) || // 圆 i 包含矩形右上角
            !visited[i] && (x <= xCorner && Math.abs(y - yCorner) <= r ||
                            y <= yCorner && x <= r ||
                            y > yCorner && inCirCle(x, y, r, 0, yCorner)) && dfs(i)
        ) {
            return false
        }
    }
    return true
};

console.log(canReachCorner(3, 4, [[2, 1, 1]]))
console.log(canReachCorner(3, 3, [[1, 1, 2]]))
console.log(canReachCorner(3, 3, [[2,1,1],[1,2,1]]))
console.log(canReachCorner(4, 4, [[5,5,1]]))
console.log(canReachCorner(3, 3, [[2,1000,997],[1000,2,997]]))