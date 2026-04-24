Types are required. Functions can return multiple values — idiomatic for `(value, error)`.

```go
func add(a, b int) int {
    return a + b
}

add(2, 3) // 5

// multiple returns
func divmod(a, b int) (int, int) {
    return a / b, a % b
}
```
