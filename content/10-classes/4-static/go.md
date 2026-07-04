No static members — use package-level constants and functions. Capitalized names are exported.

```go
package mathx

const PI = 3.14

func Square(x int) int {
    return x * x
}

// call sites: mathx.PI, mathx.Square(5)
```
