leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 单调栈
     * 将雨水积水平面根据纵坐标所在水平线进行切割，每次统计一个落差的横条面积
     */
    pub fn trap(height: Vec<i32>) -> i32 {
        let mut ans = 0;
        let mut mono_stack: Vec<usize> = vec![];
        for (i, &h) in height.iter().enumerate() {
            let mut last_pop_h = 0;
            let mut cnt = || {
                while height[*(mono_stack.last()?)] <= h {
                    let p = mono_stack.pop()?;
                    ans += (height[p] - last_pop_h) * (i - p - 1) as i32;
                    last_pop_h = height[p];
                }

                ans += (h - last_pop_h) * (i - mono_stack.last()? - 1) as i32;

                Some(())
            };

            cnt();
            mono_stack.push(i);
        }

        ans
    }
}

#[test]
fn check() {
    assert_eq!(Solution::trap(vec![0,1,0,2,1,0,1,3,2,1,2,1]), 6);
    assert_eq!(Solution::trap(vec![0,1,0,2,0,0,0,3,2,1,2,1]), 8);
    assert_eq!(Solution::trap(vec![4,2,0,3,2,5]), 9);
}

fn main() {
    println!("{}", Solution::trap(vec![0,1,0,2,1,0,1,3,2,1,2,1]));
    println!("{}", Solution::trap(vec![0,1,0,2,0,0,0,3,2,1,2,1]));
    println!("{}", Solution::trap(vec![4,2,0,3,2,5]));
}