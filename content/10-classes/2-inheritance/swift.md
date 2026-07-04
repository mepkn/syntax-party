Only classes inherit — structs don't. `override` is mandatory.

```swift
class Animal {
    let name: String
    init(name: String) { self.name = name }
    func speak() -> String { "\(name) makes a sound" }
}

class Dog: Animal {
    let breed: String
    init(name: String, breed: String) {
        self.breed = breed
        super.init(name: name)
    }
    override func speak() -> String { "\(name) barks" }
}
```
