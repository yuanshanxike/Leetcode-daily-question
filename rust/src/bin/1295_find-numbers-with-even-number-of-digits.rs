leetcode_rust::declare_solution!();

impl Solution {
    pub fn find_numbers(nums: Vec<i32>) -> i32 {
        nums.into_iter().fold(0, |cnt, num| cnt + if num.to_string().len() % 2 == 0 {1} else {0})
    }
}

fn main() {
    println!("{}", Solution::find_numbers(vec![12,345,2,6,7896]));
    println!("{}", Solution::find_numbers(vec![555,901,482,1771]));
}