use std::collections::HashMap;

leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 逆向思维：坏对数数量 = 总对数 - 好数对(i < j && j - i == nums[j] - nums[i])的数量
     * nums 中的每个元素转化为其所在的公差为 1 的等差数列的 idx = 0 处的值，并统计出现频数，用组合数计算出好数对的数量。
     */
    pub fn count_bad_pairs(nums: Vec<i32>) -> i64 {
        let n = nums.len() as i64;
        let mut cnt: HashMap<i32, i32> = HashMap::new();
        let mut goot_cnt = 0;
        for (i, &num) in nums.iter().enumerate() {
            if let Some(cnt_num) = cnt.get_mut(&(num - i as i32)) {
                goot_cnt += *cnt_num as i64;
                *cnt_num += 1
            } else {
                cnt.insert(num - i as i32, 1);
            }
        }

        n * (n - 1) / 2 - goot_cnt
    }
}

fn main() {
    println!("{}", Solution::count_bad_pairs(vec![4,1,3,3]));
    println!("{}", Solution::count_bad_pairs(vec![1,2,3,4,5]));
}