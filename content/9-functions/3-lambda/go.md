Anonymous function literals — full `func` syntax, with closure over surrounding variables.

```go
square := func(x int) int { return x * x }

// inline callback
sort.Slice(xs, func(i, j int) bool {
    return xs[i] < xs[j]
})
```
