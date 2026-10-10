Default visibility is `internal` (module-wide) — add `public` to export from a package.

```swift
public func add(_ a: Int, _ b: Int) -> Int { a + b }

public let pi = 3.14

private func helper() {}   // file-private
```
