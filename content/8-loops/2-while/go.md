No `while` keyword — a bare `for` plays that role.

```go
i := 0
for i < 5 {
    fmt.Println(i)
    i++
}

// infinite loop
for {
    if done {
        break
    }
}
```
