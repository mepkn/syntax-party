Labels let `break`/`continue` target an outer loop.

```swift
for x in xs {
    if x == "skip" { continue }
    if x == "stop" { break }
    print(x)
}
```
