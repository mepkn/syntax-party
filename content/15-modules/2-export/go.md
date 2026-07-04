Capitalization controls visibility — `Uppercase` is exported, `lowercase` is package-private.

```go
package mathx

// exported
func Add(a, b int) int { return a + b }

const Pi = 3.14

// package-private
func helper() {}
```
