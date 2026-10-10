`Codable` conformance is synthesized by the compiler — no annotations needed.

```swift
struct User: Codable {
    let name: String
    let age: Int
}

// decode
let u = try JSONDecoder().decode(User.self, from: jsonData)

// encode
let data = try JSONEncoder().encode(u)
```
