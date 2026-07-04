No HTTP client in the stdlib — Ktor is the coroutine-native choice (OkHttp on Android).

```kotlin
val client = HttpClient()

val users: List<User> = client
    .get("https://api.example.com/users")
    .body()
```
