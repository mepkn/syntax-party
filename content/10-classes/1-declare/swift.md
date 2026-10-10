Structs get a free memberwise `init` — classes write their own.

```swift
class User {
    let name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    func greet() -> String {
        "Hi, I'm \(name)"
    }
}

let u = User(name: "John", age: 25)
u.greet()
```
