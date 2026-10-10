`...T` in the signature collects extra args into a slice. Use `slice...` when calling to expand.

```go
func sumAll(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

sumAll(1, 2, 3)   // 6

xs := []int{1, 2, 3}
sumAll(xs...)     // expand a slice into args
```
