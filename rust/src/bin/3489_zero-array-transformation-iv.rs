use std::i32;

leetcode_rust::declare_solution!();

const MAX_K: usize = 1001;

impl Solution {
    /**
     * 转换为 0/1 背包问题
     */
    pub fn min_zero_array(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> i32 {
        let n = nums.len();
        let mut add_map = vec![vec![]; n];
        for (idx, q) in queries.iter().enumerate() {
            let [l, r, val] = q[..3] else { todo!() };
            let l = l as usize;
            let r = r as usize;

            for i in l..=r {
                add_map[i].push((val, idx));
            }
        }

        let mut ans = -1;

        // 对于每个 nums 分别计算 0/1 背包 (使用滚动数组)
        for (i, &num) in nums.iter().enumerate() {
            if num == 0 { continue; }  // 对于 nums 中值为 0 的元素，只需要 k = 0

            let mut dp0 = vec![MAX_K; num as usize + 1];
            let mut dp1 = vec![MAX_K; num as usize + 1];

            let add_arr = &add_map[i];
            if add_arr.len() == 0 {
                if num == 0 { continue; } else { return -1; }
            }

            if let Some(dp0_elem) = dp0.get_mut(add_arr[0].0 as usize) {
                *dp0_elem = add_arr[0].1;
            }

            for &(add, idx) in &add_arr[1..] {
                if let Some(dp1_elem) = dp1.get_mut(add as usize) {
                    *dp1_elem = idx.min(*dp1_elem);
                }
                for (val, &k) in dp0.iter().enumerate() {
                    dp1[val] = dp0[val].min(dp1[val]);  // 对滚动数组中的新数组的中元素默认置为 与dp0对应元素相同的值的最小值

                    if k == MAX_K { continue; }

                    if val as i32 + add <= num {
                        dp1[val + add as usize] = dp1[val + add as usize].min(idx);
                    }
                }

                (dp0, dp1) = (dp1, dp0);

                if dp0[num as usize] != MAX_K { break; }
            }

            // 所有区间用完依然不能够使得该 num 变为 0，则返回 -1
            if dp0[num as usize] == MAX_K {
                return -1;
            } else {
                ans = ans.max(dp0[num as usize] as i32);  // nums 中需要 k 最大的元素是瓶颈
            }
        }

        ans + 1
    }
}

fn main() {
    println!("{}", Solution::min_zero_array(vec![2,0,2], vec![vec![0,2,1], vec![0,2,1], vec![1,1,3]]));
    println!("{}", Solution::min_zero_array(vec![4,3,2,1], vec![vec![1,3,2], vec![0,2,1]]));
    println!("{}", Solution::min_zero_array(vec![1,2,3,2,1], vec![vec![0,1,1], vec![1,2,1], vec![2,3,2], vec![3,4,1], vec![4,4,1]]));
    println!("{}", Solution::min_zero_array(vec![1,2,3,2,6], vec![vec![0,1,1], vec![0,2,1], vec![1,4,2], vec![4,4,4], vec![3,4,1], vec![4,4,5]]));
    println!("{}", Solution::min_zero_array(vec![8,9,8], vec![vec![2,2,10], vec![1,2,4], vec![1,2,4], vec![2,2,2], vec![2,2,2], vec![2,2,10]]));
    println!("{}", Solution::min_zero_array(vec![0], vec![vec![0,0,1]]));
}