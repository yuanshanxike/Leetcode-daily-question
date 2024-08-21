// See https://aka.ms/new-console-template for more information

// 2580
// var s = new L2580.Solution();
// //L2580.Solution s = new ();
// var ranges = new int[][] {new[]{1, 2},new[]{3, 4}}; // 数组的数组
// //var ranges = new int[,] {{1,2}, {3, 4}}; // 矩阵
// //int[,] ranges = {{1,2}, {3, 4}}; // 矩阵
// Console.Write(s.CountWays(ranges));

// 1997
// var s = new L1997.Solution();
// Console.WriteLine(s.FirstDayBeenInAllRooms([0, 0]));  // 2
// Console.WriteLine(s.FirstDayBeenInAllRooms([0, 0, 2]));   // 6
// Console.WriteLine(s.FirstDayBeenInAllRooms([0,1,2,0]));   // 6
// Console.WriteLine(s.FirstDayBeenInAllRooms([0,0,1,0]));   // 12
// Console.WriteLine(s.FirstDayBeenInAllRooms([0,0,0,0]));   // 14
// Console.WriteLine(s.FirstDayBeenInAllRooms([0,0,1,1,0])); // 24
// Console.WriteLine(s.FirstDayBeenInAllRooms([0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,40,40,41,41,42,42,43,43,44,44,45,45,46,46,47,47,48]));

// 2908
// L2908.Solution s = new();
// var calculate = new Calculate(s.MinimumSum);
// Console.WriteLine(calculate([8,6,1,5,3]));
// Console.WriteLine(calculate([5,4,8,7,10,2]));
// Console.WriteLine(calculate([6,5,4,3,4,5]));
// delegate int Calculate(int[] nums);

// 1108
// L1108.Solution s = new();
// Console.WriteLine(s.DefangIPaddr("1.1.1.1"));
// Console.WriteLine(s.DefangIPaddr("255.100.50.0"));

// 2952
// L2952.Solution s = new();
// Console.WriteLine(s.MinimumAddedCoins([1,4,10], 19));
// Console.WriteLine(s.MinimumAddedCoins([1,4,10,5,7,19], 19));
// Console.WriteLine(s.MinimumAddedCoins([1,1,1], 20));
// Console.WriteLine(s.MinimumAddedCoins([1,2,3], 27));
// Console.WriteLine(s.MinimumAddedCoins([1,2,3], 28));
// Console.WriteLine(s.MinimumAddedCoins([1,4,10,5,7,19], 48));
// Console.WriteLine(s.MinimumAddedCoins([1,4,10,5,7,19], 49));

// 331
// L331.Solution s = new();
// Console.WriteLine(s.IsValidSerialization("9,3,4,#,#,1,#,#,2,#,6,#,#"));
// Console.WriteLine(s.IsValidSerialization("1,#"));
// Console.WriteLine(s.IsValidSerialization("9,#,#,1"));
// Console.WriteLine(s.IsValidSerialization(preorder: "#"));

// 2810
// L2810.Solution s = new();
// var arr = new int[] {1, 2, 3, 4};
// foreach(var i in arr[0..^0]) {

// }
// Console.WriteLine(s.FinalString(s: "string"));
// Console.WriteLine(s.FinalString(s: "poiinter"));
// Console.WriteLine(s.FinalString(s: "iii"));
// Console.WriteLine(s.FinalString(s: "abc"));

// 894
// L894.Solution s = new();
// Console.WriteLine(s.AllPossibleFBT(1));
// Console.WriteLine(s.AllPossibleFBT(2));
// Console.WriteLine(s.AllPossibleFBT(3));
// Console.WriteLine(s.AllPossibleFBT(5));
// Console.WriteLine(s.AllPossibleFBT(7));
// Console.WriteLine(s.AllPossibleFBT(9));

// 2192
// L2192.Solution s = new();
// Console.WriteLine(s.GetAncestors(8, [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]));
// Console.WriteLine(s.GetAncestors(5, [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]));
// Console.WriteLine(s.GetAncestorsDfs(8, [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]));
// Console.WriteLine(s.GetAncestorsDfs(5, [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]));

// 1026
// L1026.Solution s = new();

