use std::i32;

leetcode_rust::declare_solution!();

/**
 * 关键知识点：
 * 1.XOR 的逆运算是其自身（满足对合运算）；
 * 2.在任意图中，度数为奇数的点必然有偶数个。
 * 
 * 上述的第 1 点说明：对任意一个节点（值为 val）的奇数条边执行 1 次操作，该点的值变为 val XOR k；对其偶数条边执行 1 次操作，该点的值不变。
 * 结合上述的两点，可以推断出：节点值发生改变的节点数必然有偶数个。
 * 
 * 同时我们知道：3.树中的任意两个节点，必然存在唯一的一条路径连接它们。
 * 而且题目也说到可以操作任意次，那么我们每次可以选择树中的任意两个节点，对这两个节点间的唯一路径上的所有边进行操作。
 * 这两个端点的值必然会改变(XOR k)，其它路径中的节点的值不会发生改变。
 * 
 * （有趣的是不需要使用题目提供的 edges 参数）
 */
impl Solution {
    // /**
    //  * 我们可以没枚举 nums 中 0，2，4，... 个节点发生改变(XOR k)，然后计算这些节点值的和，取最大值。
    //  * 
    //  * 枚举过程可以使用记忆化搜索来实现。
    //  */
    // pub fn maximum_value_sum(nums: Vec<i32>, k: i32, edges: Vec<Vec<i32>>) -> i64 {
    //     let n = nums.len();
    //     let xor_nums = nums.iter().map(|x| x ^ k).collect::<Vec<i32>>();

    //     let mut memo = vec![vec![-1; n + 1]; n + 1];

    //     fn dfs(nums: &Vec<i32>, xor_nums: &Vec<i32>, m: usize, i: usize, memo: &mut Vec<Vec<i64>>) -> i64 {
    //         // 选或不选

    //         if i == nums.len() {
    //             return if m == 0 { 0 } else { i64::MIN };  // 指定数量(偶数 m)的数字发生了变化才会去统计结果
    //         }

    //         if memo[i][m] != -1 {
    //             return memo[i][m];
    //         }

    //         let mut res = i64::MIN;
    //         if m > 0 {
    //             res = res.max(xor_nums[i] as i64 + dfs(nums, xor_nums, m - 1, i + 1, memo));
    //         }

    //         res = res.max(nums[i] as i64 + dfs(nums, xor_nums, m, i + 1, memo));

    //         memo[i][m] = res;

    //         res
    //     }

    //     let mut ans = 0;
    //     for m in (0..=n).step_by(2) {
    //         ans = ans.max(dfs(&nums, &xor_nums, m, 0, &mut memo));
    //     }

    //     ans
    // }

    /**
     * 由于本题给出的 n 的范围是 [2..=2 * 10^4], 上述方法的 memo 所开辟的数组会 oom，时间复杂度上也可能超时
     * 
     * 方法二：贪心代替动态规划
     * 
     * 设想这样一个场景：从一个数组中选出偶数个数字，使得它们的和最大。
     * 显然，我们可以对这个数组进行排序，然后尽可能多地从最大值开始，选择尽可能多的偶数个正数（至多包含一个非正数）求和即为答案。
     * （也可以不排序，一次遍历中维护 最小的正数元素的值、最大非正数值 和 正数元素的数量，并累加所有正数元素，视正数元素的数量来看是否需要 减去最小正数的值 或 多加上一个最大非正数值）
     * 
     * 本题也可以得到这样一个数组，就是用异或后的 xor_nums 中的元素分别减去对应 nums 中元素得到 gain 数组，
     * 然后就是求 gain 数组中的最大偶数个元素之和。
     */
    pub fn maximum_value_sum(nums: Vec<i32>, k: i32, _: Vec<Vec<i32>>) -> i64 {
        let gaines = nums.iter().map(|x| (x ^ k) - x).collect::<Vec<i32>>();

        let mut max_non_pos_gain = i32::MIN;
        let mut min_pos_gain = i32::MAX;
        let mut pos_gain_cnt = 0_usize;
        let mut pos_gain_sum = 0;
        for &gain in &gaines {
            if gain > 0 {
                min_pos_gain = min_pos_gain.min(gain);
                pos_gain_cnt += 1;
                pos_gain_sum += gain as i64;
            } else {
                max_non_pos_gain = max_non_pos_gain.max(gain);
            }
        }

        let sum: i64 = nums.iter().map(|&x| x as i64).sum();

        sum + pos_gain_sum + if pos_gain_cnt % 2 == 0 { 0 } else { max_non_pos_gain.max(-min_pos_gain) as i64 }
    }
}

#[test]
fn check() {
    assert_eq!(Solution::maximum_value_sum(vec![24,78,1,97,44], 6, vec![vec![0,2], vec![1,2], vec![4,2], vec![3,4]]), 260);
}

fn main() {
    println!("{}", Solution::maximum_value_sum(vec![1,2,1], 3, vec![vec![0, 1], vec![0, 2]]));
    println!("{}", Solution::maximum_value_sum(vec![2,3], 7, vec![vec![0, 1]]));
    println!("{}", Solution::maximum_value_sum(vec![7,7,7,7,7,7], 3, vec![vec![0, 1], vec![0, 2], vec![0, 3], vec![0, 4], vec![0, 5]]));
}