use leetcode_rust::declare_solution;

declare_solution!();

impl Solution {
    // O(2^n) 递归选或不选
    // pub fn subset_xor_sum(nums: Vec<i32>) -> i32 {
    //     let mut sum = 0;
        
    //     fn pick_xor(i: usize, nums: &Vec<i32>, xor: i32, sum: &mut i32) {
    //         if i >= nums.len() {
    //             *sum += xor;
    //             return ();
    //         }

    //         let mut xor = xor;

    //         xor ^= nums[i];  // 选
    //         pick_xor(i + 1, nums, xor, sum);
    //         xor ^= nums[i];  // 退栈时还原现场
    //         pick_xor(i + 1, nums, xor, sum);  // 不选
    //     }

    //     pick_xor(0, &nums, 0, &mut sum);

    //     sum
    // }


    // O(n) 数学做法
    pub fn subset_xor_sum(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        nums.into_iter().reduce(|or, x| or | x ).unwrap() << (n - 1)
    }
}

fn main() {
    println!("{}", Solution::subset_xor_sum(vec![1,3]));
    println!("{}", Solution::subset_xor_sum(vec![5,1,6]));
    println!("{}", Solution::subset_xor_sum(vec![3,4,5,6,7,8]));
}