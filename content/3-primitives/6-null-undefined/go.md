Value types have zero values — no null. `nil` applies only to pointers, slices, maps, channels, functions, and interfaces.

```go
var i  int     // 0
var s  string  // ""
var b  bool    // false
var p  *int    // nil
var sl []int   // nil — nil slice, len 0, usable

if p == nil {
    fmt.Println("pointer is nil")
}

// zero values make most types immediately usable without init
var buf bytes.Buffer
buf.WriteString("hello")
```
