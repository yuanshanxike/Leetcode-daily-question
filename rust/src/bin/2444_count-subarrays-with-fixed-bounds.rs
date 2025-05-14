leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 枚举右，维护左
     */
    pub fn count_subarrays(nums: Vec<i32>, min_k: i32, max_k: i32) -> i64 {
        let mut ans = 0;
        let mut i0 = None;  // 上一个超出 [min_k, max_k] 范围的数字的下标
        let mut min_i = None;  // 上一个 =min_k 的数字下标
        let mut max_i = None;  // 上一个 =max_k 的数字下标

        for (r, &num) in nums.iter().enumerate() {
            if !(min_k..=max_k).contains(&num) {
                i0 = Some(r + 1);
            } else {
                if num == min_k {
                    min_i = Some(r);
                }
    
                if num == max_k {
                    max_i = Some(r);
                }
            }

            if let Some(i) = min_i {
                if let Some(j) = max_i {
                    ans += (i.min(j) as i64 - i0.unwrap_or(0) as i64 + 1).max(0);
                }
            }
        }

        ans
    }
}

fn main() {
    println!("{}", Solution::count_subarrays(vec![1,3,5,2,7,5], 1, 5));  // 2
    println!("{}", Solution::count_subarrays(vec![1,1,1,1], 1, 1));  // 10
    println!("{}", Solution::count_subarrays(vec![1,4,2,4,2,2,3,3], 2, 4));
}