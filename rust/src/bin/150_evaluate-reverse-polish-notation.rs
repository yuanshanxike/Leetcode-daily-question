leetcode_rust::declare_solution!();

impl Solution {
    pub fn eval_rpn(tokens: Vec<String>) -> i32 {
        let mut stack = vec![];
        for token in tokens {
            if let Ok(num) = token.parse::<i32>() {
                stack.push(num);
            } else {
                if let Ok(opt) = Opt::new(&token) {
                    let b = stack.pop().unwrap_or(0);
                    let a = stack.pop().unwrap_or(0);

                    stack.push(opt.exec(a, b));
                }
            }
        }

        stack.pop().unwrap()
    }
}

enum Opt {
    Add,
    Subtract,
    Multiply,
    Divide
}

impl Opt {
    fn new(opt: &str) -> Result<Self, &str> {
        match opt {
            "+" => Ok(Opt::Add),
            "-" => Ok(Opt::Subtract),
            "*" => Ok(Opt::Multiply),
            "/" => Ok(Opt::Divide),
            _ => Err("is not an available opt!")
        }
    }

    fn exec(&self, a: i32, b: i32) -> i32 {
        match self {
            &Self::Add => a + b,
            &Self::Subtract => a - b,
            &Self::Multiply => a * b,
            &Self::Divide => a / b
        }
    }
}

fn main() {
    println!("{}", Solution::eval_rpn(vec!["2","1","+","3","*"].iter().map(|&s| String::from(s)).collect()));
    println!("{}", Solution::eval_rpn(vec!["4","13","5","/","+"].iter().map(|&s| String::from(s)).collect()));
    println!("{}", Solution::eval_rpn(vec!["10","6","9","3","+","-11","*","/","*","17","+","5","+"].iter().map(|&s| String::from(s)).collect()));
}