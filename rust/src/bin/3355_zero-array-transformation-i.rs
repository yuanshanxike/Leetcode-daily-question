leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 差分
     * 
     * 直接对区间中的数字进行 -1 会因为区间太大而超时。
     * 可以通过使用 差分数组 记录下每个元素开始的变化值（操作区间时就是对区间的第一个元素和区间之后的第一个元素进行变化），
     * 通过求前缀和恢复到原数组变化后的状态。
     */
    pub fn is_zero_array(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> bool {
        let n = nums.len();
        let mut diff = vec![0; n + 1];  // +1 防止数组下标溢出
        for q in &queries {
            let l = q[0] as usize;
            let r = q[1] as usize;
            diff[l] -= 1;      // 区间中每个元素都减 1
            diff[r + 1] += 1;  // 区间过后把减去的 1 恢复
        }

        let mut delta = 0;  // 通过前缀和恢复每一个数字
        for (i, num) in nums.iter().enumerate() {
            delta += diff[i];
            if delta + num > 0 {
                return false;
            }
        }

        true
    }
}

fn main() {
    println!("{}", Solution::is_zero_array(vec![1,0,1], vec![vec![0,2]]));
    println!("{}", Solution::is_zero_array(vec![4,3,2,1], vec![vec![1,3],vec![0,2]]));
}