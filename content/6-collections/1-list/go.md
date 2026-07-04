Slices are Go's growable lists. No built-in map/filter — write a loop.

```go
xs := []string{"apple", "banana", "cherry"}

len(xs)                          // 3
xs[0]                            // "apple"
xs = append(xs, "date")          // append returns a new slice
xs = xs[:len(xs)-1]              // pop last
xs[1:3]                          // ["banana", "cherry"]

var upper []string
for _, x := range xs {           // no map — write a loop
    upper = append(upper, strings.ToUpper(x))
}

var long []string
for _, x := range xs {           // no filter — write a loop
    if len(x) > 5 {
        long = append(long, x)
    }
}

for i, x := range xs {
    fmt.Println(i, x)
}
```
