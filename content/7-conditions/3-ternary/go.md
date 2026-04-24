Go has no ternary operator — use a full `if/else`, intentionally.

```go
var label string
if age >= 18 {
    label = "adult"
} else {
    label = "minor"
}
```
