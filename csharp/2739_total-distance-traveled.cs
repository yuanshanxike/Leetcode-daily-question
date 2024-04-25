namespace L2379;

public class Solution {
    public int DistanceTraveled(int mainTank, int additionalTank) {
        // 方法一：模拟（减法）
        // var ans = 0;
        // while (mainTank > 0) {
        //     var lastMainTank = mainTank;
        //     mainTank -= mainTank >= 5 ? 5 : mainTank;
        //     var delta = lastMainTank - mainTank;
        //     if (delta == 5 && additionalTank-- > 0) {
        //         mainTank++;
        //     }
        //     ans += delta * 10;
        // }
        // return ans;

        // 方法二：快速模拟（除法）
        // var ans = 0;
        // while (mainTank >= 5) {
        //     var times = mainTank / 5;
        //     mainTank %= 5;
        //     ans += times * 5 * 10;
        //     var add = additionalTank;
        //     additionalTank -= times > additionalTank ? additionalTank : times;
        //     add -= additionalTank;
        //     mainTank += add;
        // }
        // // mainTank < 5
        // ans += mainTank * 10;
        // return ans;

        //方法三： 数学（问题模型可以理解为：每消耗4升油可以得到 1 升油（如果可以的话），但是需要保证油箱需要剩余 5 升油才可以消耗 4 升获得 1 升）
        // 剩余油量 > 5 时，必然是可以按照每消耗 4 升获得 1 升去计算的；剩余油量 < 5 时，比如 4 升，不能消耗 4 升获得 1 升。
        // 所以可以对原 mainTank - 1 后再除 4，这样(mainTank - 1)相当于是对最后剩余的 <= 5 的油量进行规则限定:
        // 对于最后剩余油量，只有其 == 5L (最后剩余油量(5L) - 1L == 4L) 时，才能够 +1L。
        var addTimes = Math.Min((mainTank - 1) / 4, additionalTank);
        return (mainTank + addTimes) * 10;
    }
}