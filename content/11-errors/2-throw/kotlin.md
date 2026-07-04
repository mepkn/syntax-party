`require` / `check` throw with a lazily-built message.

```kotlin
fun getAge(user: User?): Int {
    requireNotNull(user) { "user required" }
    return user.age
}

// custom exception
class ValidationError(message: String) : Exception(message)

throw ValidationError("bad input")
```
