Explicit integer and float types — pick size based on need. `int` is platform-sized (32 or 64-bit).

```go
var (
    i   int        = 42
    f   float64    = 3.14
    sci float64    = 1.5e10
    c   complex128 = 3 + 4i
)
```
