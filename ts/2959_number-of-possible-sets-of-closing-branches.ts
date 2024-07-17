/**
 * 枚举情况跑 Floyd 最短路算法，并检测合法性
 * @param n 
 * @param maxDistance 
 * @param roads 
 */
function numberOfSets(n: number, maxDistance: number, roads: number[][]): number {
    // 因为是无向图，只需要关心右上或左下的其中一个三角形区域即可。
    // 枚举时，每个节点对应着删或不删两种可能的情况。
    // 因为最多只会有 10 个节点，可以枚举出每个节点选或不选的情况（共 1024 种可能的 case），然后再判断每种删除方式是否符合删除节点后剩余节点的最短距离是否都小于 maxDistance。

    function deleteEmunCount(size: number, selectBits: number): number {  // selectBits 用数字的每个二进制位来表示每个节点的选或不选，从而代替 boolean[]，提高性能并节省内存消耗
        if (size == n) {
            const floyd: number[][] = Array.from({ length: n }, (_, i) => Array(n).fill(INFINITY_DISTANCE).map((val, j) => i == j ? 0 : val))
            for (const [u, v, w] of roads) {
                if ((selectBits & (1 << u)) > 0 || (selectBits & (1 << v)) > 0) continue
                floyd[u][v] = Math.min(floyd[u][v], w)
                floyd[v][u] = floyd[u][v]
            }
            let pass: boolean = true
            for (let k = 0; k < n; k++) {
                for (let x = 0; x < n; x++) {
                    for (let y = 0; y < n; y++) {
                        floyd[x][y] = Math.min(floyd[x][y], floyd[x][k] + floyd[k][y])

                        if (k == n - 1 && y >= x && (selectBits & (1 << x)) == 0 && (selectBits & (1 << y)) == 0 && floyd[x][y] > maxDistance) {
                            pass = false
                        }
                    }
                }
            }
            return pass ? 1 : 0
        }

        return deleteEmunCount(size + 1, (selectBits << 1) + 1) + deleteEmunCount(size + 1, (selectBits << 1) + 0)
    }

    return deleteEmunCount(0, 0) // 初始入口是都不选
};

const INFINITY_DISTANCE = 1e5 + 1


console.log(numberOfSets(3, 5, [[0, 1, 2], [1, 2, 10], [0, 2, 10]]))
console.log(numberOfSets(3, 5, [[0, 1, 20], [0, 1, 10], [1, 2, 2], [0, 2, 2]]))
console.log(numberOfSets(1, 10, []))