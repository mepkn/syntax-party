Must be exhaustive; no implicit fallthrough (opt in with `fallthrough`).

```swift
switch day {
case "mon", "tue":
    print("early week")
case "fri":
    print("tgif")
default:
    print("other")
}

// ranges are patterns
switch age {
case 0...12: print("child")
case 13...17: print("teen")
default: print("adult")
}
```
