// See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");

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
L1329.Solution s = new();
var printArr = (int[] arr) => Console.WriteLine(string.Join(' ', arr));
s.DiagonalSort([[3,3,1,1],[2,2,1,2],[1,1,1,2]]).ToList().ForEach(printArr);
s.DiagonalSort([[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]).ToList().ForEach(printArr);