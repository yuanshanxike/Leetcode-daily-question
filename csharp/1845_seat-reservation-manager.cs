namespace L1845;

public class SeatManager {
    private readonly PriorityQueue<int, int> heap;
    private readonly HashSet<int> availableSeats;

    private readonly int size = 0;

    public SeatManager(int n) {
        var sequence = Enumerable.Range(1, n);
        heap = new(sequence.Select(num => (num, num)).ToArray());
        availableSeats = [.. sequence.ToArray()];
        size = n;
    }
    
    public int Reserve() {
        int num = heap.Dequeue();
        availableSeats.Remove(num);
        return num;
    }
    
    public void Unreserve(int seatNumber) {
        if (!availableSeats.Contains(seatNumber)) {
            availableSeats.Add(seatNumber);
            heap.Enqueue(seatNumber, seatNumber);
        }
    }
}

/**
 * Your SeatManager object will be instantiated and called as such:
 * SeatManager obj = new SeatManager(n);
 * int param_1 = obj.Reserve();
 * obj.Unreserve(seatNumber);
 */