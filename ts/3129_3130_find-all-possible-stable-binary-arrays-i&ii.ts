/**
 * 方法一：记忆化搜索 (4 个维度)
 * 能过 624 / 670, TLE
 */
// function numberOfStableArrays(zero: number, one: number, limit: number): number {
//     const MOD = 1e9 + 7
//     const memony: Map<string, number> = new Map()

//     function formatKey(z: number, o: number, l: boolean, r: number): string {
//         return `${z}_${o}_${l ? 1 : 0}_${r}`
//     }

//     function dfs(zero: number, one: number, lastSelected: boolean | undefined, remain: number): number {
//         if (remain < 0) return 0
//         if (zero < 0 || one < 0) return 0
//         if (zero == 0 && one == 0) return 1

//         if (lastSelected != undefined) {
//             const key = formatKey(zero, one, lastSelected, remain)
//             if (memony.has(key)) {
//                 return memony.get(key)!
//             }
//         }

//         let a = dfs(zero - 1, one, false, lastSelected == false ? remain - 1 : limit - 1)
//         a %= MOD
//         let b = dfs(zero, one - 1, true, lastSelected == true ? remain - 1 : limit - 1)
//         b %= MOD
//         const num = (a + b) % MOD

//         if (lastSelected != undefined) {
//             const key = formatKey(zero, one, lastSelected, remain)
//             memony.set(key, num)
//         }

//         return num
//     }

//     return dfs(zero, one, undefined, limit)
// };

/**
 * 方法二：动态规划
 * 优化上述的记忆化搜索，降低维度到 3 维（去掉 limit, 将 lastSelected 修改为 k，定义为 第 zero + one 个数填 k(取0/1)时，合法的方案数）
 * 假设当 k = 0 时，在第 i + j 位，需要求解的是 dfs(i, j, 0)，
 * 就要考虑第 i + j - i 位的情况： 
 * 如果填 0，问题变成 dfs(i - 1, j, 0)
 * 如果填 1，问题变成 dfs(i - 1, j, 1)
 * (i - 1 中少了的 1 被下一步用来在 i + j 的位置放置 0)；
 * 同理 k = 1 时，求 dfs(i, j, 1),
 * 转化为子问题是：k=0 dfs(i, j - 1, 0), k=1 dfs(i, j - 1, 1)。
 * 
 * 还需要考虑去掉的维度(limit)的限制，连续出现的 0 或 1 不应该超过 limit 限制。
 * 因为定义的 dfs(i, j, k) 本身统计的结果都是合法的，在进行状态转移时，需要排除掉连续 1/0 超过 limit 的情况。
 * 对于 dfs(i, j, 0)，对应的连续 0 超过 limit 的情况是 在计算了 dfs(i - limit - 1, j, 1) 种情况后，后面全是 0（共 limit + 1 个 0）的情况, 需要排除掉这样的错误 case。
 * 所以状态转移方程为：
 * dfs(i, j, 0) = dfs(i - 1, j, 1) + dfs(i - 1, j, 0) - dfs(i - limit - 1, j, 1)
 * dfs(i, j, 1) = dfs(i, j - 1, 0) + dfs(i, j - 1, 1) - dfs(i, j - limit - 1, 0)
 */
// function numberOfStableArrays(zero: number, one: number, limit: number): number {
//     const MOD = 1e9 + 7

//     const dp: number[][][] = Array.from({ length: zero + 1 }, () =>
//         Array.from({ length: one + 1 }, () =>
//             Array.from({ length: 2 }, () => 0)
//         )
//     )
//     // 初始边界条件 (连续的 0/1 数量不超过 limit 都是合法的)
//     for (let i = 0; i <= Math.min(limit, zero); i++) {
//         dp[i][0][0] = 1
//     }
//     for (let i = 0; i <= Math.min(limit, one); i++) {
//         dp[0][i][1] = 1
//     }
//     dp[1][0][0] = 1
//     dp[0][1][0] = 0
//     dp[0][1][1] = 1
//     dp[1][0][1] = 0

//     // 状态转移
//     for (let i = 1; i <= zero; i++) {
//         for (let j = 1; j <= one; j++) {
//             dp[i][j][0] = (dp[i - 1][j][1] + dp[i - 1][j][0]) % MOD - (i > limit ? dp[i - limit - 1][j][1] : 0)
//             if (dp[i][j][0] < 0) dp[i][j][0] = (dp[i][j][0] + MOD) % MOD  // 保证结果非负
//             dp[i][j][1] = (dp[i][j - 1][0] + dp[i][j - 1][1]) % MOD - (j > limit ? dp[i][j - limit - 1][0] : 0)
//             if (dp[i][j][1] < 0) dp[i][j][1] = (dp[i][j][1] + MOD) % MOD  // 保证结果非负
//         }
//     }

