leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 转化为前缀和 + 枚举右维护左
     * https://leetcode.cn/problems/count-of-interesting-subarrays/solutions/2424063/qian-zhui-he-ha-xi-biao-fu-ti-dan-by-end-74bb/?envType=daily-question&envId=Invalid%20Date
     * s[r]−s[l] 与 k 关于模 modulo 同余。由于模运算加减法封闭，可以移项，得
     * (s[r]−s[l]) mod modulo = k mod modulo  =>  (s[r]−k) mod modulo = s[l] mod modulo
     */
    pub fn count_interesting_subarrays(nums: Vec<i32>, modulo: i32, k: i32) -> i64 {
        let nums = nums.iter().map(|num| if num % modulo == k { 1 } else { 0 }).collect::<Vec<_>>();
        let mut cnt_map = vec![0; (modulo as usize).min(nums.len() + 1)];
        cnt_map[0] = 1;  // 单独统计 s[0] = 0
        let mut pre = 0;  // s[r]
        let mut ans = 0;
        let k = k as usize;
        for num in nums {
            pre += num as usize;

            if pre >= k {
                ans += cnt_map[(pre - k) % modulo as usize] as i64;
            }
            
            cnt_map[pre % modulo as usize] += 1;
        }

        ans
    }
}

fn main() {
    println!("{}", Solution::count_interesting_subarrays(vec![3,2,4], 2, 1));
    println!("{}", Solution::count_interesting_subarrays(vec![3,1,9,6], 3, 0));
}