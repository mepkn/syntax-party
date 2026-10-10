Integer overflow crashes instead of wrapping — opt into wrapping with `&+`.

```swift
let integer = 42              // Int — platform word size
let float = 3.14              // Double
let scientific = 1.5e10
let readable = 1_000_000      // underscores as separators
// no native complex numbers
```
