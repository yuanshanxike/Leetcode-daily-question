leetcode_rust::declare_solution!();

impl Solution {
    // /**
    //  * 方法一：
    //  * 差分 + 二分答案
    //  * k 越大越能变成 零数组
    //  */
    // pub fn min_zero_array(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> i32 {
    //     let m = queries.len();

    //     if nums.iter().sum::<i32>() == 0 { return 0; } // 特判全为 0 的数组

    //     // 左闭右开区间二分
    //     let mut l = 0;
    //     let mut r = m;
    //     while l < r {
    //         let mid = (l + r) / 2;

    //         if Solution::check(&nums, &queries, mid) {
    //             r = mid;
    //         } else {
    //             l = mid + 1;
    //         }
    //     }

    //     if r < m { r as i32 + 1 } else { -1 }
    // }

    // // leetcode 3355
    // fn check(nums: &Vec<i32>, queries: &Vec<Vec<i32>>, k: usize) -> bool {
    //     let n = nums.len();
    //     // 计算 queries[0..=mid] 查询后的差分数组
    //     let mut diff = vec![0; n + 1];
    //     for q in &queries[..=k] {
    //         let [l, r, val] = q[..=2] else { todo!() };
    //         diff[l as usize] -= val;
    //         diff[r as usize + 1] += val;
    //     }

    //     // 还原差分数组为每个元素的 delta 并作用于 nums 的变化
    //     let mut delta = 0;
    //     for (i, &num) in nums.iter().enumerate() {
    //         delta += diff[i];

    //         if num + delta > 0 {
    //             return false;
    //         }
    //     }

    //     true
    // }


    /**
     * 方法二：
     * 双指针（因为题目的要求顺序处理 queries 的前 k 项）+ 差分
     */
    pub fn min_zero_array(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> i32 {
        let n = nums.len();
        let m = queries.len();
        let mut delta = 0;
        let mut k= 0;

        let mut diff = vec![0; n + 1];  // 差分数组 (在双指针移动的过程中进行计算)
        
        for (i, &num) in nums.iter().enumerate() {
            delta += diff[i];

            while num + delta > 0 && k < m {
                // 当前使用的查询不能得到零数组，需要按顺序使用新查询
                let [l, r, val] = queries[k][..=2] else { todo!() };
                let l = l as usize;
                let r = r as usize;

                // 更新差分数组
                diff[l as usize] -= val;
                diff[r as usize + 1] += val;

                // 判断当前查询是否覆盖当前下标
                if (l..=r).contains(&i) {
                    delta -= val;
                }

                k += 1;
            }

            if num + delta > 0 && k == m { return -1; }  // 所有查询均被使用，且不能得到零数组
        }

        return k as _;
    }
}

#[test]
fn check() {
    assert_eq!(Solution::min_zero_array(vec![2, 0, 2], vec![[0, 2, 1].to_vec(), [0, 2, 1].to_vec(), [1, 1, 3].to_vec()]), 2);
    assert_eq!(Solution::min_zero_array(vec![4, 3, 2, 1], vec![[1, 3, 2].to_vec(), [0, 2, 1].to_vec()]), -1);
    assert_eq!(Solution::min_zero_array(vec![5],vec![[0, 0, 5].to_vec(),[0, 0, 1].to_vec(),[0, 0, 3].to_vec(),[0, 0, 2].to_vec()]), 1);
    assert_eq!(Solution::min_zero_array(vec![0],vec![[0, 0, 2].to_vec(),[0, 0, 4].to_vec(),[0, 0, 4].to_vec(),[0, 0, 3].to_vec(), [0, 0, 5].to_vec()]), 0);
}

fn main() {
    println!("{}", Solution::min_zero_array(vec![2, 0, 2],vec![[0, 2, 1].to_vec(), [0, 2, 1].to_vec(), [1, 1, 3].to_vec()]));
    println!("{}", Solution::min_zero_array(vec![4, 3, 2, 1], vec![[1, 3, 2].to_vec(), [0, 2, 1].to_vec()]));
    println!("{}", Solution::min_zero_array(vec![5],vec![[0, 0, 5].to_vec(),[0, 0, 1].to_vec(),[0, 0, 3].to_vec(),[0, 0, 2].to_vec()]));
    println!("{}", Solution::min_zero_array(vec![0],vec![[0, 0, 2].to_vec(),[0, 0, 4].to_vec(),[0, 0, 4].to_vec(),[0, 0, 3].to_vec(), [0, 0, 5].to_vec()]));
}
