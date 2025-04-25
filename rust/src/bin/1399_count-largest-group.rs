leetcode_rust::declare_solution!();

// /**
//  * 暴力枚举
//  */
// impl Solution {
//     pub fn count_largest_group(n: i32) -> i32 {
//         let mut ans = 0;
//         let mut max_len = 0;
//         let mut digit_sum_cnt = std::collections::HashMap::<u16, usize>::new();
//         for mut i in 1..=(n as u16) {
//             let mut digit_sum = 0_u16;
//             while i > 0 {
//                 digit_sum += i % 10;
//                 i /= 10;
//             }digit_s
//             let cnt = *um_cnt.get(&digit_sum).unwrap_or(&0) + 1;
//             digit_sum_cnt.insert(digit_sum, cnt);
//             if cnt > max_len {
//                 max_len = cnt;
//                 ans = 1;
//             } else if cnt == max_len {
//                 ans += 1;
//             }
//         }

//         ans
//     }
// }



// use std::collections::HashMap;

/**
 * 数位 dp
 */
// impl Solution {
//     pub fn count_largest_group(n: i32) -> i32 {
//         let m = n.to_string().len();

//         fn dfs(env: &mut Env, i: usize, is_limited: bool, target: i16) -> i32 {
//             if i == env.m { return if target == 0 { 1 } else { 0 }; }

//             let key = (i, target);

//             if !is_limited && env.memo.contains_key(&key) {  // 这里如果不限制 !is_limited 的话，其他更大的 target 在使用 memo 的缓存进行计算时会出错
//                 return env.memo[&key];
//             }

//             let upper = if is_limited { env.n / 10_i32.pow((env.m - i) as u32 - 1) % 10 } else { 9 } as i16;

//             let mut cnt = 0;

//             for d in 0..=upper.min(target) {
//                 cnt += dfs(env, i + 1, is_limited && d == upper, target - d);
//             }

//             if !is_limited {
//                 env.memo.insert(key, cnt);
//             }

//             return cnt
//         }

//         let mut env = Env {
//             m,
//             n,
//             memo: HashMap::new()
//         };

//         let mut ans = 0;
//         let mut max_len = 0;
//         for t in 1..=(9 * m) {  // m 个 9 的和
//             let cnt = dfs(&mut env, 0, true, t as i16);
//             if cnt > max_len {
//                 max_len = cnt;
//                 ans = 1;
//             } else if cnt == max_len {
//                 ans += 1;
//             }
//         }

//         ans
//     }
// }

// struct Env {
//     m: usize,
//     n: i32,
//     memo: HashMap<(usize, i16), i32>
// }

impl Solution {
    pub fn count_largest_group(n: i32) -> i32 {
        let m = n.to_string().len();

        fn dfs(env: &mut Env, i: usize, is_limited: bool, target: i16) -> i32 {
            if i == env.m { return if target == 0 { 1 } else { 0 }; }

            if !is_limited && env.memo[i][target as usize] != -1 {  // 这里如果不限制 !is_limited 的话，其他更大的 target 在使用 memo 的缓存进行计算时会出错
                return env.memo[i][target as usize];
            }

            let upper = if is_limited { env.n / 10_i32.pow((env.m - i) as u32 - 1) % 10 } else { 9 } as i16;

            let mut cnt = 0;

            for d in 0..=upper.min(target) {
                cnt += dfs(env, i + 1, is_limited && d == upper, target - d);
            }

            if !is_limited {
                env.memo[i][target as usize] = cnt;
            }

            return cnt
        }

        let mut env = Env {
            m,
            n,
            memo: vec![vec![-1; 9 * m + 1]; m]
        };

        let mut ans = 0;
        let mut max_len = 0;
        for t in 1..=(9 * m) {  // m 个 9 的和
            let cnt = dfs(&mut env, 0, true, t as i16);
            if cnt > max_len {
                max_len = cnt;
                ans = 1;
            } else if cnt == max_len {
                ans += 1;
            }
        }

        ans
    }
}

struct Env {
    m: usize,
    n: i32,
    memo: Vec<Vec<i32>>
}

fn main() {
    println!("{}", Solution::count_largest_group(13));
    println!("{}", Solution::count_largest_group(2));
    println!("{}", Solution::count_largest_group(15));
    println!("{}", Solution::count_largest_group(24));
}