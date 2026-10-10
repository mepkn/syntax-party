`Deferred` is the future — `async` starts it, `.await()` suspends for the result.

```kotlin
fun loadUser(id: Int): Deferred<User> = scope.async {
    delay(100)
    User(id, "John")
}

val user = loadUser(1).await()   // suspend until the value arrives
```
