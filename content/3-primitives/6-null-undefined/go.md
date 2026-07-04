Value types have zero values — no null. `nil` applies only to pointers, slices, maps, channels, functions, and interfaces.

```go
// Every variable has a default value:
// - primitives → zero value
// - reference types → nil

var i  int               // 0
var f  float64           // 0.0
var s  string            // ""
var b  bool              // false
var p  *int              // nil (pointer)
var sl []int             // nil (slice) — len=0, cap=0, usable
var m  map[string]int    // nil (map) — read ok, write panic
var ch chan int          // nil (channel)
var fn func()            // nil (function)
var it interface{}       // nil (interface)

if p == nil {
    fmt.Println("pointer is nil")
}
```
