leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 因为本质上只是从 nums 中选取两个数字求和，比较区间。
     * 这两个数字交换位置后不会影响结果，所以可以先对数组进行排序。也就是说如果排序后选取的任意两个数对应着排序前的下标 i,j，满足 i > j && lower - nums[i] <= nums[j] <= upper - nums[i])。此时，可以通过交换 i 和 j 的位置来使得 i < j && lower - nums[j] <= nums[i] <= upper - nums[j]
     * 
     * 排序 + 枚举右 + (二分查找区间)维护左
     */
    pub fn count_fair_pairs(mut nums: Vec<i32>, lower: i32, upper: i32) -> i64 {
        let mut ans = 0;
        nums.sort();
        for (j, &num) in nums.iter().enumerate() {
            let low = nums[..j].partition_point(|&x| x < lower - num) as i64;
            let high = nums[..j].partition_point(|&x| x <= upper - num) as i64;
            ans += high - low;
        }

        ans
    }
}

fn main() {
    println!("{}", Solution::count_fair_pairs(vec![0,1,7,4,4,5], 3, 6));
    println!("{}", Solution::count_fair_pairs(vec![1,7,9,2,5], 11, 11));
}