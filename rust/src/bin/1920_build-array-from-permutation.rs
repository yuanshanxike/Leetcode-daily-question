leetcode_rust::declare_solution!();

impl Solution {
    // pub fn build_array(nums: Vec<i32>) -> Vec<i32> {
    //     nums.iter().map(|&num| nums[num as usize]).collect()
    // }

    /**
     * 方法二：
     * 数字搬家（优化空间复杂度为 O(1)）
     * https://leetcode.cn/problems/build-array-from-permutation/solutions/857713/mo-ni-by-endlesscheng-a7hu/?envType=daily-question&envId=2025-05-06
     */
    pub fn build_array(mut nums: Vec<i32>) -> Vec<i32> {
        for i in 0..nums.len() {
            let x = nums[i];
            if x < 0 {  // 已搬家
                continue;
            }
            let mut cur = i;
            while nums[cur] as usize != i {
                let nxt = nums[cur] as usize;
                nums[cur] = !nums[nxt];  // 把下一个数搬过来，同时做标记（取反）
                cur = nxt;
            }
            nums[cur] = !x;  // 对于这一组(这一轮搬家的一个圈)的最后一个数，把起点 x=nums[i] 搬过来
        }

        for i in 0..nums.len() {
            nums[i] = !nums[i];  // 复原
        }

        nums
    }
}

fn main() {
    println!("{:?}", Solution::build_array(vec![0,2,1,5,3,4]));  // [0,1,2,4,5,3]
    println!("{:?}", Solution::build_array(vec![5,0,1,2,3,4]));  // [4,5,0,1,2,3]
}