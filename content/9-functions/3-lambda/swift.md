Trailing closures move outside the parentheses; `$0`, `$1` are implicit parameters.

```swift
let square = { (x: Int) in x * x }

[1, 2, 3].map { $0 * 2 }

users.sorted { $0.age < $1.age }
```
