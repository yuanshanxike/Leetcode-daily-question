leetcode_rust::declare_solution!();

use std::cmp::Ordering::*;

const L: char = 'L';
const R: char = 'R';
const DOT: char = '.';

impl Solution {
    pub fn push_dominoes(dominoes: String) -> String {
        let states = dominoes.chars().collect::<Vec<char>>();
        let mut dist_arr = vec![usize::MAX; states.len()];

        let mut ans = vec![DOT; states.len()];
        
        let mut last_l_idx = None;
        for (i, &sta) in states.iter().rev().enumerate() {
            // println!("i: {}", i);
            match sta {
                L => last_l_idx = Some(i),
                DOT => {
                    if !last_l_idx.is_none() {
                        let last_l_idx = last_l_idx.unwrap();
                        dist_arr[states.len() - 1 - i] = i - last_l_idx;
                    }
                },
                R => last_l_idx = None,
                _ => {}
            }
        }

        let mut last_r_idx = None;
        for (i, &sta) in states.iter().enumerate() {
            match sta {
                R => {
                    ans[i] = sta;
                    last_r_idx = Some(i);
                },
                DOT => {
                    let l_dist = dist_arr[i];
                    let r_dist =  if last_r_idx.is_none() { usize::MAX } else { i - last_r_idx.unwrap() };
                    match l_dist.cmp(&r_dist) {
                        Less => ans[i] = L,
                        Greater => ans[i] = R,
                        Equal => ans[i] = DOT
                    }
                },
                L => {
                    ans[i] = sta;
                    last_r_idx = None;
                },
                _ => {}
            }
        }

        ans.iter().collect()
    }
}

fn main() {
    println!("{}", Solution::push_dominoes(String::from("RR.L")));
    println!("{}", Solution::push_dominoes(String::from(".L.R...LR..L..")));
}