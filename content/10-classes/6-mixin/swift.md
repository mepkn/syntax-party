Protocol extensions add default behavior to every conforming type.

```swift
protocol Greetable {
    var name: String { get }
}

extension Greetable {
    func greet() -> String {   // mixed in for free
        "Hi, I'm \(name)"
    }
}

struct User: Greetable {
    let name: String
}

User(name: "John").greet()   // "Hi, I'm John"
```
