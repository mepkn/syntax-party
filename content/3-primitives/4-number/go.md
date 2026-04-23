Explicit integer and float types — pick size based on need. `int` is platform-sized (32 or 64-bit).

```go
var i   int     = 42
var i64 int64   = 42
var u   uint    = 42
var f64 float64 = 3.14
var f32 float32 = 3.14

10 / 3     // 3   — integer division when both operands are int
10.0 / 3.0 // 3.333...
10 % 3     // 1
```