// 1483
// L1483.TreeAncestor ta = new(7, [-1, 0, 0, 1, 1, 2, 2]);
// Console.WriteLine(ta.GetKthAncestor(3, 1));
// Console.WriteLine(ta.GetKthAncestor(5, 2));
// Console.WriteLine(ta.GetKthAncestor(6, 3));
// Console.WriteLine(ta.GetKthAncestor(6, 500));

// 1600
// var saber = "saber";
// var aurth = "aurth";
// var shiro = "shiro";
// var sakura = "sakura";
// var toosaka = "toosaka";
// var shinji = "shinji";
// L1600.ThroneInheritance ti = new(saber);
// ti.Birth(saber, aurth);
// ti.Birth(saber, shiro);
// ti.Birth(shiro, shinji);
// Console.WriteLine(string.Join(", ", ti.GetInheritanceOrder()));
// ti.Birth(shiro, toosaka);
// Console.WriteLine(string.Join(", ", ti.GetInheritanceOrder()));
// ti.Death(aurth);
// Console.WriteLine(string.Join(", ", ti.GetInheritanceOrder()));
// ti.Birth(shinji, sakura);
// ti.Death(shinji);
// Console.WriteLine(string.Join(", ",ti.GetInheritanceOrder()));

// 2009
// int[] arr = [2,3,5,1000,1001,1002];
// int[] arr = [1,10,11,11,100,1000];
// Array.Sort(arr);
// var idx = 0;
// Console.WriteLine(Array.BinarySearch(arr, idx, arr.Length - idx, arr[idx] + arr.Length - 1));
// Console.WriteLine(Array.BinarySearch(arr, idx, arr.Length - idx, 11));
// L2009.Solution s = new();
// Console.WriteLine(s.MinOperations([4,2,5,3]));
// Console.WriteLine(s.MinOperations([1,2,3,5,6]));
// Console.WriteLine(s.MinOperations([1,10,100,1000]));
// Console.WriteLine(s.MinOperations([8,5,9,9,8,4]));
// Console.WriteLine(s.MinOperations([4,7,7,8,8,10]));
// Console.WriteLine(s.MinOperations([44,28,33,49,4,2,35,28,25,38,47,20,14,30,27,45,42,14,34]));

// 2529
// L2529.Solution s = new();
// Console.WriteLine(s.MaximumCount([-2,-1,-1,1,2,3]));
// Console.WriteLine(s.MaximumCount([-3,-2,-1,0,0,1,2]));
// Console.WriteLine(s.MaximumCount([5,20,66,1314]));
// Console.WriteLine(s.MaximumCount([-1314,-66,-20,-5]));
// Console.WriteLine(s.MaximumCount([-1563,-236,-114,-55,427,447,687,752,1021,1636]));
// Console.WriteLine(s.MaximumCount([0,0,0,1,1,1,1,1,1,1]));

// 1766
// int[] a = [1, 2, 3];
// int[] b = { 4, 5, 6 };
// Console.WriteLine(string.Join(", ", a));
// a = [.. a, .. b];
// Console.WriteLine(string.Join(", ", a));
// L1766.Solution s = new();
// Console.WriteLine(string.Join(", ", s.GetCoprimes(nums: [2,3,3,2], edges: [[0,1],[1,2],[1,3]])));
// Console.WriteLine(string.Join(", ", s.GetCoprimes(nums: [5,6,10,2,3,6,15], edges: [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]])));

// 2923
// L2923.Solution s = new();
// Console.WriteLine(s.FindChampion([[0,1],[0,0]]));
// Console.WriteLine(s.FindChampion([[0,0,1],[1,0,1],[0,0,0]]));

// 2924
// L2924.Solution s = new();
// Console.WriteLine(s.FindChampion(3, [[0,1],[1,2]]));
// Console.WriteLine(s.FindChampion(4, [[0,2],[1,3],[1,2]]));
// Console.WriteLine(s.FindChampion(4, [[1,3],[1,2]]));

// 705
// L705.MyHashSet myHashSet = new();
// myHashSet.Add(1);
// myHashSet.Add(2);
// myHashSet.Contains(1);
// myHashSet.Contains(3);
// myHashSet.Add(2);
// myHashSet.Contains(2);
// myHashSet.Remove(2);
// myHashSet.Contains(2);

