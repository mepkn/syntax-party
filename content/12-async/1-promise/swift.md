`Task` is the future — `task.value` awaits its result.

```swift
func loadUser(id: Int) async -> User {
    try? await Task.sleep(for: .milliseconds(100))
    return User(id: id, name: "John")
}

let task = Task { await loadUser(id: 1) }   // starts immediately
let user = await task.value
```
