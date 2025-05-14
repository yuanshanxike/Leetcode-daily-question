leetcode_rust::declare_solution!();

impl Solution {
    pub fn min_sum(nums1: Vec<i32>, nums2: Vec<i32>) -> i64 {
        let mut min_sum1 = 0_i64;
        let mut min_sum2 = 0_i64;
        let mut mutable1 = false;
        let mut mutable2 = false;

        for num in nums1 {
            if num == 0 {
                min_sum1 += 1;
                mutable1 = true;
            } else {
                min_sum1 += num as i64
            }
        }

        for num in nums2 {
            if num == 0 {
                min_sum2 += 1;
                mutable2 = true;
            } else {
                min_sum2 += num as i64
            }
        }

        if min_sum1 > min_sum2 && !mutable2 || min_sum1 < min_sum2 && !mutable1 {
            -1
        } else {
            min_sum1.max(min_sum2)
        }
    }
}

fn main() {
    println!("{}", Solution::min_sum(vec![3,2,0,1,0], vec![6,5,0]));
    println!("{}", Solution::min_sum(vec![2,0,2,0], vec![1,4]));
}