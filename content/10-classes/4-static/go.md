No static members — use package-level constants and functions. Capitalized names are exported.

```go
package mathx

const Pi = 3.14

func Square(x int) int {
    return x * x
}

// call sites: mathx.Pi, mathx.Square(5)
```
