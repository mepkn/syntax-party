No integer subscripts — `String` indexes by grapheme cluster; use `prefix`/`dropFirst` to slice.

```swift
let s = "  Hello, World!  "

s.count                                  // 17
s.trimmingCharacters(in: .whitespaces)   // "Hello, World!"
s.uppercased()                           // "  HELLO, WORLD!  "
s.lowercased()                           // "  hello, world!  "
s.first                                  // Optional(" ") — no s[0]
s.dropFirst(2).prefix(5)                 // "Hello"
s.contains("World")                      // true
s.replacingOccurrences(of: "World", with: "Swift")
s.components(separatedBy: ", ")          // ["  Hello", "World!  "]
```
