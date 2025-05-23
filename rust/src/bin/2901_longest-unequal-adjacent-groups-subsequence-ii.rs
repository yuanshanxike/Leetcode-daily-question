use std::collections::HashMap;

leetcode_rust::declare_solution!();

impl Solution {
    // /**
    //  * dp
    //  */
    // pub fn get_words_in_longest_subsequence(words: Vec<String>, groups: Vec<i32>) -> Vec<String> {
    //     let n = words.len();
    //     let mut dp: Vec<(String, usize)> = vec![];  // dp[i] 表示 0..i 中以 words[i] 结尾的合法序列为 s，且每个单词的长度为 m. 记忆 (s, m)
    //     for i in 0..n {
    //         let mut s = String::new();
    //         let m = words[i].len();
    //         for j in 0..i {
    //             let prefix = &dp[j].0;
    //             if words[j].len() == m && groups[j] != groups[i] {
    //                 let mut hamming_dist = 0;
    //                 for (k, c) in words[i].char_indices() {
    //                     if c != words[j].chars().nth(k).unwrap() {
    //                         hamming_dist += 1;
    //                     }

    //                     if hamming_dist > 1 { break; }
    //                 }

    //                 if hamming_dist == 1 && prefix.len() > s.len() {
    //                     s = prefix.clone();
    //                 }
    //             }
    //         }
    //         s.push_str(&words[i][..]);
    //         dp.push((s, m));
    //     }

    //     let mut max_s = None;
    //     let mut max_m = 0;
    //     let mut max_slice_len = 0;
    //     for (s, m) in dp.iter() {
    //         let slice_len = s.len() / m;
    //         if slice_len > max_slice_len {
    //             max_s = Some(s);
    //             max_m = *m;
    //             max_slice_len = slice_len;
    //         }
    //     }

    //     let max_s = max_s.unwrap();
    //     max_s.chars().enumerate().step_by(max_m).map(|(i, _)| max_s[i..(i + max_m)].to_string()).collect()
    // }

    /**
     * 值域 dp
     * 时间复杂度：O(nl)，其中 n 是 words 的长度，l≤10 为 words[i] 的长度。这是线性时间复杂度，与输入量成正比。
     * https://leetcode.cn/problems/longest-unequal-adjacent-groups-subsequence-ii/solutions/2482844/zi-xu-lie-dp-de-si-kao-tao-lu-pythonjava-kmaf/?envType=daily-question&envId=2025-05-16
     */
    pub fn get_words_in_longest_subsequence(words: Vec<String>, groups: Vec<i32>) -> Vec<String> {
        let n = words.len();
        let mut f_map = HashMap::<i64, FMap>::new();
        let mut from = vec![0_usize; n];
        let mut global_max_f = 0;
        let mut max_i = 0;
        for i in (0..=n-1).rev() {
            let w = &words[i];
            let g = groups[i];

            // 计算 w 的哈希值
            let mut hash = 0_i64;
            for c in w.chars() {
                hash = (hash << 5) | (c as i64 & 31);
            }

            let mut f = 0;
            for k in 0..w.len() {
                let h = hash | (31 << (k * 5)); // 用记号笔把 w[k] 涂黑（置为 11111），表示 '?'
                if let Some(FMap{ max_f, j, max_f2, j2 }) = f_map.get_mut(&h) {
                    if g != groups[*j] {  // 可以从最大值转移过来
                        if *max_f > f {
                            f = *max_f;
                            from[i] = *j;
                        }
                    } else {  // 只能从次大值转移过来
                        if *max_f2 > f {
                            f = *max_f2;
                            from[i] = *j2;
                        }
                    }
                }
            }

            f += 1;
            if f > global_max_f {
                global_max_f = f;
                max_i = i;
            }

            // 用 f 更新 f_map[h] 的最大次大
            // 注意要保证最大次大的 group 值不同
            for k in 0..w.len() {
                let h = hash | (31 << (k * 5));
                if !f_map.contains_key(&h) {
                    f_map.insert(h, FMap {max_f: 0, j: 0, max_f2: 0, j2:0 });
                }
                let FMap{ max_f, j, max_f2, j2 } = f_map.get_mut(&h).unwrap();
                if f > *max_f {  // 最大值需要更新
                    if g != groups[*j] {
                        *max_f2 = *max_f;  // 旧最大值变成次大值
                        *j2 = *j;
                    }
                    *max_f = f;
                    *j = i;
                } else if f > *max_f2 && g != groups[*j2] { // 次大值需要更新
                    *max_f2 = f;
                    *j2 = i;
                }
            }
        }

        let mut ans = vec![];
        let mut i = max_i;
        for _ in 0..global_max_f {
            ans.push(words[i].clone());
            i = from[i];
        }

        ans
    }
}

struct FMap {
    max_f: i32,
    j: usize,
    max_f2: i32,
    j2: usize
}

fn main() {
    println!("{:?}", Solution::get_words_in_longest_subsequence(["bab","dab","cab"].iter().map(|str| str.to_string()).collect(), vec![1,2,2]));
    println!("{:?}", Solution::get_words_in_longest_subsequence(["a","b","c","d"].iter().map(|str| str.to_string()).collect(), vec![1,2,3,4]));
}