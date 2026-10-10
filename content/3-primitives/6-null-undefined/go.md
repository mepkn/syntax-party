Value types have zero values — no null. `nil` applies only to pointers, slices, maps, channels, functions, and interfaces.

```go
// Every variable has a default value:
// - primitives → zero value
// - reference types → nil

var (
    i  int            // 0
    f  float64        // 0.0
    s  string         // ""
    b  bool           // false
    p  *int           // nil (pointer)
    sl []int          // nil (slice) — len=0, cap=0, usable
    m  map[string]int // nil (map) — read ok, write panic
    ch chan int       // nil (channel)
    fn func()         // nil (function)
    it any            // nil (interface)
)

if p == nil {
    fmt.Println("pointer is nil")
}
```
