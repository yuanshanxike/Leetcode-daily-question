namespace L3206 {
    function numberOfAlternatingGroups(colors: number[]): number {
        const n = colors.length
        let ans = 0
        for (let i = 0; i < n; i++) {
            if (colors[i] != colors[(n + (i - 1) % n) % n] && colors[i] != colors[(i + 1) % n]) {
                ans++
            } 
        }
        return ans
    };

    console.log(numberOfAlternatingGroups([1,1,1]))
    console.log(numberOfAlternatingGroups([0,1,0,0,1]))
}