// 706
// L706.MyHashMap myHashMap = new();
// myHashMap.Put(1, 1);
// myHashMap.Put(2, 2);
// myHashMap.Get(1);
// myHashMap.Get(3);
// myHashMap.Put(2, 1);
// myHashMap.Get(2);
// myHashMap.Remove(2);
// myHashMap.Get(2);

// 924
// L924.Solution s = new();
// Console.WriteLine(s.MinMalwareSpread([[1,1,0],[1,1,0],[0,0,1]], [0,1]));
// Console.WriteLine(s.MinMalwareSpread([[1,0,0],[0,1,0],[0,0,1]], [0,2]));
// Console.WriteLine(s.MinMalwareSpread([[1,1,1],[1,1,1],[1,1,1]], [1,2]));
// Console.WriteLine(s.MinMalwareSpread([[1,0,0,0],[0,1,0,1],[0,0,1,1],[0,1,1,1]], [3,0]));
// Console.WriteLine(s.MinMalwareSpread([[1,0,1,1],[0,1,0,0],[1,0,1,0],[1,0,0,1]], [1,3]));

// 928
// L928.Solution s = new();
// Console.WriteLine(s.MinMalwareSpread([[1,1,0],[1,1,0],[0,0,1]], [0,1]));
// Console.WriteLine(s.MinMalwareSpread([[1,1,0],[1,1,1],[0,1,1]], [0,1]));
// Console.WriteLine(s.MinMalwareSpread([[1,1,0,0],[1,1,1,0],[0,1,1,1],[0,0,1,1]], [0,1]));
// Console.WriteLine(s.MinMalwareSpread([[1,0,0,0],[0,1,0,1],[0,0,1,1],[0,1,1,1]], [3,0]));
// Console.WriteLine(s.MinMalwareSpread([[1,0,0,0],[0,1,0,1],[0,0,1,1],[0,1,1,1]], [3,1]));
// Console.WriteLine(s.MinMalwareSpread([[1,0,1,1],[0,1,0,0],[1,0,1,0],[1,0,0,1]], [1,3]));
// Console.WriteLine(s.MinMalwareSpread([[1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,1],[0,0,1,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,1],[0,0,0,0,1,0,1,1,1],[0,0,0,0,0,1,0,0,1],[0,0,0,0,1,0,1,1,0],[0,0,0,0,1,0,1,1,0],[0,1,0,1,1,1,0,0,1]], [8,4,2,0]));
// Console.WriteLine(s.MinMalwareSpread([[1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,1],[0,0,1,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,1],[0,0,0,0,1,0,1,1,1],[0,0,0,0,0,1,0,0,1],[0,0,0,0,1,0,1,0,0],[0,0,0,0,1,0,0,1,0],[0,1,0,1,1,1,0,0,1]], [8,4,2,0]));

// 2007
// L2007.Solution s = new();
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([1,3,4,2,6,8])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([6,3,0,1])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([1])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([1,2,2,3,4,6])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([1,10,30,2,20,60])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([0,0])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([0,0,0,0])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([0,0,0,0,0,0])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([0,0,0,0,0,0,0,0])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([0,0,0,0,0,0,0,0,0,0,0,0])));
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([3,9,18,0,18,2]))); // [0,2,3,9,18,18]
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([2,1,2,4,2,4]))); // [1,2,2,2,4,4]
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([5,8,7,8,16,5,16,14,10,10]))); // [5,5,7,8,8,10,10,14,16,16]
// Console.WriteLine(string.Join(" ,", s.FindOriginalArray([0,3,3,4,6,7,10,10,12,12,13,14,15,15,16,18,19,20,20,20,20,22,23,25,25,27,27,27,28,33,33,33,34,35,37,38,38,39,40,40,41,42,43,44,45,47,48,49,50,50])));

// 1883
// L1883.Solution s = new();
// Console.WriteLine(s.MinSkips([1,3,2], 4, 2));
// Console.WriteLine(s.MinSkips([7,3,5,5], 2, 10));
// Console.WriteLine(s.MinSkips([7,3,5,5], 1, 10));

