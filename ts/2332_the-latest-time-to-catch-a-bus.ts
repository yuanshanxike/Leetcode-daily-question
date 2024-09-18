function latestTimeCatchTheBus(buses: number[], passengers: number[], capacity: number): number {
    buses.sort((a, b) => a - b)
    passengers.sort((a, b) => a - b)

    const busLastPassengerIdxs: number[] = [-1]  // 每辆 bus 最后上车的乘客的下标数组，左边填充了一个 -1
    // 模拟每一辆车的上车过程
    for (const busTime of buses) {
        let lastPassengerIdx = busLastPassengerIdxs[busLastPassengerIdxs.length - 1]
        let i = lastPassengerIdx + 1
        for (; i < passengers.length && passengers[i] <= busTime; i++) {}
        i--
        lastPassengerIdx = Math.min(i, lastPassengerIdx + capacity)
        busLastPassengerIdxs.push(lastPassengerIdx)
    }
    // return busLastPassengerIdxs[busLastPassengerIdxs.length - 1]  // 最后上车乘客的下标
    let ans = 1  // 如果不能插入后面的位置，则只能在最前面
    for (let i = busLastPassengerIdxs.length - 1; i > 0; i--) {
        const start = busLastPassengerIdxs[i - 1] + 1
        const end = busLastPassengerIdxs[i]
        if (end == -1 || end - start + 1 < capacity && passengers[end] < buses[i - 1]) {
            // 如果能够在发车时刻极限上每一辆车，则在最后时刻上车
            return buses[i - 1]
        }
        // 否则尝试在每一位的乘客的前面进行插队
        for (let j = end; j >= start; j--) {
            if (j > 0 && passengers[j] - passengers[j - 1] > 1 || j == 0 && passengers[j] > 1) {
                ans = passengers[j] - 1
                return ans
            }
        }
    }
    return ans
};

console.log(latestTimeCatchTheBus([10,20], [2,17,18,19], 2))  // 16
console.log(latestTimeCatchTheBus([20,30,10], [19,13,26,4,25,11,21], 2))  // 20
console.log(latestTimeCatchTheBus([3], [2,4], 2))  // 3
console.log(latestTimeCatchTheBus([3], [2], 2))  // 3
console.log(latestTimeCatchTheBus([3], [4], 1))  // 3
console.log(latestTimeCatchTheBus([3], [3, 4], 2))  // 2

// 简介写法 (不需要关心具体的每一辆车最后的上车乘客，只需要看最后能够上车的乘客)
namespace L2332_brevity {
    function latestTimeCatchTheBus(buses: number[], passengers: number[], capacity: number): number {
        buses.sort((a, b) => a - b)
        passengers.sort((a, b) => a - b)
        // 模拟乘车上车
        let j = 0, c = capacity
        for (const busTime of buses) {
            c = capacity
            while (c && j < passengers.length && passengers[j] <= busTime) {
                // 上车
                j++  // 下一位乘客
                c--
            }
        }
        j-- // 最后上车的乘客 (那么只需要上车时间 <= passengers[j]，就一定能够上车)
        // 寻找上车时机
        let ans = c ? buses[buses.length - 1] : passengers[j]  // 如果最后一辆 bus 还有空座，则或许可以极限上车（如果没有其他人极限上车的情况(buses[buses.length - 1] == passengers[j])下）
        // 如果没有空座，说明 passengers[j] 时上车的人已经把最后一辆车的座位占满，需要插队
        while (j >= 0 && passengers[j] == ans) {  // 找空插队
            ans--
            j--
        }
        return ans
    }

    console.log(latestTimeCatchTheBus([10, 20], [2, 17, 18, 19], 2))  // 16
    console.log(latestTimeCatchTheBus([20, 30, 10], [19, 13, 26, 4, 25, 11, 21], 2))  // 20
    console.log(latestTimeCatchTheBus([3], [2, 4], 2))  // 3
    console.log(latestTimeCatchTheBus([3], [2], 2))  // 3
    console.log(latestTimeCatchTheBus([3], [4], 1))  // 3
    console.log(latestTimeCatchTheBus([3], [3, 4], 2))  // 2
}