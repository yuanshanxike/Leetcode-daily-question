leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 「越长越合法」型滑动窗口
     */
    pub fn count_subarrays(nums: Vec<i32>, k: i32) -> i64 {
        let mut ans = 0;
        let max = *nums.iter().max().unwrap_or(&0);
        let mut l = 0;
        let mut cnt = 0;
        for (r, &num) in nums.iter().enumerate() {
            if num == max {
                cnt += 1;
            }

            // 得到刚好不合法的 l，则 l 左边的任意 idx 为左边界的字数组都是合法的，这些字数组的数量是 l
            while l <= r && cnt >= k {
                if nums[l] == max {
                    cnt -= 1;
                }
                l += 1;
            }

            ans += l as i64;
        }

        ans
    }
}

fn main() {
    println!("{}", Solution::count_subarrays(vec![1,3,2,3,3], 2));
    println!("{}", Solution::count_subarrays(vec![1,4,2,1], 3));
    println!("{}", Solution::count_subarrays(vec![61,23,38,23,56,40,82,56,82,82,82,70,8,69,8,7,19,14,58,42,82,10,82,78,15,82], 2));
}