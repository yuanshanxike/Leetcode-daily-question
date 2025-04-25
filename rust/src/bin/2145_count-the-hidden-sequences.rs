leetcode_rust::declare_solution!();

impl Solution {
    pub fn number_of_arrays(differences: Vec<i32>, lower: i32, upper: i32) -> i32 {
        let mut delta = 0_i64;
        let mut min = 0_i64;
        let mut max = 0_i64;
        for diff in differences {
            delta += diff as i64;
            min = min.min(delta);
            max = max.max(delta);
        }

        ((upper - lower) as i64 - (max - min) + 1).max(0) as _
    }
}

fn main() {
    println!("{}", Solution::number_of_arrays(vec![1,-3,4], 1, 6));
    println!("{}", Solution::number_of_arrays(vec![3,-4,5,1,-2], -4, 5));
    println!("{}", Solution::number_of_arrays(vec![4,-7,2], 3, 6));
}