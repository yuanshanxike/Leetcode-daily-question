// use std::collections::HashMap;

leetcode_rust::declare_solution!();

const MOD: i32 = 1e9 as i32 + 7;

impl Solution {
    // pub fn num_tilings(n: i32) -> i32 {
    //     fn dfs(memo: &mut HashMap<(i32, i32), i32>, len0: i32, len1: i32) -> i32 {
    //         if len0 < 0 || len1 < 0 { return 0; }
    //         // if len0 == 1 && len1 == 1 { return 1; }  // 仅能用一列 domino 牌填充
    //         // if len0 == 1 && len1 == 2 { return 1; }  // 仅能用正放的一个“L”型 tromino 牌填充
    //         // if len0 == 2 && len1 == 1 { return 1; }  // 仅能用倒放的一个“L”型 tromino 牌填充
    //         if len0 == 0 && len1 == 0 { return 1; }  // 特殊边界，表示所有瓷砖能被正确拆解成若干 domino 牌和 tromino 牌（该拆解路径是一条合法的路径）

    //         // println!("[{}, {}]", len0, len1);

    //         if memo.contains_key(&(len0, len1)) {
    //             return memo[&(len0, len1)];
    //         }

    //         if len0 + 2 <= len1 {
    //             return dfs(memo, len0, len1 - 2);
    //         } else if len0 >= len1 + 2  {
    //             return dfs(memo, len0 - 2, len1);
    //         }

    //         // let cnt: i32 = (
    //         //     (if len0 == len1 { dfs(env, len0 - 1, len1 - 1) } else { 0 } 
    //         //         + if len0 == len1 || len0 + 1 == len1 { dfs(env, len0 - 1, len1 - 2) } else { 0 }
    //         //     ) % MOD 
    //         //     + if len0 == len1 || len0 == len1 + 1 { dfs(env, len0 - 2, len1 - 1) } else { 0 }
    //         // ) % MOD;  // 从当前剩余的两行瓷砖中，（如果条件允许）选择

    //         let cnt = if len0 == len1 { dfs(memo, len0 - 1, len1 - 1) } else { 0 };
    //         let cnt = (cnt + if len0 == len1 || len0 + 1 == len1 { dfs(memo, len0 - 1, len1 - 2) } else { 0 }) % MOD;
    //         let cnt = (cnt + if len0 == len1 || len0 == len1 + 1 { dfs(memo, len0 - 2, len1 - 1) } else { 0 }) % MOD;

    //         let cnt = (cnt + dfs(memo, len0 - 2, len1)) % MOD;
    //         // let cnt = (cnt + if len0 >= 2 { dfs(memo, len0 - 2, len1) } else { 0 }) % MOD;
    //         // let cnt = (cnt + if len1 >= 2 { dfs(memo, len0, len1 - 2) } else { 0 }) % MOD;

    //         memo.insert((len0, len1), cnt);

    //         // println!("[{}, {}], cnt: {}", len0, len1, memo[&(len0, len1)]);

    //         cnt
    //     }

    //     dfs(&mut HashMap::new(), n, n)
    // }

    // 以上做法有对称重复计数的问题，并且难以解决

    /**
     * 方法一：找规律
     * 递推公式推导过程：
     * https://leetcode.cn/problems/domino-and-tromino-tiling/solutions/1968516/by-endlesscheng-umpp/?envType=daily-question&envId=2025-05-05
     * 
     * 写法一
     */
    pub fn num_tilings_0_a(n: i32) -> i32 {
        let n = n as usize;
        if n == 1 { return 1; }
        let mut f = vec![0; n + 1];
        f[0] = 1;
        f[1] = 1;
        f[2] = 2;
        for i in 3..=n {
            f[i] = ((2 * f[i - 1]) % MOD + f[i - 3]) % MOD;
        }

        f[n]
    }

    /**
     * 方法一
     * 写法二（使用滚动变量代替数组）
     */
    pub fn num_tilings_0_b(n: i32) -> i32 {
        let n = n as usize;
        if n == 1 { return 1; }
        let mut a = 1;
        let mut b = 1;
        let mut c = 2;
        (3..=n).for_each(|_| {
            (a, b, c) = (b, c, (((2 * c) % MOD) + a) % MOD);
        });

        c
    }

