use leetcode_rust::declare_solution;

declare_solution!();

impl Solution {
    /**
     * 方法一
     * 时间复杂度：O(n^2 * target)
     * 时间复杂度解释：总共有 n * target 个状态，每个状态的处理需要遍历至多i个元素（i为当前索引）。因此，总时间复杂度为O(n² × target)。
     */
    // pub fn can_partition(nums: Vec<i32>) -> bool {
    //     let n = nums.len();
    //     let mut nums = nums;
    //     nums.sort();
    //     // let nums: Vec<u32> = nums.iter().map(|&num| num as u32).collect();
    //     let sum: i32 = nums.iter().sum();
    //     if sum % 2 == 1 { return false; }
    //     let target = sum / 2;

    //     let mut prefix_sum = 0;
    //     let mut check_idx = 0;
    //     for (i, &num) in nums.iter().enumerate() {
    //         prefix_sum += num;

    //         if prefix_sum >= target {
    //             check_idx = i;
    //             break;
    //         }
    //     }

    //     let mut memo = vec![vec![-1_i8; (target + 1) as usize]; n];  // -1: 未确定；0：不能；1：可以

    //     fn can_complement(i: usize, target: i32, nums: &Vec<i32>, memo: &mut Vec<Vec<i8>>) -> bool {
    //         if nums[i] > target { return false; }
    //         if memo[i][target as usize] != -1 { return memo[i][target as usize] == 1; }

    //         if target == nums[i] {
    //             memo[i][target as usize] = 1;
    //             return true;
    //         } else {  // target > nums[i]
    //             let mut can = false;
    //             for j in (0..i).rev() {
    //                 can |= can_complement(j, target - nums[i], nums, memo);
    //             }
    //             memo[i][target as usize] = if can { 1 } else { 0 };
    //             return can;
    //         }
    //     }

    //     let mut ans = false;
    //     for i in check_idx..n {
    //         ans |= can_complement(i, target, &nums, &mut memo);
    //     }

    //     ans
    // }

    /**
     * 方法二：0|1 背包
     * 时间复杂度：O(n * target)
     * 
     * dfs(i, target) 表示在 [i, n) 中选取一部分数字能否使得这些数字的和为 target.
     * 状态转移方程：dfs(i, target) = dfs(i + 1, target - nums[i]) | dfs(i + 1, target)
     *                                          ^^^ 选第 i 个数                ^^^ 不选第 i 个数
     * 边界情况：dfs(i = *, 0 < target) = false, dfs(i = *, 0) = true
     */
    // pub fn can_partition(nums: Vec<i32>) -> bool {
    //     let n = nums.len();
    //     let sum: i32 = nums.iter().sum();
    //     if sum % 2 == 1 { return false; }
    //     let target = sum / 2;

    //     fn dfs(i: usize, target: i32, nums: &[i32], memo: &mut [Vec<i8>]) -> bool {
    //         if target < 0 { return false; }
    //         if i >= nums.len() { return target == 0 }
    //         if memo[i][target as usize] != -1 { return memo[i][target as usize] == 1; }

    //         if target == 0 {
    //             memo[i][target as usize] = 1;
    //             true
    //         } else {  // target > 0
    //             let can = dfs(i + 1, target - nums[i], nums, memo) | dfs(i + 1, target, nums, memo);
    //             memo[i][target as usize] = if can { 1 } else { 0 };
    //             can
    //         }
    //     }

    //     let mut memo = vec![vec![-1; target as usize + 1]; n]; // -1: 未确定；0：不能；1：可以

    //     dfs(0, target, &nums, &mut memo)
    // }

    /**
     * 递推写法 (空间优化)
     */
    pub fn can_partition(nums: Vec<i32>) -> bool {
        let s = nums.iter().sum::<i32>();
        if s % 2 != 0 {
            return false;
        }
        let s = s as usize / 2;
        let mut f: Vec<bool> = vec![false; s + 1];
        f[0] = true;
        let mut s2 = 0;
        for x in nums {
            let x = x as usize;
            s2 = (s2 + x).min(s);
            for j in (x..=s2).rev() {
                f[j] |= f[j - x];  // 对应上面递归做法的 f[j] = f[i] || f[j - x]，表示选或不选
            }
            if f[s] {
                return true;
            }
        }
        false
    }
}

fn main() {
    println!("{}", Solution::can_partition(vec![1, 5, 11, 5]));
    println!("{}", Solution::can_partition(vec![1, 2, 3, 5]));
    println!("{}", Solution::can_partition(vec![100,100,99,97]));
    println!("{}", Solution::can_partition(vec![5,3,2,2,2,2,2,2,2]));
    println!("{}", Solution::can_partition(vec![100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,99,97]));
}