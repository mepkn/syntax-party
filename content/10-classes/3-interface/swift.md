Protocols are Swift's interfaces — structs, classes, and enums can all conform.

```swift
protocol Speaker {
    func speak() -> String
}

struct Dog: Speaker {
    let name: String
    func speak() -> String { "\(name) barks" }
}

func announce(_ s: any Speaker) {
    print(s.speak())
}

announce(Dog(name: "Rex"))
```
