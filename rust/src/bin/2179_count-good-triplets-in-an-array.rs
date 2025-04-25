leetcode_rust::declare_solution!();

impl Solution {
    /**
     * （通过置换）转换成严格递增子序列 + 枚举中间 + (值域)树状数组
     * https://leetcode.cn/problems/count-good-triplets-in-an-array/solutions/1277695/deng-jie-zhuan-huan-shu-zhuang-shu-zu-by-xmyd/?envType=daily-question&envId=2025-04-15
     */
    pub fn good_triplets(nums1: Vec<i32>, nums2: Vec<i32>) -> i64 {
        let n = nums1.len();
        // 将 nums1 通过置换 P(x) 映射到有序数组
        let mut p = vec![0; n];
        for (i, &num) in nums1.iter().enumerate() {
            p[num as usize] = i;
        }

        let mut ans = 0_i64;
        let mut  t = FenwickTree::new(n);
        // 枚举中间
        for i in 0..n-1 {  // 注意树状数组维护的范围是 [1, n - 1]
            let y = p[nums2[i] as usize];  // 通过 P(x) 来置换 nums2 中的元素
            let less = t.pre(y);  // 置换后，求 i 左边的比中间数字小的元素数量
            ans += less * ((n - 1 - y) as i64 - (i as i64 - less));  // 乘法原理：i 左边小于 y 的数量 * i 右边大于 y 的数量 = 当前 i 为中间数时好三元祖的数量
            t.update((y + 1) as i32, 1);  // 将当前值更新到树状数组中
        }

        ans
    }
}

struct FenwickTree {
    tree: Vec<i64>
}

impl FenwickTree {
    fn new(n: usize) -> Self {
        Self { tree: vec![0; n + 1] }
    }

    fn update(&mut self, mut i: i32, val: i64) {
        while (i as usize) < self.tree.len() {
            self.tree[i as usize] += val;
            i += i & -i
        }
    }

    fn pre(&self, mut i: usize) -> i64 {
        let mut res = 0;
        while i > 0 {
            res += self.tree[i];
            i &= i - 1;  // 等价于 i -= i & -i
        }
        res
    }
}

fn main() {
    println!("{}", Solution::good_triplets(vec![2,0,1,3], vec![0,1,2,3]));
    println!("{}", Solution::good_triplets(vec![4,0,1,3,2], vec![4,1,0,2,3]));
}