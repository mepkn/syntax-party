`readLine()` returns an Optional — nil at end of input.

```swift
print("Enter your name: ", terminator: "")
let name = readLine() ?? ""

let age = Int(readLine() ?? "") ?? 0
```
