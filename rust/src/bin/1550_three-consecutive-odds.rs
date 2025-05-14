leetcode_rust::declare_solution!();

impl Solution {
    pub fn three_consecutive_odds(arr: Vec<i32>) -> bool {
        arr.windows(3).any(|win| { win.iter().all(|&num| num % 2 == 1) })
    }

    // /**
    //  * 方法二：
    //  * “越长越满足型”滑动窗口
    //  */
    // pub fn three_consecutive_odds(arr: Vec<i32>) -> bool {
    //     let mut l = 0;
    //     for (r, &num) in arr.iter().enumerate() {
    //         if num % 2 == 0 {
    //             l = r;  // 奇数子数组被偶数元素中断时需要跳过
    //             continue;
    //         }

    //         while l < r && arr[l] % 2 == 0 {
    //             l += 1;
    //         }

    //         if r - l + 1 >= 3 {
    //             return true; }
    //     }
    //     false
    // }
}

fn main() {
    println!("{}", Solution::three_consecutive_odds(vec![2,6,4,1]));
    println!("{}", Solution::three_consecutive_odds(vec![1,2,34,3,4,5,7,23,12]));
}