/**
 * 状压 dp：
 * 用一个 n 位的二进制 s 数表示待选取的 nums 中的元素下标集合 S，用一个数字 i 表示上一次所选的 nums 中的元素下标。
 * 其中，用 u 表示全集 U = {0, 1, 2, 3, .., n - 1}.
 * 递归入口：dfs(U \ {i}, i).
 * 递归边界：dfs(∅, i) = 1，表示找到了一种特别排列。
 * 枚举特别排列的第一个数下标 i，累加所有 dfs(U \ {i}, i) 即为答案。
 * @param nums 
 */
function specialPerm(nums: number[]): number {
    const n = nums.length
    const u = (1 << n) - 1
    // const memony = Array(u).fill(undefined).map(() => Array<number>(n).fill(-1))
    const memony = Array.from({ length: u }, () => Array<number>(n).fill(-1))

    function dfs(s: number, i: number): number {
        if (s == 0) return 1 // 待选取数组为空集
        if (memony[s][i] != -1) return memony[s][i]
        let res = 0
        for (let j = 0; j < n; j++) {
            if ((s >> j & 1) == 1 && (nums[i] % nums[j] == 0 || nums[j] % nums[i] == 0)) {
                res += dfs(s ^ (1 << j), j)
            }
        }
        memony[s][i] = res
        return res
    }

    let ans = 0
    for (let i = 0; i < n; i++) {
        ans += dfs(u ^ (1 << i), i)
    }
    return ans % (1e9 + 7)
};

console.log(specialPerm([2,3,6]))
console.log(specialPerm([1,4,3]))
console.log(specialPerm([1,2,4,3]))
console.log(specialPerm([1,2,4,3,5]))
console.log(specialPerm([1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8191]))