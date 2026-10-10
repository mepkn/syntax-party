Numeric initializers are failable — they return an Optional rather than throwing.

```swift
Int("42")        // Optional(42)
Double("3.14")   // Optional(3.14)
Int("42px")      // nil — no crash, no exception
```
