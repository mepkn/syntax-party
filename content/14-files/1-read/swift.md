```swift
let text = try String(contentsOfFile: "notes.txt", encoding: .utf8)

for line in text.split(separator: "\n") {
    print(line)
}
```
