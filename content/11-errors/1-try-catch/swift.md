Throwing calls must be marked `try`; `try?` converts failure to nil.

```swift
do {
    try riskyOp()
} catch let err as ValidationError {
    print(err)
} catch {
    print("unexpected: \(error)")   // implicit `error`
}

let result = try? riskyOp()   // nil on failure
```
