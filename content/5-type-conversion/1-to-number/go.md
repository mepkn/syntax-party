Numeric conversions are always explicit. String parsing returns an `error`.

```go
n, err := strconv.Atoi("42")              // 42
f, err := strconv.ParseFloat("3.14", 64)  // 3.14
```