// 1052
// L1052.Solution s = new();
// Console.WriteLine(s.MaxSatisfied([1,0,1,2,1,1,7,5], [0,1,0,1,0,1,0,1], 3));
// Console.WriteLine(s.MaxSatisfied([1], [0], 1));
// Console.WriteLine(s.MaxSatisfied([1,0,0,0,0,0,8], [0,0,0,0,0,0,1], 7));

// 2385
// L2385.Solution s = new();

// 2739
// L2379.Solution s = new();
// Console.WriteLine(s.DistanceTraveled(5, 10));
// Console.WriteLine(s.DistanceTraveled(1, 2));
// Console.WriteLine(s.DistanceTraveled(9, 1));
// Console.WriteLine(s.DistanceTraveled(9, 2));

// 1146
// L1146.SnapshotArray arr = new(3);
// arr.Set(0,5);
// Console.WriteLine(arr.Snap());
// arr.Set(0,6);
// Console.WriteLine(arr.Get(0,0));

// 1017
// L1017.Solution s = new();
// Console.WriteLine(s.BaseNeg2(2));
// Console.WriteLine(s.BaseNeg2(3));
// Console.WriteLine(s.BaseNeg2(4));
// Console.WriteLine(s.BaseNeg2((int)1e9));

// 1329
// L1329.Solution s = new();
// var printArr = (int[] arr) => Console.WriteLine(string.Join(' ', arr));
// s.DiagonalSort([[3,3,1,1],[2,2,1,2],[1,1,1,2]]).ToList().ForEach(printArr);
// s.DiagonalSort([[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]).ToList().ForEach(printArr);

// 2798
// L2798.Solution s = new();
// Console.WriteLine(s.NumberOfEmployeesWhoMetTarget([0,1,2,3,4], 2));
// Console.WriteLine(s.NumberOfEmployeesWhoMetTarget([5,1,4,2,2], 6));

// 2462
// L2462.Solution s = new();
// Console.WriteLine(s.TotalCost([17,12,10,2,7,2,11,20,8], 3, 4));
// Console.WriteLine(s.TotalCost([1,2,4,1], 3, 3));
// Console.WriteLine(s.TotalCost([17,12,10,2,7,2,11,20,8], 4, 3));
// Console.WriteLine(s.TotalCost([57,33,26,76,14,67,24,90,72,37,30], 11, 2));
// Console.WriteLine(s.TotalCost([28,35,21,13,21,72,35,52,74,92,25,65,77,1,73,32,43,68,8,100,84,80,14,88,42,53,98,69,64,40,60,23,99,83,5,21,76,34], 32, 12));

// 857
// L857.Solution s = new();
// Console.WriteLine(s.MincostToHireWorkers([10,20,5], [70,50,30], 2));
// Console.WriteLine(s.MincostToHireWorkers([3,1,10,10,1], [4,8,2,2,7], 3));
// Console.WriteLine(s.MincostToHireWorkers([3,1,10,10,1], [4,8,2,2,7], 2));
// Console.WriteLine(s.MincostToHireWorkers([3,1,10,10,1,1], [4,8,2,2,7,9], 3));

// 1491
// L1491.Solution s = new();
// Console.WriteLine(s.Average([4000,3000,1000,2000]));
// Console.WriteLine(s.Average([1000,2000,3000]));
// Console.WriteLine(s.Average([6000,5000,4000,3000,2000,1000]));
// Console.WriteLine(s.Average([8000,9000,2000,3000,6000,1000]));

// 1235
// L1235.Solution s = new();
// Console.WriteLine(s.JobScheduling([1,2,3,3], [3,4,5,6], [50,10,40,70]));
// Console.WriteLine(s.JobScheduling([1,2,3,4,6], [3,5,10,6,9], [20,20,100,70,60]));
// Console.WriteLine(s.JobScheduling([1,1,1], [2,3,4], [5,6,4]));
// Console.WriteLine(s.JobScheduling([2,3,1,3], [4,5,3,6], [10,40,50,70]));
// Console.WriteLine(s.JobScheduling([4,2,4,8,2], [5,5,5,10,8], [1,2,8,10,4])); // 18
// Console.WriteLine(s.JobScheduling([4,2,4,2], [5,5,5,8], [1,2,8,4]));
// Console.WriteLine(s.JobScheduling([4,3,1,2,4,8,3,3,3,9], [5,6,3,5,9,9,8,5,7,10], [9,9,5,12,10,11,10,4,14,7]));  // 37
// Console.WriteLine(s.JobScheduling([4,3,1,2,4,7,3,3,3,9], [5,6,3,5,9,8,8,5,7,10], [9,9,5,12,10,11,10,4,14,7]));  // 37

