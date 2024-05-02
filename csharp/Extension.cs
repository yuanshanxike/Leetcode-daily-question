namespace Extension;

/// <summary>
/// 扩展方法
/// 注意：提交代码时需要复制这里面的内容
/// </summary>
internal static class Extension
{
    internal static void Deconstruct<T>(this T[] pair, out T first, out T second)
    {
        first = pair[0];
        second = pair[1];
    }
}