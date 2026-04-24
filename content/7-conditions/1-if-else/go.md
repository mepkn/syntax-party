Parentheses optional; braces required. The `if init; cond` form scopes a variable to the branch — idiomatic for error checks.

```go
if age >= 18 {
    fmt.Println("adult")
} else if age >= 13 {
    fmt.Println("teen")
} else {
    fmt.Println("child")
}

// init + condition
if err := doThing(); err != nil {
    return err
}
```
