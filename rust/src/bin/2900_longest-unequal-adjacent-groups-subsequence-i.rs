leetcode_rust::declare_solution!();

impl Solution {
    pub fn get_longest_subsequence(words: Vec<String>, groups: Vec<i32>) -> Vec<String> {
        let mut last_group = -1;
        let mut ans = Vec::new();
        for (i, word) in words.into_iter().enumerate() {
            if groups[i] != last_group {
                ans.push(word);
                last_group = groups[i];
            }
        }

        ans


        // let mut current_group = -1;

        // words.into_iter().enumerate().filter(|(i, _)| {
        //     let last_group = current_group;
        //     current_group = groups[*i];
        //     last_group != current_group
        // }).map(|(_, word)| word).collect()
    }
}

fn main() {
    println!("{:?}", Solution::get_longest_subsequence(vec!["e".to_string(), "a".to_string(), "b".to_string()], vec![0, 0, 1]));
}