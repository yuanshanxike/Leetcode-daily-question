use std::collections::HashMap;

leetcode_rust::declare_solution!();

impl Solution {
    pub fn num_equiv_domino_pairs(dominoes: Vec<Vec<i32>>) -> i32 {
        let mut cnt = HashMap::<(i32, i32), i32>::new();
        for vec in dominoes {
            if let &[mut a, mut b] = vec.as_slice() {
                if a > b {
                    (a, b) = (b, a);
                }
                
                // if !cnt.contains_key(&(a, b)) {
                //     cnt.insert((a, b), 1)
                // } else {

                // }

                cnt.insert((a, b), cnt.get(&(a, b)).unwrap_or(&0) + 1);

                // if let Some(val) = cnt.get_mut(&(a, b)) {
                //     *val = cnt.get(&(a, b)).unwrap_or(&0) + 1;
                // }
            };
        }

        let mut ans = 0;
        for &cnt in cnt.values() {
            if cnt > 1 {
                ans += cnt * (cnt - 1) / 2;
            }
        }

        ans
    }
}

fn main() {
    println!("{}", Solution::num_equiv_domino_pairs(vec![vec![1,2],vec![2,1],vec![3,4],vec![5,6]]));
    println!("{}", Solution::num_equiv_domino_pairs(vec![vec![1,2],vec![1,2],vec![1,1],vec![1,2],vec![2,2]]));
}