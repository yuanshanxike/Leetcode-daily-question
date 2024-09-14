/**
 * 单调队列应用题
 * @param nums 
 * @param k 
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
    const n = nums.length
    const monoQue: number[] = []  // 存放下标
    let l = 0, r = 0
    monoQue.push(0)
    const maxValArr: number[] = []

    function pushNewElementIdx(i: number) {
        while (monoQue.length > 0 && nums[monoQue[monoQue.length - 1]] < nums[i]) {
            monoQue.pop()
        }
        monoQue.push(i)
    }

    // 形成窗口
    while (r < n - 1 && r - l + 1 < k) {
        r++
        pushNewElementIdx(r)
    }
    maxValArr.push(nums[monoQue[0]])

    // 不断右移窗口
    while (r < n - 1) {
        l++, r++
        if (monoQue[0] < l) {
            monoQue.shift()  // 先出队已经出了窗口范围的元素下标
        }
        pushNewElementIdx(r) // 然后再入队新元素，并维护单调队列

        maxValArr.push(nums[monoQue[0]])
    }
    return maxValArr;
};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
console.log(maxSlidingWindow([1], 1))
console.log(maxSlidingWindow([1, -1], 1))
console.log(maxSlidingWindow([-1, 1], 1))