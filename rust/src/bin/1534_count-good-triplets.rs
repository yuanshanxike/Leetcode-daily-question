leetcode_rust::declare_solution!();

impl Solution {
    // /**
    //  * 方法一：枚举
    //  * 时间复杂度：O(n^3)
    //  */
    // pub fn count_good_triplets(arr: Vec<i32>, a: i32, b: i32, c: i32) -> i32 {
    //     let n = arr.len();
    //     let mut cnt = 0;
    //     for i in 0..n-2 {
    //         for j in i+1..n-1 {
    //             if (arr[i] - arr[j]).abs() > a { continue; }
    //             for k in j+1..n {
    //                 if (arr[j] - arr[k]).abs() > b || (arr[i] - arr[k]).abs() > c { continue; }
    //                 cnt += 1;
    //             }
    //         }
    //     }

    //     cnt
    // }

    // /**
    //  * 方法二：前缀和
    //  * 时间复杂度：O(n(n + max(arr)))
    //  * https://leetcode.cn/problems/count-good-triplets/solutions/3622921/liang-chong-fang-fa-bao-li-mei-ju-qian-z-apcv/?envType=daily-question&envId=2025-04-14
    //  */
    // pub fn count_good_triplets(arr: Vec<i32>, a: i32, b: i32, c: i32) -> i32 {
    //     let mut ans = 0;
    //     let mx = *arr.iter().max().unwrap();
    //     let mut s = vec![0; (mx + 2) as usize];  // cnt 数组的前缀和
    //     for (j, &y) in arr.iter().enumerate() {
    //         for &z in &arr[j + 1..] {
    //             if (y - z).abs() > b {
    //                 continue;
    //             }
    //             let l = (y - a).max(z - c).max(0);
    //             let r = (y + a).min(z + c).min(mx);
    //             // 如果 l > r + 1，s[r + 1] - s[l] 可能是负数
    //             ans += 0.max(s[(r + 1) as usize] - s[l as usize])  // 通过前缀和数组快速计算区间和
    //         }
    //         // 不断去更新 j 左边数字(arr[i])出现的频数 cnt 对应的前缀和 s 
    //         for v in y+1..mx+2 {
    //             s[v as usize] += 1;  // 把 y 加到 cnt 数组中，更新所有受到影响的前缀和
    //         }
    //     }
    //     ans
    // }

    /**
     * 方法三：排序 + 枚举中间 + 三指针
     * 时间复杂度：O(n^2)
     * https://leetcode.cn/problems/count-good-triplets/solutions/3622921/liang-chong-fang-fa-bao-li-mei-ju-qian-z-apcv/?envType=daily-question&envId=2025-04-14
     */
    pub fn count_good_triplets(arr: Vec<i32>, a: i32, b: i32, c: i32) -> i32 {
        let mut idx = (0..arr.len()).collect::<Vec<_>>();
        idx.sort_unstable_by_key(|&i| arr[i]);

        let mut ans = 0;
        for &j in &idx {
            let y = arr[j];
            let mut left = vec![];
            let mut right = vec![];
            for &idx in &idx {
                if idx < j && (arr[idx] - y).abs() <= a {  // i < j && |x - y| <= a
                    left.push(arr[idx]);
                } else if idx > j && (arr[idx] - y).abs() <= b {  // j < k && |y - z| <= b
                    right.push(arr[idx]);
                }
            }

            // 对于每个 j，k1 和 k2 只会向右边单向移动
            let mut k1 = 0;
            let mut k2 = 0;
            // 内层循环时间复杂度：O(n)
            for x in left {  // 枚举出来的 x 是递增的
                // count(<= x + c)
                while k2 < right.len() && right[k2] <= x + c {
                    k2 += 1;
                }
                // count(< x - c)
                while k1 < right.len() && right[k1] < x - c {
                    k1 += 1;
                }
                ans += k2 - k1;  // add count(|x - z| <= c)
            }
        }

        ans as _
    }
}

fn main() {
    println!("{}", Solution::count_good_triplets(vec![3,0,1,1,9,7], 7, 2, 3));
    println!("{}", Solution::count_good_triplets(vec![1,1,2,2,3], 0, 0, 1));
}