Arrays and structs are value types — assignment copies (copy-on-write). Classes are references, counted by ARC.

```swift
var a = ["x"]
var b = a            // value type — copied
b.append("y")
a                    // ["x"] — unchanged!

let u1 = User(name: "John")   // class — reference semantics, ARC-managed
let u2 = u1                   // same instance
```
