`let` makes value types deeply immutable — even constants stay `lowerCamelCase`.

```swift
let pi = 3.14159
let maxRetries = 3

let config = [1, 2]
// config.append(3) — compile error: a let array can't be mutated
```
