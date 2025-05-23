use std::collections::HashSet;

leetcode_rust::declare_solution!();

impl Solution {
    pub fn triangle_type(mut nums: Vec<i32>) -> String {
        nums.sort_unstable();
        if nums[0] + nums[1] <= nums[2] { return "none".to_string(); }   // 三角形任意两边之和需要大于第三边

        let mut edge = HashSet::new();
        for &num in &nums {
            edge.insert(num);
        }

        match edge.len() {
            1 => "equilateral",
            2 => "isosceles",
            3 => "scalene",
            _ => "none"
        }.to_string()
    }
}

#[test]
fn check() {
    assert_eq!(Solution::triangle_type(vec![3,3,3]), "equilateral".to_string());
    assert_eq!(Solution::triangle_type(vec![4,3,3]), "isosceles".to_string());
    assert_eq!(Solution::triangle_type(vec![3,4,5]), "scalene".to_string());
    assert_eq!(Solution::triangle_type(vec![1,4,2]), "none".to_string());
}

fn main() {}