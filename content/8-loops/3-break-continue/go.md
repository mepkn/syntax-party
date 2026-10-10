`break` and `continue` accept a label to target an outer loop.

```go
for _, x := range xs {
    if x == "skip" {
        continue
    }
    if x == "stop" {
        break
    }
    fmt.Println(x)
}
```
