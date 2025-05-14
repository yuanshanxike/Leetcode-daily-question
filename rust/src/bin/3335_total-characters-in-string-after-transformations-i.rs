leetcode_rust::declare_solution!();

const MOD: usize = 1e9 as usize + 7;

/**
 * 找规律：
 * 
 * aaaa
 * |  25
 * zzzz
 * |  1
 * abababab
 * |  24
 * yzyzyzyz
 * |  1
 * zabzabzabzab
 * |  1
 * abbcabbcabbcabbc
 * |  23
 * xyyzxyyzxyyzxyyz
 * | 1
 * yzzabyzzabyzzabyzzab
 * | 1
 * zababbczababbczababbczababbc
 * | 1
 * abbcbccdabbcbccdabbcbccdabbcbccd
 * 
 * 
 * b
 * | 24
 * z
 * | 1
 * ab
 * | 24
 * yz
 * | 1
 * zab
 * | 1
 * abbc
 * | 23
 * xyyz
 * | 1
 * yzzab
 * | 1
 * zababbc
 * | 1
 * abbcbccd
 * 
 * 演算一个字符'z'经历 t 次转换后的结果，从而可以快速计算 'a'~'y' 经历 t 次变化后的结果。
 * 最后分别计算 s 中每一种字符的出现次数乘上经历 t 次变化后的字符长度，累加得到最终答案。
 * 
 */
impl Solution {
    // pub fn length_after_transformations(s: String, t: i32) -> i32 {
    //     let mut cnt = [0_usize; 26];
    //     for c in s.chars() {
    //         let idx = (c as u8 - b'a') as usize;
    //         cnt[idx] += 1;
    //     }

    //     let mut alphabet_cnt = vec![[0_usize; 26]; (t + 1) as usize];
    //     alphabet_cnt[0][(b'z' - b'a') as usize] = 1;
    //     for i in 1..=(t as usize) {
    //         let z_cnt = alphabet_cnt[i - 1][25];
    //         for b in (b'a'..b'z').rev() {
    //             let idx = (b - b'a') as usize;
    //             alphabet_cnt[i][idx + 1] = alphabet_cnt[i - 1][idx];
    //         }
    //         alphabet_cnt[i][0] = z_cnt;  // a
    //         alphabet_cnt[i][1] = (alphabet_cnt[i][1] + z_cnt) % MOD;  // b
    //     }

    //     let mut ans = 0_i64;
    //     for (i, &cnt) in cnt.iter().enumerate() {
    //         let diff = 25 - i;
    //         if diff > alphabet_cnt.len() - 1 {
    //             ans = (ans + 1 * cnt as i64) % MOD as i64;
    //             continue;
    //         }

    //         ans = (ans + cnt as i64 * alphabet_cnt[t as usize - diff].iter().fold(0, |acc, &num| (acc + num) % MOD) as i64) % MOD as i64
    //     }

    //     ans as _
    // }
}

impl Solution {
    /**
     * 对上面的做法进行 空间优化：
     * 计算 'z' 经历了 t 轮转换后会变得有多长，同时需要维护最后的 26 个长度用来表示 t 轮变换后所有单个字母 'a' ~ 'z' 变换后的长度。 
     */
    pub fn length_after_transformations(s: String, t: i32) -> i32 {
        let mut cnt = [0_usize; 26];
        for c in s.chars() {
            let idx = (c as u8 - b'a') as usize;
            cnt[idx] += 1;
        }

        let mut alphabet_cnt = [[0_usize; 26]; 26];
        let mut cursor = 25_usize;
        alphabet_cnt[cursor][(b'z' - b'a') as usize] = 1;
        for _ in 1..=(t as usize) {
            let new_cursor = (cursor + 1) % 26;
            let z_cnt = alphabet_cnt[cursor][25];
            for b in b'a'..b'z' {
                let idx = (b - b'a') as usize;
                alphabet_cnt[new_cursor][idx + 1] = alphabet_cnt[cursor][idx];
            }
            alphabet_cnt[new_cursor][0] = z_cnt;  // a
            alphabet_cnt[new_cursor][1] = (alphabet_cnt[new_cursor][1] + z_cnt) % MOD;  // b

            cursor = new_cursor;
        }

        let mut ans = 0_i64;
        for (i, &cnt) in cnt.iter().enumerate() {
            if cnt == 0 { continue; }

            let diff = 25 - i;
            if diff > t as usize - 1 {
                ans = (ans + 1 * cnt as i64) % MOD as i64;
            } else {
                let idx = cursor as i32 - diff as i32;
                let idx = if idx < 0 { idx + 26 } else { idx } as usize;
                ans = (ans + cnt as i64 * alphabet_cnt[idx].iter().fold(0, |acc, &num| (acc + num) % MOD) as i64) % MOD as i64;
            }
        }

        ans as _
    }

//     /**
//      * 方法二
//      * 将 s 转换为 cnt 后，直接对 cnt 数组进行转换模拟（不如方法一快）
//      */
//     pub fn length_after_transformations(s: String, t: i32) -> i32 {
//         let mut cnt = [0_usize; 26];
//         for c in s.chars() {
//             let idx = (c as u8 - b'a') as usize;
//             cnt[idx] += 1;
//         }

//         let mut next_cnt = [0_usize; 26];
        
//         for _ in 1..=(t as usize) {
//             for (i, &cnt) in cnt.iter().enumerate() {
//                 if i == (b'z' - b'a') as usize {
//                     next_cnt[0] = cnt;  // a
//                     next_cnt[1] = (next_cnt[1] + cnt) % MOD;  // b
//                 } else {
//                     next_cnt[i + 1] = (next_cnt[i + 1] + cnt) % MOD;
//                 }
//             }

//             (cnt, next_cnt) = (next_cnt, cnt);
//             next_cnt.iter_mut().for_each(|cnt| { *cnt = 0; });
//         }
        
//         cnt.iter().fold(0, |acc: i32, &cnt| (acc + cnt as i32) % MOD as i32)
//     }

    // 方法三：以 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2] 作为第三个参数去调用 3337 的矩阵快速幂做法
}

fn main() {
    println!("{}", Solution::length_after_transformations("abcyy".to_string(), 2));
    println!("{}", Solution::length_after_transformations("azbk".to_string(), 1));
    println!("{}", Solution::length_after_transformations("aaaa".to_string(), 100_000));
}