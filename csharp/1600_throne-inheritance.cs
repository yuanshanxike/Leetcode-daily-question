namespace L1600;

public class ThroneInheritance
{

    private enum State { ALIVE, DEAD }

    // 这里不使用结构体的原因：结构体是值类型，每次从字典中取出、修改值后，需要重新 set 到字典中。这里因为还有 children 是储存结构体的 List，修改值后还需要重新 set 到 List 中，过于麻烦！遂使用类这种引用类型会比较适合！
    private class Character(string name)
    {
        internal string name = name;
        internal State state = State.ALIVE;
        internal List<Character> children = [];
    }

    private Character king;

    private readonly Dictionary<string, Character> outline;

    public ThroneInheritance(string kingName)
    {
        king = new(kingName);
        outline = [];
        outline[kingName] = king;
    }

    public void Birth(string parentName, string childName)
    {
        if (outline.TryGetValue(parentName, out Character? character) && character?.state == State.ALIVE)
        {
            var child = new Character(childName);
            character.children.Add(child);
            outline[childName] = child;
        }
    }

    public void Death(string name)
    {
        if (outline.TryGetValue(name, out Character? character) && character?.state == State.ALIVE)
        {
            character.state = State.DEAD;
        }
    }

    public IList<string> GetInheritanceOrder()
    {
        var order = new List<string>();
        Action<Character> dfs = (_) => {};
        dfs = (Character c) =>
        {
            if (c.state == State.ALIVE)
            {
                order.Add(c.name);
            }
            foreach (var child in c.children)
            {
                dfs(child);
            }
        };
        dfs(king);
        return order;
    }
}