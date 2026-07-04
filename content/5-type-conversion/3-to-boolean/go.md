Go has no truthiness — write the comparison you mean.

```go
ok := len(s) > 0        // non-empty string
positive := n != 0      // non-zero number
exists := p != nil      // non-nil pointer
```
