/**
 * 二分答案：
 * 在 [1, (max(position) - min(position)) / (m - 1)] 上二分查找答案。
 * 特别地，如果 m == 2，答案是 max(position) - min(position).
 * 
 * 可以贪心地从最小的 position 开始。证明：
 * 假设 position 已经是非递减排序，因为如果存在一个 i，使得 position 的 i...n 中的桶能够装下 m 个球，
 * 且此时每两个球间的最小距离是 force. 那么此时如果把第 i 个桶中的小球挪到第 0 个桶中，前两个小球间的距离增大，那么此时 force 不会减小。
 * @param position 
 * @param m 
 */
function maxDistance(position: number[], m: number): number {
    if (m == 2) return Math.max(... position) - Math.min(... position)

    position.sort((a, b) => a - b)
    const n = position.length
    let l = 1, r = Math.floor((position[position.length - 1] - position[0]) / (m - 1))
    while (r >= l) {
        const mid = Math.floor((l + r) / 2)

        let cnt = 1, curIdx = 0
        for (let i = curIdx + 1; i < n; i++) {
            if (position[i] - position[curIdx] >= mid) {
                cnt++
                curIdx = i
            }
        }

        if (cnt >= m) {
            l = mid + 1  // 可以实现 mid 为两个球之间最小的距离，注意：这里的 mid 是一个可行的方案
        } else {
            r = mid - 1  // 两个球之间的距离 mid 过大，不够装 m 个球
        }
    }
    return r
};

console.log(maxDistance([1,2,3,4,7], 3))
console.log(maxDistance([5,4,3,2,1,1000000000], 2))
console.log(maxDistance([79,74,57,22], 4))