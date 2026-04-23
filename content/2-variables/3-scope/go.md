Package-level variables are accessible across the package. Inner blocks can shadow outer names.

```go
var packageLevel = "package scope"

func myFunc() {
    local := "function scope"

    {
        inner := "block scope"
        _ = inner   // used to suppress "unused variable" error
    }

    _ = local
}
```