//     // 出口
//     return (dp[zero][one][0] + dp[zero][one][1]) % MOD
// }

/**
 * 方法三：组合数学 + 容斥原理
 * 可以把题目描述情景看作是将两种颜色的小球分别放到一些盒子里（每个盒子只能放一种颜色的球），要求放置后每个盒子非空。
 * 可以采用隔板法来为每种颜色的球进行分组，比如对于 zero 个的小球，有 zero - 1 个位置可以放置隔板，假设要分为 i 组(i <= zero)，有 C(zero - 1, i - 1) 种隔法。
 * 注意到，这里的隔板是另外一种颜色的球的每个分组，而且另外这种颜色的球的某个分组（隔板）可以选择放在所有 zero 球组的 前面 或 后面。
 * 所以在 zero 球分组确定后（one 球组作为 zero 球组的隔板，放在 zero 球组中间的组数是确定的，等于 zero 球的组数 - 1），
 * one 球组 相对于 zero 球组放置的位置有4种情况可以选择，①头尾都不放置（one 球组数等于 zero 球组数 - 1），
 * ②在头前面放置、尾后不放置 或者 ③在头前不放置、尾后放置（one 球组数等于 zero 球组数），
 * ④在头尾都放置（one 球组数等于 zero 球组数 + 1）.
 * 作为隔板的 one 球组，只要组内球数量大于 0，其中每组的球是可以自由流转到其他组内的，也就是相当于此时 zero 反过来作为隔板来对 one 球进行分组。
 * 
 * 设 one 球被分成了 i 组，那么，根据上述情况对应的 zero 球可能被分成了 i - 1 组（对应情况④）、i 组（对应情况②和③）、i + 1 组（对应情况①）.
 * 这几种对应情况，都能能用来对 one 球进行分组，所以根据乘法原理，可以得到：
 * 把 one 球分成 i 组的方案数 = (C(zero - 1, i - 1 - 1) + 2 * C(zero - 1, i - 1) + C(zero - 1, i + 1 - 1)) * C(one - 1, i - 1)
 * 
 * 上面分组没有考虑到连续(每组中)的 zero/one 球超过 limit 的情况，需要将这些不合法的情况排除：
 * 同样，可能会有 1组、2组、3组、...、(one - i)/limit组（对应着从 i 个组中取 j 组先分配 limit 个球，然后向所有组(共 i 个)分配 1 个球(保证每个组都不会为空)）中的球数超过 limit 的情况。）
 * 要构造这样的球数超出 limit 的情况，都是每次从 i 个分组中取出 j 个组，然后给 j 中的每个组都先分配 limit 个球，然后将剩余的球分配(不一定平均)给每一个组，要求分配给每个组的球数至少为 1 个。
 * 这样就能保证预先选出来的这 j 组最后分配到的球数一定超过 limit，而其余组的球数有可能超过 limit、有可能不超。
 * 所以每次这样分配保证的是 至少1组、至少2组、至少3组、...、恰好(one - i)/limit组 的球数超过了 limit (limit >= 1).
 * 假设给每组编一个编号: a, b, c, d, ....
 * 将每种可能的分配映射称为二维平面上的点，对于每一组超过了限制的分配情况，我们可以用一个联通的封闭图形将这些点全都给“圈起来”，
 * 以第 a 组为例，假设我们“圈起来”的超过 limit 的分配情况的集合称为 A，同理可以得到：b -> B, c -> C, d -> D, ....
 * 这些情况集合之间，两两、三三、四四、nn 之间可能相互是存在交集的，为了使得每个超过 limit 的分配情况只被统计一次，
 * 需要使用“容斥原理”来保证统计结果的正确性。
 * 也就是在用隔板法求每种球的分组方案数时，为了得到合法的分配方案数，需要用 总的可分配方案数 - 至少1组被分配的球数超过limit的方案数。
 * 至少1组被分配的球数超过limit的方案数，通过容斥原理可以表示为（以 zero 球为例）：
 * Σj (C(i, j) * (-1)^(j - 1) * C(zero - limit * j - 1, i - 1)), 其中 j 为分配球数一定超过 limit 的组数, i 为总的组数（包括了 j）。
 * 其中 C(i, j) 表示的是从所分的 i 组中，选取 j 组，保证至少这 j 组被分配到的球数一定超过 limit。因为题目要求的是
 * 数组的数量，而数组的每个元素本身是有着不同的下标这一属性的，所以这里有必要用求组合数的方式，从已经分配好下标元素的 i 组(前面通过隔板法得到的)中选 j 组。
 * (-1)^(j - 1) 用来产生正负号，表示容斥原理中的 排除冗余部分 和 填补多次被减去部分。 
 * 关于容斥原理中具体的每项 “C(zero - limit * j - 1, i - 1)” 的理解:
 * 先从总数为 zero 的球中取出 j * limit 个球，向这 j 个组，每个组分配 limit 个球 （j 个组在上面从“i 个组选 j 个组”的步骤已经确定，所以这一步对应的情况只有一种。可以想象成起初 i 个组都是空的，现在向其中指定的 j 个空位放入了 limit 个小球），
 * 剩余 zero - j * limit 个球待分配。然后使用隔板法分配这 zero - j * limit 个球到 i 组（所有的分组）中，对应的分法就有 C(zero - j * limit - 1, i - 1) 种。（可以把隔板分组转换想象为 往所有的空位和 j 个上一步放了球的槽(共 i 个)倒入 zero - j * limit 个球，每个槽中的球在保证数量不少于 1 (那 j 个槽的球数不少于 limit + 1)的情况下，可以向其他槽自由转移，所有移动停止后再确定每个小球的下标）。
 * 用乘法原理将 C(i, j) 和 C(zero - limit * j - 1, i - 1) 连接起来，就是非法数据在容斥原理中的每一项的绝对值。
 */
