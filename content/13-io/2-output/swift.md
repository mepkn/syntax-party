`print` accepts multiple values and a `terminator:`; stderr has no shorthand.

```swift
print("Hello, World")
print("x =", 42, "y =", 7)            // space-separated
print("no newline", terminator: "")
FileHandle.standardError.write(Data("error\n".utf8))
```
