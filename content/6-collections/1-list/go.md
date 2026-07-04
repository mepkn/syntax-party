Slices are Go's growable lists. No built-in map/filter — write a loop.

```go
xs := []string{"apple", "banana", "cherry"}

len(xs)                          // 3
xs[0]                            // "apple"
xs = append(xs, "date")          // append returns a new slice
xs = xs[:len(xs)-1]              // pop last
xs[1:3]                          // ["banana", "cherry"]

for _, x := range xs {           // No map prefer explicit loop
    result = append(result, strings.ToUpper(x))
}
for _, x := range xs {.          // No filter prefer explicit loop
    if len(x) > 5 {
        result = append(result, x)
    }
}

for i, x := range xs {
    fmt.Println(i, x)
}
```
