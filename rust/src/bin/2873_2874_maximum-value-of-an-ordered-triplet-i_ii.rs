use leetcode_rust::declare_solution;

declare_solution!();

impl Solution {
    // 方法一：枚举 j
    // pub fn maximum_triplet_value(nums: Vec<i32>) -> i64 {
    //     let n = nums.len();
    //     let mut suf = vec![0; n];

    //     let mut max = i32::MIN;
    //     for (i, num) in nums.iter().enumerate().rev() {
    //         max = max.max(* num);
    //         suf[i] = max;
    //     }

    //     let mut max_i = nums[0] as i64;
    //     let mut ans: i64 = 0;
    //     for j in 1..n-1 {
    //         let a = (max_i - nums[j] as i64) * suf[j + 1] as i64;
    //         ans = ans.max(a);
    //         max_i = max_i.max(nums[j] as i64)
    //     }

    //     ans
    // }

    // 方法二：枚举 k
    pub fn maximum_triplet_value(nums: Vec<i32>) -> i64 {
        let mut max_i = nums[0];
        let mut max_diff = i32::MIN;
        let mut ans = 0;
        for k in 2..nums.len() {
            max_diff = max_diff.max(max_i - nums[k - 1]);
            ans = ans.max(max_diff as i64 * nums[k] as i64);
            max_i = max_i.max(nums[k - 1])
        }

        ans
    }
}


pub fn main() {
    println!("{}", Solution::maximum_triplet_value(vec![12,6,1,2,7]));
    println!("{}", Solution::maximum_triplet_value(vec![1,10,3,4,19]));
    println!("{}", Solution::maximum_triplet_value(vec![1,2,3]));
}