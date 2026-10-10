Nullability lives in the type — `String?` may be null, `String` never is.

```kotlin
val a: String? = null

a == null            // true

// safe access
val name = user?.name ?: "Guest"   // ?. safe call, ?: elvis fallback
```
