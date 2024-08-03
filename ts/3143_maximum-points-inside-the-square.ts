/**
 * 在正方形内所含点不重复的情况下，边长尽可能大的话能包含的点数量会越多
 * @param points 
 * @param s 
 */
function maxPointsInsideSquare(points: number[][], s: string): number {
    const alphabetMap: Record<string, [number, number]> = {}  // 键值是二级缓存，存储每种最小值和次小值
    let upperHalfSide = INFINITY // 记录最大的合法边长一半的上界（不包含）
    for (let i = 0; i < s.length; i++) {
        const c = s[i]
        const [x, y] = points[i]
        const dist = Math.max(Math.abs(x), Math.abs(y))  // 将所有坐标都放到第一象限来处理，横坐标和纵坐标的最大值等于正方形能够包含其所要求的最小边长的一半
        if (alphabetMap[c] == undefined) {
            alphabetMap[c] = [dist, INFINITY]
        } else {
            if (dist < alphabetMap[c][0]) { // 小于当前最小
                alphabetMap[c][1] = alphabetMap[c][0]
                alphabetMap[c][0] = dist
            } else if (dist < alphabetMap[c][1]) { // 小于当前次小
                alphabetMap[c][1] = dist
            }

            upperHalfSide = Math.min(upperHalfSide, alphabetMap[c][1])  // 对于所有标记，最小的次小一半边长对应最大的合法正方形
        }
    }
    let ans = 0
    for (const c in alphabetMap) {
        if (alphabetMap[c][0] < upperHalfSide) ans++
    }
    return ans
};

const INFINITY = 1e9 + 1

console.log(maxPointsInsideSquare([[2,2],[-1,-2],[-4,4],[-3,1],[3,-3]], "abdca"))
console.log(maxPointsInsideSquare([[1,1],[-2,-2],[-2,2]], "abb"))
console.log(maxPointsInsideSquare([[1,1],[-1,-1],[2,-2]], "ccd"))