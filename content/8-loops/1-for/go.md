`for` is the only loop keyword. `range` yields index/value or key/value pairs.

```go
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

for _, x := range []string{"a", "b"} {
    fmt.Println(x)
}

for k, v := range obj {
    fmt.Println(k, v)
}
```
