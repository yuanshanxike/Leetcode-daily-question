use std::collections::HashMap;

leetcode_rust::declare_solution!();

impl Solution {
    // /**
    //  * 方法一：枚举
    //  * 时间复杂度：O((high - low) * log high)
    //  */
    // pub fn count_symmetric_integers(low: i32, high: i32) -> i32 {
    //     let mut cnt = 0;
    //     for num in low..=high {
    //         let num_len = num.to_string().len();
    //         if num_len % 2 == 0 {
    //             let mut l = 0;
    //             let mut r = 0;
                
    //             let half = num_len / 2;
    //             let mut num2 = num;

    //             for i in 0..num_len {
    //                 if i < half {
    //                     r += num2 % 10;
    //                 } else {
    //                     l += num2 % 10;
    //                 }
    //                 num2 /= 10;
    //             }

    //             if l == r {
    //                 cnt += 1;
    //             }
    //         }
    //     }

    //     cnt
    // }

    /**
     * 方法二：数位 dp
     * 
     * 能够适用于超大数据范围
     */
    pub fn count_symmetric_integers(low: i32, high: i32) -> i32 {
        let low = low.to_string();
        let high = high.to_string();
        let n = high.len();
        let diff_lhz = n - low.len();  // 前导零的数量

        let memo: HashMap<(usize, i32, i32), i32> = HashMap::new();  // 不需要记忆化 limit_low 和 limit_high

        let mut env = Env {
            memo, low, high, n, diff_lhz
        };

        fn dfs(env: &mut Env, i: usize, start: i32, diff: i32, limit_low: bool, limit_high: bool) -> i32 {
            let Env{ low, high, n, diff_lhz, memo } = env;
            if i == *n { return if diff == 0 { 1 } else { 0 }; }

            let key = (i, start, diff);

            // 与记忆化写入的时机相对应。limit_low 或 limit_high 为 true 时，后续数位的选择范围是受限的（比它们都为 false 时的范围 [0, 9] 要小），计算出来的数量也就更小。
            // 所以不能使用记忆化中的数量，那样会使得计算结果偏大。
            if start != -1 && !limit_low && !limit_high && memo.contains_key(&(i, start, diff)) {
                return memo[&key];
            }

            let lo = if limit_low && i >= *diff_lhz { low.as_bytes()[i - *diff_lhz] - b'0' } else { 0 };
            let hi = if limit_high { high.as_bytes()[i] - b'0' } else { 9 };

            // 即将开始进行数字构造时就进行判断，如果要构造的字符串长度为奇数，则不进行构造（视情况直接返回 0 或者 跳过当前，构造下一个长度为偶数的数字）。 此时不可能构造出符合要求的数字。
            if start < 0 && (*n - i) % 2 == 1{
                return if lo > 0 {  // 即将构造的数字小于 low，不合法
                    0 
                } else {
                    dfs(env, i + 1, start, diff, true, false)  // 重新开始构造下一个偶数位长度的数字
                };
            }

            let mut res = 0;
            let is_left = start < 0 || i < (start + *n as i32) as usize / 2;  // 判断是左半边还是右半边

            for d in lo..=hi {
                res += dfs(env, i + 1, 
                    if start < 0 && d > 0 { i as i32 } else { start },  // 记录第一个填数字的位置
                    diff + if is_left { d as i32 } else { -(d as i32)  },  // 左半 +，右半 -
                    limit_low && d == lo, 
                    limit_high && d == hi);
            }

            // 仅当当前的数位取值不受限制时，才进行记忆化写入。因为当 limit_low 或 limit_high 任意一个为 true 时，前面递归过的路径是唯一确定的，就是 low 或 high 的前缀。这样的路径不会再被走第二遍，所以记忆化是没有意义的。
            // 而如果只考虑 (i, start, diff) 这三个参数，所对应的前面递归过来的路径可以是多条，一次记忆了可以被之后重复访问使用。所以此时做记忆化是有必要的。（此时要求 limit_low 和 limit_high 都为 false）
            if start != -1 && !limit_low && !limit_high {
                env.memo.insert(key, res);
            }

            res
        }

        dfs(&mut env, 0, -1, 0, true, true)
    }
}

struct Env {
    low: String,
    high: String,
    n: usize,
    diff_lhz: usize,
    memo: HashMap<(usize, i32, i32), i32>
}

fn main() {
    println!("{}", Solution::count_symmetric_integers(1, 100));
    println!("{}", Solution::count_symmetric_integers(1200, 1230));
}