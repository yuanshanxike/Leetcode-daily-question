use std::rc::Rc;
use std::cell::RefCell;
use leetcode_rust::declare_solution;

declare_solution!();

#[derive(Debug, PartialEq, Eq)]
pub struct TreeNode {
    pub val: i32,
    pub left: Option<Rc<RefCell<TreeNode>>>,
    pub right: Option<Rc<RefCell<TreeNode>>>
}

impl TreeNode {
    #[inline]
    pub fn new(val: i32) -> Self {
        TreeNode { val, left: None, right: None }
    }
}

impl Solution {
    pub fn lca_deepest_leaves(root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        let mut height_arr = [0; 1001];
        // if let Some(node) = root {
        //     let node = node.borrow();

        // }

        // fn height() {

        // }

        let mut ans = None;

        if let Some(ref root) = root {
            root.borrow().height(&mut height_arr);

            ans = TreeNode::dfs(root, &height_arr);
        }

        ans
    }
}

impl TreeNode {
    fn height(&self, height_arr: &mut [i32; 1001]) -> i32 {
        if let None = self.left {
            if let None = self.right {
                return 1;
            }
        }

        let mut height = 0;
        if let Some(l) = &self.left {
            height = l.borrow().height(height_arr);
        }


        if let Some(r) = &self.right {
            height = height.max(r.borrow().height(height_arr));
        }

        height_arr[self.val as usize] = height + 1;

        height + 1
    }

    // fn dfs(&self, height_arr: &[i32; 1001]) -> Option<&Self> {
    //     // if let Some(l) = &self.left {
    //     //     if let Some(r) = &self.right {
    //     //         if height_arr[l.borrow().val as usize] == height_arr[r.borrow().val as usize] { return Some(self); }
    //     //     }
    //     // }

    //     // if let None = &self.left {
    //     //     if let None = &self.right {
    //     //         return Some(self);
    //     //     }
    //     // }

    //     match &self.left {
    //         Some(l) => {
    //             if let Some(r) = &self.right {
    //                 let lh = height_arr[l.borrow().val as usize];
    //                 let rh = height_arr[r.borrow().val as usize];

    //                 if lh == rh { return Some(self); }
    //                 else if lh > rh { return l.borrow().dfs(height_arr); }
    //                 else { return r.borrow().dfs(height_arr); }
    //             }
    //         },
    //         None => {
    //             if let None = self.right {
    //                 return Some(self);
    //             }
    //         }
    //     }

    //     None
    // }

    fn dfs(node: &Rc<RefCell<Self>>, height_arr: &[i32; 1001]) -> Option<Rc<RefCell<Self>>> {
        let node_borrow = node.borrow();
        match &node_borrow.left {
            Some(l) => {
                if let Some(r) = &node_borrow.right {
                    let lh = height_arr[l.borrow().val as usize];
                    let rh = height_arr[r.borrow().val as usize];

                    if lh == rh {
                        return Some(Rc::clone(node));
                    } else if lh > rh {
                        return Self::dfs(l, height_arr);
                    } else {
                        return Self::dfs(r, height_arr);
                    }
                } else {
                    return Self::dfs(l, height_arr)
                }
            },
            None => {
                if node_borrow.right.is_none() {
                    return Some(Rc::clone(node));
                } else if node_borrow.right.is_some() {
                    if let Some(r) = &node_borrow.right {
                        return Self::dfs(r, height_arr)
                    }
                }
            }
        }
        None
    }
}

fn main() {
    let root = Some(Rc::new(RefCell::new(TreeNode { val: 0, left: None, right: None })));
    println!("{:#?}", Solution::lca_deepest_leaves(root).unwrap().borrow());
}