leetcode_rust::declare_solution!();

impl Solution {
    pub fn count_subarrays(nums: Vec<i32>) -> i32 {
        let mut i: usize = 1;
        let mut ans = 0;
        while i < nums.len() - 1 {
            if nums[i] == 2 * (nums[i - 1] + nums[i + 1]) {
                ans += 1;
            }
            i += 1;
        }

        ans
    }
}

fn main() {
    println!("{}", Solution::count_subarrays(vec![1,2,1,4,1]));
    println!("{}", Solution::count_subarrays(vec![1,1,1]));
    println!("{}", Solution::count_subarrays(vec![7,8,-3]));
}