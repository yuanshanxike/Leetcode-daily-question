use std::collections::HashSet;

leetcode_rust::declare_solution!();

impl Solution {
    pub fn min_operations(nums: Vec<i32>, k: i32) -> i32 {
        let mut set = HashSet::new();
        set.insert(k);
        for num in &nums {
            if *num >= k {
                set.insert(*num);
            } else {
                return -1;
            }
        }

        set.len() as i32 - 1
    }
}

fn main() {
    println!("{}", Solution::min_operations(vec![5,2,5,4,5], 2));
    println!("{}", Solution::min_operations(vec![2,1,2], 2));
    println!("{}", Solution::min_operations(vec![9,7,5,3], 1));
}