leetcode_rust::declare_solution!();

impl Solution {
    pub fn min_domino_rotations(tops: Vec<i32>, bottoms: Vec<i32>) -> i32 {
        let n= tops.len();
        let mut cnt = [(0_usize, 0_usize, 0_usize); 7];
        let mut max_len = 0;
        for (i, &top) in tops.iter().enumerate() {
            let bottom = bottoms[i];

            let (top_len, top_cnt, keep_bottom_cnt) = cnt[top as usize];
            let (bottom_len, keep_top_cnt, bottom_cnt) = cnt[bottom as usize];

            if top == bottom {
                cnt[top as usize] = (top_len + 1, top_cnt + 1, bottom_cnt + 1);
            } else {
                cnt[top as usize] = (top_len + 1, top_cnt + 1, keep_bottom_cnt);
                cnt[bottom as usize] = (bottom_len + 1, keep_top_cnt, bottom_cnt + 1);
            }

            max_len = (top_len + 1).max(bottom_len + 1).max(max_len);
        }

        if max_len < n { return -1; }

        (1..=6).fold(i32::MAX, |min, dot_num| -> i32 {
            let (len, top_cnt, bottom_cnt) = cnt[dot_num];
            if len == n {
                min.min((len - top_cnt) as i32).min((len - bottom_cnt) as i32)
            } else {
                min
            }
        })
    }
}

fn main() {
    println!("{}", Solution::min_domino_rotations(vec![2,1,2,4,2,2], vec![5,2,6,2,3,2]));
    println!("{}", Solution::min_domino_rotations(vec![3,5,1,2,3], vec![3,6,3,3,4]));
    println!("{}", Solution::min_domino_rotations(vec![6,1,6,4,6,6], vec![5,6,2,6,3,6]));
}