`Optional<T>` (written `T?`) makes absence explicit — unwrap with `if let` or fall back with `??`.

```swift
let a: String? = nil

a == nil             // true

// safe access
let name = user?.name ?? "Guest"

if let a {           // unwrap into the same name
    print(a)
}
```
