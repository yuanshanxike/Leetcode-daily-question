function fallingSquares(positions: number[][]): number[] {
    // 暴力枚举做法（因为坐标范围太大，不能实质性地去对每个整数坐标进行计算）:
    const heights: number[] = []  // 每个方块依次下落后顶部的高度
    positions.forEach(([left, sl], i) => {
        const right = left + sl
        heights[i] = sl // 底部区域没有重合的方块时，下落后高度为自身的边长
        // *循环找重合底部区域的方块并计算顶部高度最大值的逻辑可以通过 有序集合 进行优化
        for (let j = 0; j < i; j++) { // 检测重合，同时统计这个方块能到达的最大顶部高度
            const [left0, sl0] = positions[j]
            const right0 = left0 + sl0
            if (left < right0 && right > left0) {  // 两个方块横坐标有重合部分的条件
                heights[i] = Math.max(heights[i], heights[j] + sl)
            }
        }
    })
    // 此时，heights[i] 表示下落完成后，第 i 个方块的顶部高度
    // 再遍历一次数组，在 heights 中更新前 i 个方块下落完成后的最大高度，就是题目要求的答案
    heights.forEach((cur, idx) => {
        if (idx > 0) heights[idx] = Math.max(heights[idx - 1], cur)
    })
    return heights
};

console.log(fallingSquares([[1,2],[2,3],[6,1]]))
console.log(fallingSquares([[100,100],[200,100]]))