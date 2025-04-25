leetcode_rust::declare_solution!();

impl Solution {
    /**
     * 可以以后缀为基础，构造“强大整数”。
     * 但一个一个数去构造的话，如果给定的 [start, finish] 范围很大的话会超时。
     * 
     * 仔细思考，可以发现：如果去掉每个“强大整数”的后缀部分，这些 [start, finish] 中的“强大整数”就是连续的 limit + 1 进制的数字。
     * 所以关键就是找到这些 limit + 1 数字在给定范围内的最大值和最小值。
     */
    pub fn number_of_powerful_int(start: i64, finish: i64, limit: i32, s: String) -> i64 {
        let limit: u8 = limit as u8;
        let n = s.len();

        // 先确认范围内的第一个“强大整数” first
        let mut first: i64 = s.parse().unwrap();
        if start > first {
            let md = 10_i64.pow(n as u32);
            first += start / md * md;
            let digit_cnt =  start.to_string().len();
            // 每一位都变成了 limit 进制
            let mut overflow = first < start;
            let mut max_overflow_idx = n;
            for i in n..digit_cnt {
                if Self::digit_at(&first, i) > limit {
                    if let Ok(_) = Self::modify_digit_at(&mut first, i, 0) {
                        overflow = true;
                        max_overflow_idx = i;
                    }
                } else if overflow {
                    let digit = Self::digit_at(&first, i);
                    let new_digit = (digit + 1) % (limit + 1);
                    if let Ok(_) = Self::modify_digit_at(&mut first, i, new_digit) {
                        if new_digit != 0 {
                            overflow = false;
                        } else {
                            max_overflow_idx = i;
                        }
                    }
                }
            }
            if overflow {  // 此时需要多增加一个十进制位
                first += 10_i64.pow(digit_cnt as u32);
                max_overflow_idx = digit_cnt;
            }

            if max_overflow_idx > n {  // 为了使得 first 尽可能第小，除了最高进位及前面的部分，其余后面后缀之前的数位需要都置为 0.
                first -= first % 10_i64.pow(max_overflow_idx as u32);
                first += s.parse::<i64>().unwrap();
            }
        }

        if first > finish { return 0; }

        // 再确认范围内的最后一个“强大整数” last
        let digit_cnt = finish.to_string().len();
        let mut last = finish;
        for (i, digit) in s.chars().rev().enumerate() {
            if let Ok(_) = Self::modify_digit_at(&mut last, i, digit.to_digit(10).unwrap() as u8) {
                // println!("test: {}, {}", last, digit)
            }
        }

        let mut borrow = last > finish;
        let mut j = n;
        while j < digit_cnt && borrow {
            let mut digit = Self::digit_at(&last, j);
            borrow = digit == 0;
            if borrow {
                digit = limit;
            } else {
                digit = limit.min(digit - 1)
            }
            println!("last idx {} -> chr {}", j, digit);
            if let Ok(_) = Self::modify_digit_at(&mut last, j, digit) {}
            j += 1;
        }

        // 最大化合法 last
        let mut set_limit = false;
        for i in (n..digit_cnt).rev() {
            if !set_limit {
                let digit = Self::digit_at(&last, i);
                if digit > limit { set_limit = true; }
                else { continue; }
            }
            if let Ok(_) = Self::modify_digit_at(&mut last, i, limit) {}
        }

        println!("first: {}", first);
        println!("last: {}", last);

        // 去除结尾的公共后缀后相减，并把结果转为十进制
        let first = first / 10_i64.pow(n as u32);
        let last = last / 10_i64.pow(n as u32);

        Self::mute_base(limit + 1, last, first) + 1
    }

    fn digit_at(num: &i64, i: usize) -> u8 {
        (*num / 10_i64.pow(i as u32) % 10) as u8
    }

    fn modify_digit_at(num: &mut i64, i: usize, digit: u8) -> Result<i64, &str> {
        if (0..=9).contains(&digit) {
            let delta = digit as i8 - Solution::digit_at(num, i) as i8;
            *num += i64::from(delta) * 10_i64.pow(i as u32);
            Ok(*num)
        } else {
            Err("digit is just support 0~9")
        }
    }

    /**
     * 指定进制后相减
     * @return a - b 结果对应的十进制数
     */
    fn mute_base(radix: u8, a: i64, b: i64) -> i64 {
        let mut a: i64 = a;
        let mut b: i64 = b;

        println!("a: {}", a);
        println!("b: {}", b);

        let mut borrow = false;
        // let mut diff = 0_i64;  // radix 进制的数字
        let mut decimal_diff = 0_i64;  // 差(十进制)
        let mut base = 1_i64;
        while a > 0 {
            let a0 = a % 10;
            let b0 = b % 10;

            let mut res = a0 - b0 - if borrow { 1 } else { 0 };
            borrow = res < 0;
            if borrow {
                res = radix as i64 + res;
            }

            // diff += base * res;
            println!("a0, b0: ({}, {}), res: {}", a0, b0, res);
            println!("add: {}", base * res);
            decimal_diff += base * res;

            base *= radix as i64;
            a /= 10;
            b /= 10;
        }

        decimal_diff
    }
}

fn main() {
    println!("{}", Solution::number_of_powerful_int(1, 6000, 4, "124".to_string()));
    println!("{}", Solution::number_of_powerful_int(1, 6000, 4, "11".to_string()));  // 25
    println!("{}", Solution::number_of_powerful_int(15, 215, 6, "10".to_string()));
    println!("{}", Solution::number_of_powerful_int(1000, 2000, 4, "3000".to_string()));
    println!("{}", Solution::number_of_powerful_int(1000, 2000, 4, "11".to_string()));
    println!("{}", Solution::number_of_powerful_int(26234, 100236, 5, "235".to_string()));
    println!("{}", Solution::number_of_powerful_int(26235, 100236, 5, "235".to_string()));
    println!("{}", Solution::number_of_powerful_int(26235, 100236, 6, "235".to_string()));
    println!("{}", Solution::number_of_powerful_int(26235, 100236, 2, "235".to_string()));
    println!("{}", Solution::number_of_powerful_int(26235, 100236, 1, "235".to_string()));

    println!("{}", Solution::number_of_powerful_int(26235, 100234, 5, "235".to_string()));

    println!("{}", Solution::number_of_powerful_int(10, 1844, 5, "12".to_string()));  // 12
    println!("{}", Solution::number_of_powerful_int(1114, 1864854501, 7, "26".to_string()));  // 4194295
    println!("{}", Solution::number_of_powerful_int(697662853, 11109609599885, 6, "5".to_string()));  // 16135677999
    println!("{}", Solution::number_of_powerful_int(1193723827, 17591699108481, 7, "20".to_string()));  // 16908812288
}