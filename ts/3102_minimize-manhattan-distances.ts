/**
 * 观察图：https://oi-wiki.org/geometry/images/distance-1.png
 * 坐标数组中的最大曼哈顿距离是由这些点中，构成最大边长的矩形的两个点决定的。
 * 在这个矩形中的任意两个点之间的曼哈顿距离，以及任意一个点到构成这个矩形的两个对角线点中的任意一个的曼哈顿距离，
 * 都不大于这两个对角线点之间的曼哈顿距离。
 * 但是也有可能存在点不能被这个对角线矩形所覆盖的。
 * 
 * 所以可以分别找出横坐标（最大值和最小值构成）的对角线矩形 和 纵坐标（最大值和最小值构成）的对角线矩形。
 * 最大曼哈顿距离产生于两个对角线矩形的 左下坐标 与 右上坐标 的两两组合（4 种 case）
 * 
 * 曼哈顿距离转化为切比雪夫距离（https://oi-wiki.org/geometry/distance/）：
 * 将一个点 (x,y) 的坐标变为 (x + y, x - y) 后，原坐标系中每个点的曼哈顿距离等于新坐标系中每个点的切比雪夫距离。
 * 
 * 那么要求最大的曼哈顿距离可以转化为求最大的切比雪夫距离。
 * 也就是在新的坐标系(切比雪夫)中动态维护 x1 的最大值、次大值和最小值、次小值 以及 y1 的最大值、次大值和最小值、次小值。
 * 每次计算 max{max(x1) - min(x1), max(y1) - min(y1)}, 维护其最小值。
 * 
 * 进一步思考：因为只有移除的是 x1 的最大值和最小值、或者 y1 的最大值或最小值时，才会对最大距离产生影响。
 * 所以只需要枚举移除这四个值的 case 即可。(需要注意的是：x1 和 y1 的各两个最值是有可能两两组合构成 一个坐标点 的，这种情况下需要同时移除坐标对应的 x1 和 y1)
 * 
 * @param points 
 */
function minimumDistance(points: number[][]): number {
    const chebyshevDistances = points.map(([x, y]) => [x + y, x - y])
    let x1Max0 = -1e8, x1Max1 = -1e8, x1Min0 = 2e8, x1Min1 = 2e8
    let y1Max0 = -1e8, y1Max1 = -1e8, y1Min0 = 2e8, y1Min1 = 2e8
    let minXi = 0, minYi = 0, maxXi = 0, maxYi = 0
    chebyshevDistances.forEach(([x1, y1], idx) => {  // idx 下标用来判断 x1 和 y1 来自同一个坐标点
        if (x1 > x1Max0) {  // 比最大值更大
            x1Max1 = x1Max0 // 次大等于最大
            x1Max0 = x1     // 最大等于新最大值
            maxXi = idx
        } else if (x1 > x1Max1) { // 否则如果是比次大值值更大的数
            x1Max1 = x1
        }

        if (x1 < x1Min0) {
            x1Min1 = x1Min0
            x1Min0 = x1
            minXi = idx
        } else if (x1 < x1Min1) {
            x1Min1 = x1
        }
        
        if (y1 > y1Max0) {
            y1Max1 = y1Max0
            y1Max0 = y1
            maxYi = idx
        } else if (y1 > y1Max1) {
            y1Max1 = y1
        }
        
        if (y1 < y1Min0) {
            y1Min1 = y1Min0
            y1Min0 = y1
            minYi = idx
        } else if (y1 < y1Min1) {
            y1Min1 = y1
        }
    })

    let ans = 2e8

    for (let i of [minXi, minYi, maxXi, maxYi]) {  // 枚举 4 种删除 case，如果有 x1 和 y1 来自同一坐标，则会出现重复枚举
        const dx = (i == maxXi ? x1Max1 : x1Max0) - (i == minXi ? x1Min1 : x1Min0)
        const dy = (i == maxYi ? y1Max1 : y1Max0) - (i == minYi ? y1Min1 : y1Min0)
        ans = Math.min(ans, Math.max(dx, dy))
    }

    return ans
};

console.log(minimumDistance([[3,10],[5,15],[10,2],[4,4]]))
console.log(minimumDistance([[1,1],[1,1],[1,1]]))
console.log(minimumDistance([[5,3],[4,6],[2,4],[1,8],[3,9],[1,6]]))
console.log(minimumDistance([[9,3],[5,4],[6,1],[10,10]]))