// 1652
// L1652.Solution s = new();
// Console.WriteLine(string.Join(',', s.Decrypt2([5,7,1,4], 3)));  // [12,10,16,13]
// Console.WriteLine(string.Join(',', s.Decrypt2([1,2,3,4], 0)));  // [0,0,0,0]
// Console.WriteLine(string.Join(',', s.Decrypt2([2,4,9,3], -2))); // [12,5,6,13]

// 741
// L741.Solution s = new();
// Console.WriteLine(s.CherryPickup([[0,1,-1],[1,0,-1],[1,1,1]]));
// Console.WriteLine(s.CherryPickup([[1,1,-1],[1,-1,1],[-1,1,1]]));
// Console.WriteLine(s.CherryPickup([[1,1,1,1,1],[1,1,-1,1,1],[-1,-1,1,1,1],[1,1,1,1,1],[-1,1,1,1,1]]));
// Console.WriteLine(s.CherryPickup([[1,1,1,1,-1],[1,1,-1,1,1],[-1,-1,1,1,1],[1,1,1,1,1],[-1,1,1,1,1]]));
// Console.WriteLine(s.CherryPickup([[1,1,1,1,0],[1,1,-1,0,1],[-1,-1,1,1,1],[1,1,1,1,1],[-1,1,1,1,1]]));
// Console.WriteLine(s.CherryPickup([[1]]));
// Console.WriteLine(s.CherryPickup([[1,1,1,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,1],[1,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,1,1,1]]));

// /**
//  1 1 1 1 1
//  1 1-1 1 1
// -1-1 1 1 1
//  1 1 1 1 1
// -1 1 1 1 1 

// 两次 dp 失效:
//  1 1 1 1 0 0 0
//  0 0 0 1 0 0 0
//  0 0 0 1 0 0 1
//  1 0 0 1 0 0 0
//  0 0 0 1 0 0 0
//  0 0 0 1 0 0 0
//  0 0 0 1 1 1 1

// */

// 1463
// L1463.Solution s = new();
// Console.WriteLine(s.CherryPickup([[3,1,1],[2,5,1],[1,5,5],[2,1,1]]));
// Console.WriteLine(s.CherryPickup([[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]));

// 2391
// L2391.Solution s = new();
// Console.WriteLine(s.GarbageCollection(["G","P","GP","GG"], [2,4,3]));
// Console.WriteLine(s.GarbageCollection(["MMM","PGM","GP"], [3,10]));

// 826
// L826.Solution s = new();
// Console.WriteLine(s.MaxProfitAssignment([2,4,6,8,10], [10,20,30,40,50], [4,5,6,7]));
// Console.WriteLine(s.MaxProfitAssignment([85,47,57], [24,66,99], [40,25,25]));
// Console.WriteLine(s.MaxProfitAssignment([85,24,24,1], [24,66,99,100], [40,25,25]));

// 1738
// L1738.Solution s = new();
// Console.WriteLine(s.KthLargestValue([[5,2],[1,6]], 1));
// Console.WriteLine(s.KthLargestValue([[5,2],[1,6]], 2));
// Console.WriteLine(s.KthLargestValue([[5,2],[1,6]], 3));
// Console.WriteLine(s.KthLargestValue([[5,2],[1,6]], 4));

// 3072
// L3072.Solution s = new();
// Console.WriteLine(string.Join(",", s.ResultArray([2,1,3,3])));
// Console.WriteLine(string.Join(",", s.ResultArray([5,14,3,1,2])));

