No `while` keyword — a bare `for` plays that role.

```go
i := 0
for i < 5 {
    fmt.Println(i)
    i++
}

// do-while equivalent
for {
    i++
    if i >= 10 {
        break
    }
}
```
