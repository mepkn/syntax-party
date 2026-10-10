No one-line append — `FileHandle` does that work.

```swift
try "hello\n".write(toFile: "notes.txt", atomically: true, encoding: .utf8)

// append
let f = FileHandle(forWritingAtPath: "notes.txt")!
f.seekToEndOfFile()
f.write(Data("more\n".utf8))
```
