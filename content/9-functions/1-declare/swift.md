Parameters carry argument labels at the call site — use `_` to drop them.

```swift
func add(a: Int, b: Int) -> Int {
    a + b   // implicit return for single expressions
}

add(a: 2, b: 3)   // 5 — labels are part of the call
```
