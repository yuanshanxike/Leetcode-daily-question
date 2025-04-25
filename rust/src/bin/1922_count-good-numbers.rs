leetcode_rust::declare_solution!();

impl Solution {
    const MOD: i32 = 1e9 as i32 + 7;

    // const PRIME_DIGITS: [u8; 4] = [2, 3, 5, 7];

    // /**
    //  * 题目看错 ❌
    //  * 数位 dp
    //  */
    // pub fn count_good_numbers(n: i64) -> i32 {
    //     let mut memo = [0_i32; 16];

    //     let env = (n, &mut memo);

    //     fn dfs(env: (i64, &mut [i32; 16]), i: usize) -> i32 {
    //         let (n, memo) = env;

    //         if i >= n.to_string().len() { return 1; }

    //         if memo[i] > 0 {
    //             return memo[i];
    //         }

    //         let mut cnt = 0_i32;
    //         if i % 2 == 0 {
    //             for _ in (0..=9).step_by(2) {
    //                 cnt = (cnt + dfs((n, memo), i + 1)) % Solution::MOD
    //             }
    //         } else {
    //             for _ in Solution::PRIME_DIGITS {
    //                 cnt = (cnt + dfs((n, memo), i + 1)) % Solution::MOD
    //             }
    //         }

    //         memo[i] = cnt;

    //         cnt
    //     }

    //     dfs(env, 0)
    // }

    const CNT_EVEN_DIGIT: i64 = 5;  // [0, 2, 4, 6, 8]

    const CNT_PRIME_DIGIT: i64 = 4;  // [2, 3, 5, 7]

    /**
     * 快速幂
     */
    pub fn count_good_numbers(n: i64) -> i32 {
        // let mut ans = 1_i64;
        // for i in 0..n {
        //     ans = ans * (if i % 2 == 0 { Solution::CNT_EVEN_DIGIT } else { Solution::CNT_PRIME_DIGIT }) % Solution::MOD as i64;
        // }

        // ans as i32

        let odd_cnt = n / 2;
        let even_cnt = n / 2 + n % 2;

        let mut even_power = Solution::CNT_EVEN_DIGIT;
        let mut prime_power = Solution::CNT_PRIME_DIGIT;

        let mut ans = 1_i64;

        let bin_len = 64 - odd_cnt.leading_zeros().min(even_cnt.leading_zeros());

        for i in 0..bin_len {
            if (even_cnt >> i) & 1 == 1 {
                ans = (ans * even_power) % Solution::MOD as i64;
            }

            if (odd_cnt >> i) & 1 == 1 {
                ans = (ans * prime_power) % Solution::MOD as i64;
            }

            even_power = (even_power * even_power) % Solution::MOD as i64;
            prime_power = (prime_power * prime_power) % Solution::MOD as i64;
        }

        ans as i32
    }
}

fn main() {
    println!("{}", Solution::count_good_numbers(1));
    println!("{}", Solution::count_good_numbers(4));
    println!("{}", Solution::count_good_numbers(50));
    println!("{}", Solution::count_good_numbers(1e10 as i64));
}