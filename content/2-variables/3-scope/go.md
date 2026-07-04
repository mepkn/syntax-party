Closures capture outer variables by reference — `=` mutates the enclosing scope, `:=` declares a new shadowing variable.

```go
// Inner → Outer → Package
// `=` mutates, `:=` shadows

var x = "global"

func main() {
    outer()
    fmt.Println(x) // global (unchanged)
}

func outer() {
    x := "enclosing"

    inner := func() {
        x = "modified by inner" // `=` writes to the enclosing variable
        fmt.Println(x)          // enclosing (modified)
    }

    inner()
    fmt.Println(x) // enclosing (modified)
}
```
