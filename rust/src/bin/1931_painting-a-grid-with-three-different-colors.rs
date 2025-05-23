use std::collections::HashMap;

leetcode_rust::declare_solution!();

// const MOD: i64 = 1e9 as i64 + 7;
const MOD: i32 = 1e9 as i32 + 7;

impl Solution {
    // /**
    //  * 方法一: 朴素二维 dp
    //  */
    // pub fn color_the_grid(m: i32, n: i32) -> i32 {
    //     let m = m as usize;
    //     let n = n as usize;
    //     let mut dp = vec![vec![[0_i64, 0_i64, 0_i64]; n]; m];  // dp[i][j] 表示 (i, j) 分别为 红、绿、蓝 时的合法方案数
    //     dp[0][0] = [1, 1, 1];

    //     let mut base = 1;
    //     // 第一行
    //     for j in 1..n {
    //         base = (base * 2) % MOD;
    //         for rgb in 0..3 {
    //             dp[0][j][rgb] = base;
    //         }
    //     }

    //     let mut base = 1;
    //     // 第一列
    //     for i in 1..m {
    //         base = (base * 2) % MOD;
    //         for rgb in 0..3 {
    //             dp[i][0][rgb] = base;
    //         }
    //     }

    //     // 剩余部分
    //     for i in 1..m {
    //         for j in 1..n {
    //             dp[i][j][0] = ((dp[i - 1][j][1] + dp[i - 1][j][2]) * (dp[i][j - 1][1] + dp[i][j - 1][2]) - dp[i - 1][j - 1][0] * 2 - dp[i - 1][j - 1][1] - dp[i - 1][j - 1][2]) / 2 % MOD;  // 红
    //             dp[i][j][1] = ((dp[i - 1][j][0] + dp[i - 1][j][2]) * (dp[i][j - 1][0] + dp[i][j - 1][2]) - dp[i - 1][j - 1][1] * 2 - dp[i - 1][j - 1][0] - dp[i - 1][j - 1][2]) / 2 % MOD;  // 绿
    //             dp[i][j][2] = ((dp[i - 1][j][0] + dp[i - 1][j][1]) * (dp[i][j - 1][0] + dp[i][j - 1][1]) - dp[i - 1][j - 1][2] * 2 - dp[i - 1][j - 1][0] - dp[i - 1][j - 1][1]) / 2 % MOD;  // 蓝
    //         }
    //     }

    //     println!("{:?}", dp);

    //     dp[m - 1][n - 1].iter().fold(0, |acc, cnt| (acc + cnt) % MOD) as i32
    // }


    // 上述做法会有重复统计

    /**
     * 状压 dp
     */
    pub fn color_the_grid(m: i32, n: i32) -> i32 {
        let m = m as usize;
        let n = n as usize;
        // 预处理 valid 包含一列的合法涂色方案（使用三进制数进行存储）
        let mut valid = HashMap::new();
        // 在 [0, 3^m) 范围内枚举满足要求的 mask
        let mask_end = 3_i32.pow(m as u32);
        for mask in 0..mask_end {
            let mut color = vec![];
            let mut mm = mask;
            for _ in 0..m {
                color.push(mm % 3);
                mm /= 3;
            }
            let mut check = true;
            for i in 0..m - 1 {
                if color[i] == color[i + 1] {
                    check = false;
                    break;
                } 
            }
            if check {
                valid.insert(mask, color);
            }
        }
        
        // 预处理所有的 (mask1, mask2) 二元组，满足 mask1 和 mask2 作为相邻行时，同一行上两个格子的颜色不同
        let mut adjacent = HashMap::new();
        for (&mask1, color1) in &valid {
            for (&mask2, color2) in &valid {
                let mut check = true;
                for i in 0..m {
                    if color1[i] == color2[i] {
                        check = false;
                        break;
                    }
                }

                if check {
                    adjacent.entry(mask1).or_insert(vec![]).push(mask2);
                }
            }
        }

        // 用滚动数组(这里是两个 hash 表)计算 dp
        let mut f = HashMap::new();
        for &mask in valid.keys() {
            f.insert(mask, 1);
        }
        for _ in 1..n {
            let mut g = HashMap::new();
            for &mask2 in valid.keys() {
                let mut total = 0;
                if let Some(list) = adjacent.get(&mask2) {
                    for &mask1 in list {
                        total = (total + f.get(&mask1).unwrap_or(&0)) % MOD;
                    }
                }
                g.insert(mask2, total);
            }
            f = g;
        }

        let mut ans = 0;
        for &num in f.values() {
            ans = (ans + num) % MOD;
        }
        ans
    }
}

fn main() {
    println!("{}", Solution::color_the_grid(1, 1));
    println!("{}", Solution::color_the_grid(1, 2));
    println!("{}", Solution::color_the_grid(2, 1));
    println!("{}", Solution::color_the_grid(2, 2));
    println!("{}", Solution::color_the_grid(2, 3));
    println!("{}", Solution::color_the_grid(5, 5));
}