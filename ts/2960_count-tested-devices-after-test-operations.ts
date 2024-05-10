function countTestedDevices(batteryPercentages: number[]): number {
    let coastBattery = 0
    let ans = 0
    batteryPercentages.forEach ((val) => {
        if (val - coastBattery > 0) {
            ans++
            coastBattery++
        }
    })
    return ans
};

console.log(countTestedDevices([1,1,2,1,3]))
console.log(countTestedDevices([1,1,1,1,1]))
console.log(countTestedDevices([0,1,2]))