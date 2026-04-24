Operands must be `bool` — Go has no truthy/falsy values and no nullish fallback.

```go
true && false    // false
true || false    // true
!true            // false

// no ?? — use an if-statement
name := user.Name
if name == "" {
    name = "Guest"
}
```
