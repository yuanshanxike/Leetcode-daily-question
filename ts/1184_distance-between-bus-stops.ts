function distanceBetweenBusStops(distance: number[], start: number, destination: number): number {
    const sum = distance.reduce((sum, dist) => sum + dist, 0)
    if (start > destination) {
        [start, destination] = [destination, start]
    }
    const aPath = distance.slice(start, destination).reduce((sum, dist) => sum + dist, 0)
    const anotherPath = sum - aPath
    return Math.min(aPath, anotherPath)
};

console.log(distanceBetweenBusStops([1,2,3,4], 0, 1))
console.log(distanceBetweenBusStops([1,2,3,4], 0, 2))
console.log(distanceBetweenBusStops([1,2,3,4], 0, 3))