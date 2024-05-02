namespace L2810;

public class Solution
{
    public string FinalString(string s)
    {
        // var res = "";
        // for (int i = 0; i < s.Length; i++)
        // {
        //     if (s[i] == 'i')
        //         res = new string(res.Reverse().ToArray());
        //     else
        //         res += s[i];
        // }
        // return res;

        // 双端队列 O(n)
        // 未反转时，从队列后面入队，保持正常输入顺序；
        // 反转后，从队列前面入队，这时顺序变为从右向左，相当于之前存在的字符串发生反转；
        // 再次遇到 i，再发生反转，顺序又变为从左向右，正常从队尾入队。
        // 每次都是写入方向发生变化，相当于对已存在字符串进行反转。
        // 最后返回结果时，根据当前写如方向，决定读取为字符串的顺序。
        var deque = new LinkedList<char>();
        var reversed = false;
        foreach (var chr in s)
        {
            if (chr != 'i')
            {
                if (reversed) deque.AddFirst(chr); else deque.AddLast(chr);
            }
            else
            {
                reversed = !reversed;
            }
        }
        var resList = reversed ? deque.Reverse() : deque;
        return new string(resList.ToArray());
    }
}