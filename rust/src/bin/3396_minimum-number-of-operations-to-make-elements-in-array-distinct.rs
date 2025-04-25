use std::collections::HashSet;

leetcode_rust::declare_solution!();

impl Solution {
    pub fn minimum_operations(nums: Vec<i32>) -> i32 {
        let mut set = HashSet::new();
        let mut enable_len = 0_i32;
        for num in nums.iter().rev() {
            if !set.contains(num) {
                set.insert(num);
                enable_len += 1;
            } else { break; }
        }

        (nums.len() as i32 - enable_len + 2) / 3  // ceil
    }
}

fn main() {
    println!("{}", Solution::minimum_operations(vec![1,2,3,4,2,3,3,5,7]));
    println!("{}", Solution::minimum_operations(vec![4,5,6,4,4]));
    println!("{}", Solution::minimum_operations(vec![6,7,8,9]));
}