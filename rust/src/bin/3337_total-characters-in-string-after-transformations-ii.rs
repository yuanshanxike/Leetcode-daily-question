leetcode_rust::declare_solution!();

// const MOD: usize = 1e9 as usize + 7;
const MOD: i64 = 1e9 as i64 + 7;

impl Solution {
    // pub fn length_after_transformations(s: String, t: i32, nums: Vec<i32>) -> i32 {
    //     let mut cnt = [0_usize; 26];
    //     for c in s.chars() {
    //         let idx = (c as u8 - b'a') as usize;
    //         cnt[idx] += 1;
    //     }

    //     let mut next_cnt = [0_usize; 26];
        
    //     for _ in 1..=(t as usize) {
    //         for (i, &cnt) in cnt.iter().enumerate() {
    //             for delta in 1..=(nums[i] as usize) {
    //                 next_cnt[(i + delta) % 26] = (next_cnt[(i + delta) % 26] + cnt) % MOD;
    //             }
    //         }

    //         (cnt, next_cnt) = (next_cnt, cnt);
    //         next_cnt.iter_mut().for_each(|cnt| { *cnt = 0; });
    //     }

    //     cnt.iter().fold(0, |acc, &cnt| (acc + cnt as i32) % MOD as i32)
    // }

    /**
     * 将上面（超时）做法中每次直接通过 nums[i] 去影响 cnt[i+1..=i+nums[i]] 中值做法反过来，
     * 根据 nums 预计算一个转换矩阵 matrix，矩阵的第 i 行表示下一次变换 s 中的第 i 位字符，是由其他哪些字符变换而来。
     * 这样就可以通过 cnt(向量) x matrix(变换矩阵)来计算出一次变换后的 cnt。
     * 那么，多次变换可以根据乘法结合律，先计算多个矩阵相乘的结果（可以使用时矩阵的快速幂进行加速）得到最终的变换矩阵，然后直接用这个最终变换矩阵去乘 cnt 就能得到最终的数量分布。
     */
    pub fn length_after_transformations(s: String, t: i32, nums: Vec<i32>) -> i32 {
        let mut cnt = [0_i64; 26];
        for c in s.chars() {
            let idx = (c as u8 - b'a') as usize;
            cnt[idx] += 1;
        }

        let mut matrix = [[0; 26]; 26];
        for (i, &num) in nums.iter().enumerate() {
            for j in 1..=(num as usize) {
                matrix[(i + j) % 26][i] = 1;  // cnt 中，i 后面的 nums[i] 个数受第 i 个数的影响
            }
        }

        let matrix = Matrix(matrix);
        let t= t as usize;
        let matrix = matrix.qpow(t);
        cnt = matrix * cnt;

        cnt.iter().fold(0, |acc, &cnt| (acc + cnt as i32) % MOD as i32)
    }
}

use std::ops::Mul;

struct Matrix([[i64; Self::N]; Self::N]);

impl Mul for &Matrix {
    type Output = Matrix;

    fn mul(self, rhs: &Self::Output) -> Self::Output {
        let Matrix(a) = self;
        let Matrix(b) = rhs;
        let mut res = [[0; Matrix::N]; Matrix::N];
        for i in 0..Matrix::N {
            for j in 0..Matrix::N {
                res[i][j] = a[i].iter().enumerate().fold(0, |acc, (k, &a)| (acc + a * b[k][j]) % MOD);
            }
        }

        Matrix(res)
    }
}

impl Mul<[i64; Matrix::N]> for Matrix {
    type Output = [i64; Matrix::N];

    fn mul(self, rhs: [i64; Matrix::N]) -> Self::Output {
        let Matrix(a) = self;
        let mut res = [0; Self::N];
        for i in 0..Matrix::N {
            res[i] = a[i].iter().enumerate().fold(0, |acc, (j, &a)| (acc + a * rhs[j]) % MOD);
        }

        res
    }
}

impl Matrix {
    const N: usize = 26;

    fn qpow(mut self, mut t: usize) -> Matrix {
        // 初始化一个单位矩阵
        let mut res = [[0; Self::N]; Self::N];
        res.iter_mut().enumerate().for_each(|(i, num)| num[i] = 1);
        let mut res = Matrix(res);
        // 快速幂
        while t > 0 {
           if t % 2 == 1 {
               res = &res * &self;
           }
           self = &self * &self;
           t >>= 1;
        }

        res
    }
}

fn main() {
    println!("{}", Solution::length_after_transformations("abcyy".to_string(), 2, vec![1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]));
    println!("{}", Solution::length_after_transformations("azbk".to_string(), 1, vec![2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]));
    println!("{}", Solution::length_after_transformations("abcyyabcyyabcyyzzzfdfsaserwr".to_string(), 1000000000, vec![2,2,2,2,2,2,24,2,2,2,24,24,24,2,2,2,2,2,2,2,2,2,2,2,2,2]));
}