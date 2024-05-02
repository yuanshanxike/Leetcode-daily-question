//package source;
//
//import java.util.*;
//
//public class SolutionJava {
//    private long[] memoryHash;
//    private List<Integer> stack;
//
//    public long countPaths(int n, int[][] edges) {
//        boolean[] isPrime = handlePrime(n);
//        List<List<Integer>> adjacencyList = new ArrayList<>(n + 1);
//        for (int i = 0; i <= n; i++) {
//            adjacencyList.add(new ArrayList<>());
//        }
//        for (int[] edge : edges) {
//            adjacencyList.get(edge[0]).add(edge[1]); // a -> b
//            adjacencyList.get(edge[1]).add(edge[0]); // b -> a
//        }
//        long sum = 0L;
//        memoryHash = new long[n + 1];
//        stack = new ArrayList<>();
//        for (int index = 0; index < adjacencyList.size(); index++) {
//            List<Integer> ints = adjacencyList.get(index);
//            if (isPrime[index]) {
//                long edgeSum = 0L;
//                for (int node : ints) {
//                    long count = dfs(adjacencyList, index, node, isPrime);
//                    while (!stack.isEmpty()) {
//                        memoryHash[stack.remove(stack.size() - 1)] = count;
//                    }
//                    sum += edgeSum * memoryHash[node];
//                    edgeSum += memoryHash[node];
//                }
//                sum += edgeSum;
//            }
//        }
//        return sum;
//    }
//
//    private boolean[] handlePrime(int n) {
//        boolean[] primeArray = new boolean[n + 1];
//        Arrays.fill(primeArray, true);
//        primeArray[0] = false; // 0
//        primeArray[1] = false; // 1
//        int factor = (int) Math.sqrt(n);
//        for (int f = 2; f <= factor; f++) {
//            for (int times = f; times <= n / f; times++) {
//                primeArray[times * f] = false; // composite number
//            }
//        }
//        return primeArray;
//    }
//
//    private long dfs(List<List<Integer>> adjacencyList, int from, int dst, boolean[] isPrime) {
//        if (dst != 0 && dst != from && isPrime[dst]) return 0;
//        if (dst != 0 && dst != from && memoryHash[dst] != 0L) return memoryHash[dst];
//        long num = 1L; // at least includes the dst node
//        for (int next : adjacencyList.get(dst)) {
//            if (next != from && !isPrime[next]) {
//                num += dfs(adjacencyList, dst, next, isPrime);
//            }
//        }
//        if (dst != 0 && dst != from) {
//            stack.add(dst);
//        }
//        return num;
//    }
//
//    public static void main(String[] args) {
//        System.out.println(new SolutionJava().countPaths(5, new int[][]{{1, 2}, {1, 3}, {2, 4}, {2, 5}}));
//        System.out.println(new SolutionJava().countPaths(6, new int[][]{{1, 2}, {1, 3}, {2, 4}, {3, 5}, {3, 6}}));
//    }
//}