function numberOfStableArrays(zero: number, one: number, limit: number): number {
    const MOD = BigInt(1e9 + 7)
    const MX = 1001

    const F: bigint[] = Array(MX)  // F[i] = i! （计算 i 的阶乘）
    const invF: bigint[] = Array(MX)  // invF[i] = 1!^-1  （逆元。通过逆元来求组合数，将除法转化为乘法, 为了方便对组合数运算进行取模操作 (前提是 被除数 和 模数 互质，已知 1e9 + 7 为质数)）

    // 用快速幂计算幂运算
    function pow(x: bigint, n: number) {
        let res = BigInt(1)
        for (; n; n >>= 1) {
            if (n % 2) {
                res = res * x % MOD
            }
            x = x * x % MOD
        }
        return res
    }

    // init
    F[0] = BigInt(1)
    for (let i = 1; i < MX; i++) {  // 预计算范围内各数字的阶乘
        F[i] = F[i - 1] * BigInt(i) % MOD
    }
    invF[MX - 1] = pow(F[MX - 1], Number(MOD) - 2)
    for (let i = MX - 1; i; i--) {   // 预计算对应逆元
        invF[i - 1] = invF[i] * BigInt(i) % MOD
    }

    // 求组合数 C(n, m)
    function comb(n: number, m: number): bigint {
        return F[n] * invF[m] % MOD * invF[n - m] % MOD  // 公式 C(n, m) = n!/(m! * (n - m)!) 转化为逆元乘法运算
    }

    if (zero > one) {
        [zero, one] = [one, zero]  // 保证空间复杂度为 O(min(zero, one))
    }
    // 在 zero 中插隔板
    const f: bigint[] = Array(zero + 3).fill(BigInt(0))
    for (let i = Math.ceil(zero / limit); i <= zero; i++) {  // 分组数（组数上限为 zero(对应每组只分配一个球)，下限为 ⌈ zero / limit⌉ (对应每组平均分配 limit 个球，下限以下的范围没必要计算，因为肯定至少有一组的球数会超 limit)）
        f[i] = comb(zero - 1, i - 1)  // 隔板法计算把 zero 球的分为 i 组的方案数
        for (let j = 1; j <= Math.floor((zero - i) / limit); j++) {  // 使用容斥原理排除重复计算的超分配情况
            f[i] = (f[i] + BigInt(1 - j % 2 * 2) * comb(i, j) * comb(zero - j * limit - 1, i - 1)) % MOD
        }
    }

    let ans = BigInt(0)
    // 在 one 中插隔板（做法同上）
    for (let i = Math.ceil(one / limit); i <= Math.min(one, zero + 1); i++) {
        let fi = comb(one - 1, i - 1)  // 用 zero 球组作为隔板，分 one 球为 i 组的方案数
        for (let j = 1; j <= Math.floor((one - i) / limit); j++) {
            fi = (fi + BigInt(1 - j % 2 * 2) * comb(i, j) * comb(one - j * limit - 1, i - 1)) % MOD
        }
        ans = (ans + (f[i - 1] + f[i] * BigInt(2) + f[i + 1]) * fi) % MOD  // 计算每个 fi 与对应 zero 球分组方案数构成的总方案数（乘法原理），并累加
    }

    return Number((ans + MOD) % MOD)  // 保证结果非负
}

console.log(numberOfStableArrays(1, 1, 2))
console.log(numberOfStableArrays(1, 2, 1))
console.log(numberOfStableArrays(3, 3, 2))
console.log(numberOfStableArrays(13, 20, 93))
console.log(numberOfStableArrays(19, 15, 15))
console.log(numberOfStableArrays(68, 42, 61))
console.log(numberOfStableArrays(1000, 1000, 2))
console.log(numberOfStableArrays(1000, 1000, 500))