// 881
// L881.Solution s = new();
// Console.WriteLine(s.NumRescueBoats([1,2], 3));
// Console.WriteLine(s.NumRescueBoats([3,2,2,1], 3));
// Console.WriteLine(s.NumRescueBoats([3,5,3,4], 5));
// Console.WriteLine(s.NumRescueBoats([3,5], 5));
// Console.WriteLine(s.NumRescueBoats([5], 5));
// Console.WriteLine(s.NumRescueBoats([3], 5));
// Console.WriteLine(s.NumRescueBoats([2,2], 6));
// Console.WriteLine(s.NumRescueBoats([2,49,10,7,11,41,47,2,22,6,13,12,33,18,10,26,2,6,50,10], 50));

// 2786
// L2786.Solution s = new();
// Console.WriteLine(s.MaxScore([2,3,6,1,9,2], 5));
// Console.WriteLine(s.MaxScore([2,4,6,8], 3));

// 2779
// L2779.Solution s = new();
// Console.WriteLine(s.MaximumBeauty([4,6,1,2], 2));
// Console.WriteLine(s.MaximumBeauty([1,1,1,1], 10));

// 2713
// L2713.Solution s = new();
// Console.WriteLine(s.MaxIncreasingCells([[3,1],[3,4]]));
// Console.WriteLine(s.MaxIncreasingCells([[1,1],[1,1]]));
// Console.WriteLine(s.MaxIncreasingCells([[3,1,6],[-9,5,7]]));

// 724
// L724.Solution s = new();
// Console.WriteLine(s.PivotIndex([1,7,3,6,5,6]));
// Console.WriteLine(s.PivotIndex([1,2,3]));
// Console.WriteLine(s.PivotIndex([2,1,-1]));
// Console.WriteLine(s.PivotIndex([-1,-1,-1,-1,-1,0]));

// 3102
// L3102.Solution s = new();
// Console.WriteLine(s.MinimumDistance([[3,10],[5,15],[10,2],[4,4]]));
// Console.WriteLine(s.MinimumDistance([[1,1],[1,1],[1,1]]));

// 3112
// L3112.Solution s = new();
// Console.WriteLine(string.Join(',', s.MinimumTime(3, [[0,1,2],[1,2,1],[0,2,4]], [1,1,5])));
// Console.WriteLine(string.Join(',', s.MinimumTime(3, [[0,1,2],[1,2,1],[0,2,4]], [1,3,5])));
// Console.WriteLine(string.Join(',', s.MinimumTime(2, [[0,1,1]], [1,1])));

// 3106
// L3106.Solution s = new();
// Console.WriteLine(s.GetSmallestString("zbbz", 3));
// Console.WriteLine(s.GetSmallestString("xaxcd", 4));
// Console.WriteLine(s.GetSmallestString("lol", 0));

// 3111
// L3111.Solution s = new();
// Console.WriteLine(s.MinRectanglesToCoverPoints([[2,1],[1,0],[1,4],[1,8],[3,5],[4,6]], 1));
// Console.WriteLine(s.MinRectanglesToCoverPoints([[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]], 2));
// Console.WriteLine(s.MinRectanglesToCoverPoints([[2,3],[1,2]], 0));

// 2940
// L2940.Solution s = new();
// Console.WriteLine(string.Join(", ", s.LeftmostBuildingQueries([6,4,8,5,2,7], [[0,1],[0,3],[2,4],[3,4],[2,2]])));
// Console.WriteLine(string.Join(", ", s.LeftmostBuildingQueries([5,3,8,2,6,1,4,6], [[0,7],[3,5],[5,2],[3,0],[1,6]])));

// 3152
// L3152.Solution s = new();
// Console.WriteLine(string.Join(',', s.IsArraySpecial([3,4,1,2,6], [[0,4]])));
// Console.WriteLine(string.Join(',', s.IsArraySpecial([4,3,1,6], [[0,2],[2,3]])));

// 3007
L3007.Solution s = new ();
Console.WriteLine(s.FindMaximumNumber(9, 1));
Console.WriteLine(s.FindMaximumNumber(7, 2));
Console.WriteLine(s.FindMaximumNumber(50, 7));    // 113
Console.WriteLine(s.FindMaximumNumber(50, 8));    // 177
Console.WriteLine(s.FindMaximumNumber(100000000000, 2));    // 12129043515
Console.WriteLine(s.FindMaximumNumber(10000000000000, 7));  // 3487851144340