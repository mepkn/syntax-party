Numeric conversions are always explicit. String parsing returns an `error`.

```go
import "strconv"

n, err := strconv.Atoi("42")              // 42
f, err := strconv.ParseFloat("3.14", 64)  // 3.14

// between numeric types — cast explicitly
var x int = 42
var y float64 = float64(x)
```
