Capitalization controls visibility — `Uppercase` is exported, `lowercase` is package-private.

```go
package math

// exported
func Add(a, b int) int { return a + b }

const PI = 3.14

// package-private
func helper() {}
```
