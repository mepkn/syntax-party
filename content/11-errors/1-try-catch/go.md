No exceptions for ordinary errors — functions return an `error` as the last value. `defer` handles cleanup.

```go
result, err := riskyOp()
if err != nil {
    log.Println(err)
    return err
}

defer cleanup() // runs when the surrounding function returns

// panic/recover exists for truly exceptional cases (nil deref, etc.)
```
