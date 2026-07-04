Package-level variables are accessible across the package. Inner blocks can shadow outer names.

```go
// Inner → Outer → Package
// Shadowing instead of mutation

var x = "global"

func main() {
    outer()
    fmt.Println(x) // global (unchanged)
}

func outer() {
    x := "enclosing"

    inner := func() {
        // x = "modified by inner" ❌ not allowed (cannot access outer variable directly for reassignment intent)
        x := "local (shadowing)" // new variable, shadows outer
        fmt.Println(x)           // local
    }

    inner()
    fmt.Println(x) // enclosing (unchanged)
}
```
