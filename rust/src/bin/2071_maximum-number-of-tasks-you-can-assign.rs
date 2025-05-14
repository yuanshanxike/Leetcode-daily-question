use std::collections::VecDeque;

leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 二分答案 + 贪心匹配 + 双端队列
     * https://leetcode.cn/problems/maximum-number-of-tasks-you-can-assign/solutions/3655745/er-fen-da-an-tan-xin-pi-pei-shuang-duan-avcrj/?envType=daily-question&envId=2025-05-02
     */
    pub fn max_task_assign(mut tasks: Vec<i32>, mut workers: Vec<i32>, pills: i32, strength: i32) -> i32 {
        tasks.sort_unstable();
        workers.sort_unstable();
        let m = workers.len();

        let check = |k: usize| -> bool {
            // 贪心：用最强的 k 名工人，完成最简单的 k 个任务
            let mut valid_tasks = VecDeque::new();
            let mut pills = pills;
            let mut i = 0;
            for &w in &workers[m - k..m] {
                // 在吃药的情况下，把能完成的任务记录到 valid_tasks 中
                while i < k && tasks[i] <= w + strength {
                    valid_tasks.push_back(tasks[i]);
                    i += 1;
                }
                if valid_tasks.is_empty() {
                    return false;  // 即使吃药也无法完成任务
                }
                if w >= *valid_tasks.front().unwrap() {
                    valid_tasks.pop_front();  // 无需吃药就能完成（最简单的）任务
                    continue;  // 跳过吃药
                }
                if pills == 0 {
                    return false;  // 药没了
                }
                pills -= 1;  // 吃药
                valid_tasks.pop_back();  // 吃药后，完成（能完成的）最难的任务
            }

            true
        };

        let mut left = 0;  // 一定可以完成 0 个任务
        let mut right = tasks.len().min(m) + 1;  // 没有足够的任务或者工人，一定无法满足要求
        // (left, right)
        while left + 1 < right {
            let mid = left + (right - left) / 2;
            if check(mid) {
                left = mid;
            } else {
                right = mid;
            }
        }
        left as _
    }
}

fn main() {
    println!("{}", Solution::max_task_assign(vec![3,2,1], vec![0,3,3], 1, 1));
    println!("{}", Solution::max_task_assign(vec![5,4], vec![0,0,0], 1, 5));
    println!("{}", Solution::max_task_assign(vec![10,15,30], vec![0,10,10,10,10], 3, 10));
}