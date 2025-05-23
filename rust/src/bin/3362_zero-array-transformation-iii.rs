use std::{collections::BinaryHeap, ops::Not};

leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 贪心 + 最大堆 + 差分数组
     * https://leetcode.cn/problems/zero-array-transformation-iii/solutions/2998650/tan-xin-zui-da-dui-chai-fen-shu-zu-pytho-35o6/?envType=daily-question&envId=2025-05-22
     */
    pub fn max_removal(nums: Vec<i32>, mut queries: Vec<Vec<i32>>) -> i32 {
        queries.sort_by(|a, b | a[0].cmp(&b[0]));  // 查询按左端点从小到大排序，以方便使用双指针遍历 nums 和左端点 <= i 的区间
        let n = nums.len();
        let mut j = 0;
        let mut delta = 0;
        let mut diff = vec![0; n + 1];
        let mut pq = BinaryHeap::<i32>::new();  // 维护区间右端点的大根堆
        
        for (i, &num) in nums.iter().enumerate() {
            delta += diff[i];
            // 维护左端点 <= i 的区间
            while j < queries.len() && queries[j][0] as usize <= i {
                pq.push(queries[j][1]);
                j += 1;
            }

            // 选择右端点最大的区间
            while delta < num && pq.is_empty().not() && *pq.peek().unwrap() as usize >= i {
                delta += 1;  // 通过消耗当前右端点最大的查询来增大 delta
                diff[pq.pop().unwrap() as usize + 1] -= 1;  // 应用区间需要更新差分数组的右端点后一位处的值（不用更新差分数组左端点处的值，因为我们取的区间的左端点是 <= i 的，差分的变化值已经作用到了 delta 上）
            }

            // 如果没办法对当前元素置 0，则直接返回 -1
            if num > delta {
                return -1;
            }
        }

        pq.len() as _  // 优先队列中剩余的元素都可以被删除
    }
}

fn main() {
    println!("{}", Solution::max_removal(vec![2,0,2], vec![vec![0,2], vec![0,2], vec![1,1]]));
    println!("{}", Solution::max_removal(vec![1,1,1,1], vec![vec![1,3], vec![0,2], vec![1,3], vec![1,2]]));
    println!("{}", Solution::max_removal(vec![1,2,3,4], vec![vec![0,3]]));
}