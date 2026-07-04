`async let` runs bindings concurrently; task groups handle a dynamic number.

```swift
async let a = loadUser(id: 1)
async let b = loadUser(id: 2)
let users = await [a, b]
```
