```swift
func greet(_ name: String, msg: String = "Hello") -> String {
    "\(msg), \(name)!"
}

greet("John")              // "Hello, John!"
greet("John", msg: "Hi")   // "Hi, John!"
```
