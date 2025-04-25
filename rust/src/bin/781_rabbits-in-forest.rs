leetcode_rust::declare_solution!();

impl Solution {
    pub fn num_rabbits(mut answers: Vec<i32>) -> i32 {
        answers.sort();
        let mut last_ans = 0;
        let mut same_remain = 0;
        let mut min_cnt = 0;
        for ans in answers {
            if ans == last_ans && same_remain > 0 {
                min_cnt += 1;
                same_remain -= 1;
            } else {
                min_cnt += same_remain + 1;
                same_remain = ans;
            }

            last_ans = ans;
        }

        min_cnt + same_remain
    }
}

fn main() {
    println!("{}", Solution::num_rabbits(vec![1,1,2]));
    println!("{}", Solution::num_rabbits(vec![10,10,10]));
}