    /**
     * 方法一进阶
     * 通过矩阵快速幂进行优化
     */
    pub fn num_tilings_0_x(n: i32) -> i32 {
        let n = n as usize;
        if n == 1 { return 1; }
        let vec = Matrix(vec![[1].to_vec(), vec![1], [2].to_vec()]);  // 用矩阵表示纵向的向量：[[a], [b], [c]]
        // 根据 fn num_tilings_0_b() 中循环运算对应的多项式推导出矩阵
        let mat = Matrix(
            vec![
                vec![0, 1, 0],
                vec![0, 0, 1],
                vec![1, 0 ,2]
            ]
        );

        let Matrix(vec) = mat.pow_mul(n - 2, vec);
        vec[2][0] as i32
    }

    /**
     * 方法二：DP
     * 状态定义：
     * https://leetcode.cn/problems/domino-and-tromino-tiling/solutions/1962465/duo-mi-nuo-he-tuo-mi-nuo-ping-pu-by-leet-7n0j/?envType=daily-question&envId=2025-05-05
     */
    pub fn num_tilings_1(n: i32) -> i32 {
        let n = n as usize;
        let mut dp = vec![[0_i64; 4]; n + 1];
        dp[0][3] = 1;  // 初始合法状态（前面一列被铺满），对应 1 种合法的铺法
        for i in 1..=n {
            dp[i][0] = dp[i - 1][3];   // 只需前一个状态是两个格子都被填满的状态，不需要额外铺设 domino 牌或 tromino 牌
            dp[i][1] = (dp[i - 1][2] /* 横放一个 domino 牌 */ + dp[i - 1][0] /* 倒着放一个“L”型的 tromino 牌 */) % MOD as i64;
            dp[i][2] = (dp[i - 1][1] /* 横放一个 domino 牌 */ + dp[i - 1][0] /* 正着放一个“L”型的 tromino 牌 */) % MOD as i64;
            dp[i][3] = (dp[i - 1][0] /* 横放两个 domino 牌 */ + dp[i - 1][1] /* 正着左右颠倒地放一个“L”型的 tromino 牌 */ + dp[i - 1][2] /* 倒着左右颠倒地放一个“L”型的 tromino 牌 */ + dp[i - 1][3] /* 竖放一个 domino 牌 */) % MOD as i64;
        }

        dp[n][3] as i32  // 最后一列铺满，完整构成矩形的方案数
    }

    /**
     * 方法二进阶
     * 通过矩阵快速幂进行优化
     */
    pub fn num_tilings_1_x(n: i32) -> i32 {
        let n = n as usize;
        if n == 1 { return 1; }
        let mut vec = vec![[0].to_vec(); 4];
        vec[3][0] = 1;
        let vec = Matrix(vec);
        let mat = Matrix(
            vec![
                vec![0, 0, 0, 1],
                vec![1, 0, 1, 0],
                vec![1, 1, 0, 0],
                vec![1, 1, 1, 1]
            ]
        );

        let Matrix(vec) = mat.pow_mul(n, vec);
        vec[3][0] as i32
    }
}

struct Matrix(Vec<Vec<i64>>);

use std::ops::Mul;

impl Mul<&Matrix> for &Matrix {
    type Output = Matrix;

    fn mul(self, rhs: &Matrix) -> Self::Output {
        let a = &self.0;
        let b = &rhs.0;
        let n = a.len();
        let m = b[0].len();

        let mut c = vec![vec![0; m]; n];
        for i in 0..n {
            for k in 0..a[i].len() {
                if a[i][k] == 0 { continue; }
                for j in 0..m {
                    c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD as i64;
                }
            }
        }

        Matrix(c)
    }
}

impl Matrix {
    /**
     * 矩阵快速幂
     */
    fn pow_mul(mut self, mut n: usize, mut vec: Matrix) -> Matrix {
        while n > 0 {
            if n & 1 == 1 {
                vec = &self * &vec;
            }
            self = &self * &self;
            n >>= 1;
        }

        vec
    }
}

fn main() {
    println!("{}", Solution::num_tilings_1_x(1));
    println!("{}", Solution::num_tilings_1_x(2));
    println!("{}", Solution::num_tilings_1_x(3));
    println!("{}", Solution::num_tilings_1_x(4));
    println!("{}", Solution::num_tilings_1_x(5));
    println!("{}", Solution::num_tilings_1_x(1000));
}