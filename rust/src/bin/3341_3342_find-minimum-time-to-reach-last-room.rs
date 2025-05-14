use std::collections::BinaryHeap;

leetcode_rust::declare_solution!();

const DIRS: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

impl Solution {
    pub fn min_time_to_reach(move_time: Vec<Vec<i32>>) -> i32 {
        let n = move_time.len();
        let m = move_time[0].len();
        let mut dis = vec![vec![i32::MAX; m]; n];
        dis[0][0] = 0;
        let mut pq = BinaryHeap::<DistPos>::new();
        pq.push(DistPos(0, 0, 0));
        loop {
            if let Some(dist_pos) = pq.peek() {
                let DistPos(d, i, j) = *dist_pos;
                pq.pop();
                if i == n - 1 && j == m - 1 {
                    return d;
                }
                if d > dis[i][j] { continue; }  // 跳过之前已经更新过最短路的格子
                let time = (i + j) % 2 + 1;  // 3341 和 3342 两题的唯一区别
                for (dx, dy) in DIRS {
                    let x = i as i32 + dx;
                    let y = j as i32 + dy;
                    if (0..(n as i32)).contains(&x) && (0..(m as i32)).contains(&y) {
                        let x = x as usize;
                        let y = y as usize;
                        let new_dis = d.max(move_time[x][y]) + time as i32;
                        if new_dis < dis[x][y] {
                            dis[x][y] = new_dis;
                            pq.push(DistPos(new_dis, x, y));
                        }
                    }
                }
            }
        }
    }
}

struct DistPos(i32, usize, usize);

impl PartialOrd for DistPos {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for DistPos {
    fn eq(&self, other: &Self) -> bool {
        self.0.eq(&other.0)
    }
}

impl Ord for DistPos {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        other.0.cmp(&self.0)  // 小根堆
    }
}

impl Eq for DistPos {}

fn main() {
    println!("{}", Solution::min_time_to_reach(vec![[0,4].to_vec(),[4,4].to_vec()]));
    println!("{}", Solution::min_time_to_reach(vec![[0,0,0,0].to_vec(),[0,0,0,0].to_vec()]));
    println!("{}", Solution::min_time_to_reach(vec![[0,1].to_vec(),[1,2].to_vec()]));
}