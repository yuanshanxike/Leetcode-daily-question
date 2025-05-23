leetcode_rust::declare_solution!();

impl Solution {
    // /**
    //  * 两次遍历，常数空间
    //  */
    // pub fn sort_colors(nums: &mut Vec<i32>) {
    //     let mut color_cnt = [0, 0, 0];
    //     for num in nums.iter() {
    //         color_cnt[*num as usize] += 1;
    //     }
        
    //     let mut j = 0;
    //     for num in nums.iter_mut() {
    //         while color_cnt[j] == 0 {
    //             j += 1;
    //         }

    //         *num = j as i32;
    //         color_cnt[j] -= 1;
    //     }
    // }

    /**
     * 一次遍历，常数空间（适用于本题的特殊插入排序（每次插入至多有 3(不同元素的种数) 个位置的数字发生改变））
     * https://leetcode.cn/problems/sort-colors/solutions/3679069/on-cha-ru-pai-xu-jian-ji-xie-fa-pythonja-zk60/?envType=daily-question&envId=2025-05-17
     */
    pub fn sort_colors(nums: &mut Vec<i32>) {
        let mut p0 = 0;  // 当前有序的前缀字符串中 0 的数量
        let mut p1 = 0;  // 当前有序的前缀字符串中 0 和 1 的数量
        for i in 0..nums.len() {
            let x = nums[i];
            nums[i] = 2;

            if x <= 1 {
                nums[p1] = 1;
                p1 += 1;
            }

            if x == 0 {
                nums[p0] = 0;
                p0 += 1;
            }
        }
    }
}

#[test]
fn check() {
    let mut nums = vec![2,0,2,1,1,0];
    Solution::sort_colors(&mut nums);
    assert_eq!(nums, vec![0,0,1,1,2,2]);

    nums = vec![2,0,1];
    Solution::sort_colors(&mut nums);
    assert_eq!(nums, vec![0,1,2]);
}

fn main() {}