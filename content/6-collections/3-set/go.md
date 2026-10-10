No built-in set — a map with empty struct values is the idiom.

```go
s := map[string]struct{}{
    "apple":  {},
    "banana": {},
}

len(s)                    // 2
_, ok := s["apple"]       // membership
s["cherry"] = struct{}{}  // add
delete(s, "banana")       // remove

for x := range s {
    fmt.Println(x)
}
```
