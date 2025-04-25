use std::{collections::HashSet, usize};

leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 数位 dp (其实枚举就足够了，没有任何 dp 的优势) + 组合数学
     * 递归构造一个 n 位的 k 回文整数，然后不重不漏地求它的合法数位排列数量，关键是不能重复。
     */
    // pub fn count_good_integers(n: i32, k: i32) -> i64 {
    //     let memo: HashSet<i64> = HashSet::new();  // 必须记录整个回文串，不能只记录一半
    //     // 如果只记录一半，n 为奇数时是会有问题的。例如：
    //     // 22322 和 23232，如果只记录一半（包括中间数位，不包括的话会统计遗漏）就是 223 和 232，排序后为都是 223。
    //     // 其实它们所包含的 2 和 3 数量是不同的，整串的回文排序后分别是 22223 和 22233 是不同的。此时有如果在 set 中只放入回文串左边的一半是会统计遗漏的。

    //     let mut env = Env {
    //         n: n as usize, k: k as u8, memo
    //     };

    //     fn dfs(env: &mut Env, i: usize, palindrome: i64, is_start: bool) -> i64 {
    //         let Env { n, k, memo } = env;

    //         if i == *n {
    //             if palindrome % *k as i64 == 0 && !memo.contains(&Solution::sort_digit(palindrome)) {
    //                 memo.insert(Solution::sort_digit(palindrome));

    //                 let mut zero_cnt = 0;
    //                 let mut digit_cnt = [0_u8; 10];
    //                 for digit in palindrome.to_string().chars() {
    //                     if digit == '0' {
    //                         zero_cnt += 1;
    //                     }
    //                     digit_cnt[(digit as u8 - b'0') as usize] += 1;
    //                 }

    //                 let mut cnt = Solution::combin(*n - zero_cnt, 1) * Solution::factorial(*n - 1);  // 首位选择非零的数字，后面剩余的数位进行全排列

    //                 for d in 0..=9 {
    //                     cnt /= Solution::factorial(digit_cnt[d] as usize);  // 去除相同数位全排列的重复项影响
    //                 }

    //                 return cnt;
    //             } else {
    //                 return 0;
    //             }
    //         }

    //         let lo = if is_start { 1_i64 } else { 0 };

    //         let mut cnt = 0_i64;
    //         let is_left = i < (*n + 1) / 2;

    //         if is_left {
    //             for d in lo..=9 {
    //                 cnt += dfs(env, i + 1, palindrome * 10 + d, false);
    //             }
    //         } else {
    //             let d = palindrome.to_string().as_bytes()[*n - 1 - i] - b'0';
    //             cnt = dfs(env, i + 1, palindrome * 10 + (d as i64), false);
    //         }

    //         cnt
    //     }

    //     dfs(&mut env, 0, 0, true)
    // }

    /**
     * 简化代码逻辑：
     * 直接暴力枚举左半部分 + 组合数学
     */
    pub fn count_good_integers(n: i32, k: i32) -> i64 {
        let left_end = n as usize / 2;
        let mut set: HashSet<i64> = HashSet::new();
        let start = 10_i32.pow(left_end as u32 - (if n % 2 == 0 { 1 } else { 0 }));
        let end = start * 10;

        let mut ans = 0_i64;

        for num in start..end {
            let mut num = num.to_string();
            let suf_num = String::from(&num[0..left_end]).chars().rev().collect::<String>();
            num.push_str(&suf_num[..]);

            let mut num = num.parse().unwrap();
            let sorted_num: i64 = Self::sort_digit(num);
            if num % k as i64 == 0 && !set.contains(&sorted_num) {
                set.insert(sorted_num);
                let mut digit_cnt = [0_u8; 10];
                let mut zero_cnt: usize = 0;

                while num > 0 {
                    let d = (num % 10) as u8;
                    digit_cnt[d as usize] += 1;
                    if d == 0 {
                        zero_cnt += 1;
                    }
                    num /= 10;
                }

                let mut cnt = Self::combin(n as usize - zero_cnt, 1) * Self::factorial(n as usize - 1);  // 首位选择非零的数字，后面剩余的数位进行全排列
                for d in 0..=9 {
                    cnt /= Self::factorial(digit_cnt[d] as usize)  // 去除相同数位全排列的重复项影响
                }
                ans += cnt;
            }
        }

        ans
    }

    fn sort_digit(mut palindrome: i64) -> i64 {
        let mut digit_vec: Vec<u8> = vec![];
        while palindrome > 0 {
            digit_vec.push((palindrome % 10) as u8);
            palindrome /= 10;
        }

        digit_vec.sort();

        for d in digit_vec {
            palindrome *= 10;
            palindrome += d as i64;
        }

        palindrome
    }

    fn combin(n: usize, m: usize) -> i64 {
        let mut a = 1_i64;
        let mut b = 1_i64;
        for i in 1..=n {
            if i <= m {
                b *= i as i64;
            }

            if i > n - m {
                a *= i as i64;
            }
        } 
        
        a / b
    }

    fn factorial(n: usize) -> i64 {
        let mut res = 1_i64;
        for i in 2..=n {
            res *= i as i64;
        }
        res
    }
}

// struct Env {
//     n: usize,
//     k: u8,
//     memo: HashSet<i64>
// }

fn main() {
    println!("{}", Solution::count_good_integers(3, 5));  // 27
    println!("{}", Solution::count_good_integers(1, 4));  // 2
    println!("{}", Solution::count_good_integers(1, 1));  // 9
    println!("{}", Solution::count_good_integers(5, 6));  // 2468
    println!("{}", Solution::count_good_integers(5, 7));  // 2665
    println!("{}", Solution::count_good_integers(10, 5));  // 19284856
    println!("{}", Solution::count_good_integers(10, 1));  // 41457024
    println!("{}", Solution::count_good_integers(4, 1));  // 252
}