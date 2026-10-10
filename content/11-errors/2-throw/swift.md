Errors are usually enums conforming to `Error`; throwing functions declare `throws`.

```swift
enum ValidationError: Error {
    case userRequired
}

func getAge(_ user: User?) throws -> Int {
    guard let user else { throw ValidationError.userRequired }
    return user.age
}
```
