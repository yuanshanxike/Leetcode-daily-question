leetcode_rust::declare_solution!();

impl Solution {
    // /**
    //  * 前缀和 + 枚举右，二分查找左(子数组越短越满足)
    //  * 时间复杂度：O(n*longN)
    //  */
    // pub fn count_subarrays(nums: Vec<i32>, k: i64) -> i64 {
    //     // let mut i = 0;
    //     // nums.iter().reduce(|&acc, &e| {
    //     //     nums[i] = acc + e;
    //     //     &nums[i]
    //     // }).unwrap_or(&0);
    //     // let s = nums.iter().fold(0, |acc, e| acc + e);

    //     // 前缀和
    //     let mut s = vec![0];
    //     for (i, &num) in nums.iter().enumerate() {
    //         s.push(num as i64 + s[i]);
    //     }
        
    //     let mut ans = 0;
    //     // 枚举右
    //     for (r, &s1) in s.iter().enumerate() {
    //         let r0= r;
    //         // 二分查找左
    //         let mut l = 0;
    //         let mut r = r;
    //         // (l, r]
    //         while l < r {
    //             let mid = (l + r) / 2;
                
    //             if ((s1 - s[mid]) * (r0 - mid) as i64) < k {
    //                 r = mid;
    //             } else {
    //                 l = mid + 1;
    //             }
    //         }

    //         ans += (r0 - l) as i64;
    //     }

    //     ans
    // }

    /**
     * 方法二：
     * 「越短越合法」型滑动窗口
     */
    pub fn count_subarrays(nums: Vec<i32>, k: i64) -> i64 {
        let mut l = 0;
        let mut sum = 0_i64;
        let mut ans = 0;
        for (r, &num) in nums.iter().enumerate() {
            sum += num as i64;
            while sum * (r - l + 1) as i64 >= k {
                sum -= nums[l] as i64;
                l += 1;
            }

            ans += (r - l + 1) as i64
        }

        ans
    }
}

fn main() {
    println!("{}", Solution::count_subarrays(vec![2,1,4,3,5], 10));
    println!("{}", Solution::count_subarrays(vec![1,1,1], 5));
}