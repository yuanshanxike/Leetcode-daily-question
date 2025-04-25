use std::collections::{HashMap, HashSet};

leetcode_rust::declare_solution!();

impl Solution {
    /**
     * “越长越合法”型滑动窗口
     */
    pub fn count_complete_subarrays(nums: Vec<i32>) -> i32 {
        let cnt: HashSet<_> = nums.iter().collect();
        let cnt = cnt.len();

        let mut map = HashMap::new();
        let mut l  = 0;
        let mut ans = 0;
        for (r, &num) in nums.iter().enumerate() {
            map.insert(num, *map.get(&num).unwrap_or(&0) + 1);

            while l <= r && map.len() == cnt {
                if let Some(times) = map.get_mut(&nums[l]) {
                    if *times == 1 {
                        break;
                    }

                    *times -= 1;
                    l += 1;
                }
            }

            if map.len() == cnt {
                ans += l as i32 + 1;
            }
        }

        ans
    }
}

fn main() {
    println!("{}", Solution::count_complete_subarrays(vec![1,3,1,2,2]));
    println!("{}", Solution::count_complete_subarrays(vec![5,5,5,5]));
}