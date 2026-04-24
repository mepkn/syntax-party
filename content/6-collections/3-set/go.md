No built-in set — use `map[T]struct{}`. `struct{}` takes zero memory.

```go
set := map[string]struct{}{
    "apple":  {},
    "banana": {},
}

len(set)                     // 2
_, ok := set["apple"]        // ok == true  (membership)
set["cherry"] = struct{}{}   // add
delete(set, "banana")        // remove

for k := range set {
    fmt.Println(k)
}
```
