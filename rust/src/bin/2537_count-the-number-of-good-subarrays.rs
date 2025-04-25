use std::collections::HashMap;

leetcode_rust::declare_solution!();

impl Solution {
    /**
     * "至少"型滑动窗口
     */
    pub fn count_good(nums: Vec<i32>, k: i32) -> i64 {
        let mut ans = 0;
        let mut comb_cnt = 0;
        let mut num_cnt = HashMap::new();
        let mut l = 0;

        let get_val_cnt = |num_cnt: &HashMap<i32, usize>, i| {
            let num = nums[i];
            let cnt = num_cnt.get(&num).unwrap_or(&0);

            (num, *cnt)
        };

        for r in 0..nums.len() {
            let (num, cnt) = get_val_cnt(&num_cnt, r);
            let cnt = cnt + 1;
            num_cnt.insert(num, cnt);
            comb_cnt += Self::combination(cnt) - Self::combination(cnt - 1); // + delta

            loop {
                let (num, cnt) = get_val_cnt(&num_cnt, l);
                let cnt = cnt - 1;
                let delta = Self::combination(cnt + 1) - Self::combination(cnt);

                if l < r && comb_cnt - delta >= k as i64 {
                    l += 1;
                    *(num_cnt.get_mut(&num).unwrap()) = cnt;

                    comb_cnt -= delta; // - delta
                } else {
                    break;
                }
            }

            if comb_cnt >= k as i64 { ans += (l + 1) as i64; } // r 越小越能满足
        }

        ans
    }

    // C(n 2)
    fn combination(n: usize) -> i64 {
        if n < 2 {
            return 0;
        }
        let n = n as i64;
        n * (n - 1) / 2
    }
}

fn main() {
    println!("{}", Solution::count_good(vec![1, 1, 1, 1, 1], 10));
    println!("{}", Solution::count_good(vec![3, 1, 4, 3, 2, 2, 4], 2));
    println!("{}", Solution::count_good(vec![3, 1, 4, 3, 2, 2, 4], 1));
}
