Properties have implicit accessors — override `set()` and use `field` for the backing value.

```kotlin
class User(name: String) {
    var name: String = name
        set(value) {
            field = value.trim()
        }
}

val u = User("John")
u.name               // "John"
u.name = "  Jane  "
```
