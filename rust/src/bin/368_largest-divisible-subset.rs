use leetcode_rust::declare_solution;

declare_solution!();

impl Solution {
    pub fn largest_divisible_subset(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut nums = nums;
        nums.sort();
        let mut lds_arr = vec![vec![]; n];
        let empty_vec = vec![];
        let mut ans_idx = 0;
        for i in 0..n {
            let mut pre_nums = &empty_vec;
            for j in 0..i {
                if nums[i] % nums[j] == 0 && lds_arr[j].len() > pre_nums.len() {
                    pre_nums = &lds_arr[j];
                }
            }
            lds_arr[i] = pre_nums.clone();
            lds_arr[i].push(nums[i]);

            if lds_arr[i].len() > lds_arr[ans_idx].len() {
                ans_idx = i
            }
        }

        lds_arr[ans_idx].clone()
    }
}

fn main() {
    println!("{:?}", Solution::largest_divisible_subset(vec![1,2,3]));
    println!("{:?}", Solution::largest_divisible_subset(vec![1,2,4,8]));
    println!("{:?}", Solution::largest_divisible_subset(vec![2,3]));
    println!("{:?}", Solution::largest_divisible_subset(vec![5,9,18,54,108,540,90,180,360,720]));
}