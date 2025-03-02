/**
 * 用“造桥”的思想，可以在线性的时间复杂度内完成算法
 * @param nums 
 * @returns 
 */
function jump(nums: number[]): number {
    const n = nums.length
    let curR = 0, nextR = 0, times = 0
    for (let i = 0; i < n - 1; i++) {  // 只需要遍历到 n - 2 的位置，因为终点处不需要再进行造桥
        nextR = Math.max(nextR, i + nums[i])  // 筛选下一座能到最远处的桥

        if (i == curR) {
            curR = nextR  // 造桥
            times++  // 当前到达的最右端还不是终点，则需要再造一座桥
        }
    }
    return times
};

console.log(jump([2,3,1,1,4]))
console.log(jump([2,3,0,1,4]))