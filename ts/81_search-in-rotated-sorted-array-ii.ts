function search(nums: number[], target: number): boolean {
    return nums.includes(target)
};

console.log(search([2,5,6,0,0,1,2], 0));
console.log(search([2,5,6,0,0,1,2], 3));
