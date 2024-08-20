namespace L522 {
    const memory: Record<number, number> = {}  // 把 dfs 的记忆体写在外面，这样多个测试用例之间可以共享记忆化搜索的结果，效率更高

    function checkRecord(n: number): number {
        const MOD = 1e9 + 7
        const FORWARD_TWO_MOD = 0b11
        function nextForwardTwo(curVal: number, nextChr: string): number {
            curVal = (curVal << 1) & FORWARD_TWO_MOD
            switch (nextChr) {
                case 'A' || 'P':
                    curVal |= 0
                    break
                case 'L':
                    curVal |= 1
                    break
            }
            return curVal
        }

        function getKey(remain: number, aCount: number, forwordTwo: number): number {
            return remain << 3 | aCount << 2 | forwordTwo
        }


        function dfs(remain: number, aCount: number, forwordTwo: number): number {  // forwordTow (前面两位的字符用一个两位二进制数表示，1 表示 'L', 0 表示其他，例如 01 可以表示 'AL' 或 'PL')
            if (aCount >= 2) return 0  // 'A' 字符的数量限制
            if (remain == 0) return 1

            const key = getKey(remain, aCount, forwordTwo)

            // 因为递归函数无副作用, 同样的入参无论计算多少次，算出来的结果都是一样的，因此可以用记忆化搜索来优化
            if (memory[key]) return memory[key]

            let num = 0
            if (forwordTwo != 0b11) {  // 连续 'L' 字符的数量限制
                num += dfs(remain - 1, aCount, nextForwardTwo(forwordTwo, 'L')) % MOD
            }
            num += dfs(remain - 1, aCount + 1, nextForwardTwo(forwordTwo, 'A')) % MOD
            num += dfs(remain - 1, aCount, nextForwardTwo(forwordTwo, 'P')) % MOD

            memory[key] = num % MOD

            return num % MOD
        }

        return dfs(n, 0, 0)
    };

    console.log(checkRecord(2))
    console.log(checkRecord(1))
    console.log(checkRecord(3))
    console.log(checkRecord(20))
    console.log(checkRecord(60))
    console.log(checkRecord(101))
    console.log(checkRecord(5001))
    // 直接计算以下较大的两个数时，vs code 的 ts 代码运行插件会提示递归调用栈溢出，但如果先执行上面更小的数据，使得 dfs 的记忆体有预先储存数据，则能正常计算出结果。（这样就类似于 递推(dp 做法) 的执行步骤。直接写成 dp 也能够正常运行）
    console.log(checkRecord(7001))  
    console.log(checkRecord(10101))
}


/**
 * 矩阵快速幂做法：https://leetcode.cn/problems/student-attendance-record-ii/solutions/2885136/jiao-ni-yi-bu-bu-si-kao-dpcong-ji-yi-hua-a8kj/?envType=daily-question&envId=2024-08-19
 * 
 * 时间复杂度: O(log n)
 */

function checkRecord_quicker(n: number): number {
    const MOD = 1e9 + 7
    const SIZE = 6

    type Matrix = number[][]
    const initMatrix = () => Array.from({ length: SIZE }, () => Array<number>(SIZE).fill(0))

    // 返回矩阵 a 和矩阵 b 相乘的结果
    function mul(a: Matrix, b: Matrix): Matrix {
        const c = initMatrix()
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                for (let k = 0; k < SIZE; k++) {
                    c[i][j] = (c[i][j] + Number(BigInt(BigInt(a[i][k]) * BigInt(b[k][j])) % BigInt(MOD))) % MOD
                }
            }
        }
        return c
    }

    // 计算矩阵快速幂
    function pow(a: Matrix, n: number): Matrix {
        let res = initMatrix()
        for (let i = 0; i < SIZE; i++) {  // 初始化为单位矩阵
            res[i][i] = 1
        }
        while (n) {
            if (n & 1) {
                res = mul(res, a)
            }
            a = mul(a, a)
            n >>= 1
        }
        return res
    }

    const m: Matrix = [
        [1, 1, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 0]
    ]
    const res = pow(m, n)
    let ans = 0
    for (const x of res[0]) {
        ans = (ans + x) % MOD
    }
    return ans
}

console.log(checkRecord_quicker(2))
console.log(checkRecord_quicker(1))
console.log(checkRecord_quicker(3))
console.log(checkRecord_quicker(20))
console.log(checkRecord_quicker(60))
console.log(checkRecord_quicker(101))
console.log(checkRecord_quicker(5001))
console.log(checkRecord_quicker(7001))
console.log(checkRecord_quicker(10101))