function findPeaks(mountain: number[]): number[] {
    // 用数字表示山坡的倾斜类型，为 1 代表上升，-1 代表下降，0 表示平缓或者 uninit
    function compareFrom(idx: number) {
        return mountain[idx] < mountain[idx + 1] ? 1 : (
            mountain[idx] > mountain[idx + 1] ? -1 : 0
        )
    }
    let lastSlope = 0
    let ans: number[] = []
    for (let i = 0; i < mountain.length - 1; i++) {
        if (lastSlope == 1) {
            var left = lastSlope
        } else {
            lastSlope = compareFrom(i)
            continue // 跳过当前这个数（一定不是山峰）
        }
        let right = compareFrom(i)
        if (left == 1 && right == -1) {
            ans.push(i)
        }
        lastSlope = right
    }
    return ans
};

console.log(findPeaks([2,4,4]))  // []
console.log(findPeaks([1,4,3,8,5]))  // [1, 3]