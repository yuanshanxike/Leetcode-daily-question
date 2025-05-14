leetcode_rust::declare_solution!();

// impl Solution {
//     pub fn find_even_numbers(digits: Vec<i32>) -> Vec<i32> {
//         let mut env = Env {
//             record: [false; 1000],
//             picked_idxes: vec![false; digits.len()],
//             digits
//         };
//         fn dfs(env: &mut Env, num: i32, i: usize) {
//             for j in 0..env.digits.len() {
//                 if i == 3 {
//                     env.record[num as usize] = true;
//                     return;
//                 }

//                 if env.picked_idxes[j] { continue; }

//                 let d = env.digits[j];

//                 let mut track = || {
//                     (*env.picked_idxes)[j] = true;
//                     dfs(env, num * 10 + env.digits[j], i + 1);
//                     // 恢复现场
//                     env.picked_idxes[j] = false;
//                 };

//                 match i {
//                     0 => if d != 0 {  // 保证不能有前导0
//                         track();
//                     },
//                     1 => track(),
//                     2 => if d % 2 == 0 {  // 保证是偶数
//                         track();
//                     },
//                     _ => ()
//                 }
//             }
//         }

//         dfs(&mut env, 0, 0);
//         (100..=999)
//             .filter(|&num| env.record[num])
//             .map(|num| num as i32).collect()
//     }
// }

// struct Env {
//     record: [bool; 1000],
//     picked_idxes: Vec<bool>,
//     digits: Vec<i32>
// }

/**
 * 方法二
 * 将计算规模降到 10^3
 * https://leetcode.cn/problems/finding-3-digit-even-numbers/solutions/1139403/mei-ju-suo-you-san-wei-shu-ou-shu-by-end-8n7d/?envType=daily-question&envId=2025-05-12
 */
impl Solution {
    pub fn find_even_numbers(digits: Vec<i32>) -> Vec<i32> {
        let mut cnt = [0; 10];
        for d in digits {
            cnt[d as usize] += 1;
        }

        // i=0 百位，i=1 十位，i=2 个位，x 表示当前正在构造的数字
        fn dfs(i: usize, x: i32, cnt: &mut [i32; 10], ans: &mut Vec<i32>) {
            if i == 3 {
                ans.push(x);
                return;
            }
            for d in 0..10 {
                if cnt[d] > 0 && (i == 0 && d > 0 || i == 1 || i == 2 && d % 2 == 0) {
                    cnt[d] -= 1; // 消耗一个数字 d
                    dfs(i + 1, x * 10 + d as i32, cnt, ans);
                    cnt[d] += 1; // 复原
                }
            }
        }
        let mut ans = vec![];
        dfs(0, 0, &mut cnt, &mut ans);
        ans
    }
}

fn main() {
    println!("{:?}", Solution::find_even_numbers(vec![2,1,3,0]));
    println!("{:?}", Solution::find_even_numbers(vec![2,2,8,8,2]));
    println!("{:?}", Solution::find_even_numbers(vec![3,7,5]));
    println!("{:?}", Solution::find_even_numbers(vec![5,7,2,4,8,2,6,6,0,9]));
}