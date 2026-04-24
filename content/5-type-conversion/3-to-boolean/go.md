Go has no truthiness — compare explicitly.

```go
n != 0
s != ""
len(slice) > 0
ptr != nil

// `if n { ... }` is a compile error unless n is already a bool
```
