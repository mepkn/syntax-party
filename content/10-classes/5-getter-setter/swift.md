Computed properties define `get`/`set` blocks; `newValue` is the implicit setter argument.

```swift
class User {
    private var _name: String
    init(name: String) { _name = name }

    var name: String {
        get { _name }
        set { _name = newValue.trimmingCharacters(in: .whitespaces) }
    }
}

let u = User(name: "John")
u.name               // "John"
u.name = "  Jane  "
```
