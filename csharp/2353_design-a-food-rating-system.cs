public class FoodRatings {

    private readonly Dictionary<string, int> foodRating;  // food -> rating
    private readonly Dictionary<string, string> foodCuisine;  // food -> cuisine
    private readonly Dictionary<string, SortedSet<string>> cuisineFoods;  // cuisine -> foods，SortedSet 也可以替换为 PriorityQueue 去实现，使用优先队列时，堆内已更新评分的元素需要懒删除

    public FoodRatings(string[] foods, string[] cuisines, int[] ratings) {
        foodRating = [];
        foodCuisine = [];
        cuisineFoods = [];

        for (int i = 0; i < foods.Length; i++) {
            foodRating[foods[i]] = ratings[i];
            foodCuisine[foods[i]] = cuisines[i];
            if (!cuisineFoods.TryGetValue(cuisines[i], out SortedSet<string>? set)) {
                set = new SortedSet<string>(Comparer<string>.Create((a, b) => foodRating[a] != foodRating[b] ? foodRating[b].CompareTo(foodRating[a]) : a.CompareTo(b)));
                cuisineFoods[cuisines[i]] = set;
            }

            set.Add(foods[i]);
        }
    }
    
    public void ChangeRating(string food, int newRating) {
        // 红黑树的节点删除后重新插入，确保 foods 按照 rating 及 名称字典序 有序
        cuisineFoods[foodCuisine[food]].Remove(food);  // 删除旧节点（SortedSet 需要根据评分查找元素，所以删除前不能更新为新评分）
        foodRating[food] = newRating;
        cuisineFoods[foodCuisine[food]].Add(food);  // 插入新节点
    }
    
    public string HighestRated(string cuisine) {
        return cuisineFoods[cuisine].Min;
    }
}