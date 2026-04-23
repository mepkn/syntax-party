Go booleans are strict — no implicit conversion from integers or other types.

```go
yes := true
no  := false

// no truthy/falsy — must use explicit comparison
x := 0
if x != 0 { }   // correct
// if x { }     // compile error

!true            // false
true && false    // false
true || false    // true
```
