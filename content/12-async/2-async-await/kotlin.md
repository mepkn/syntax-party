`suspend` marks the function; call sites look synchronous — there is no `await` keyword.

```kotlin
suspend fun getUser(id: Int) {
    try {
        val user = loadUser(id)   // suspends without special syntax
        println(user)
    } catch (err: Exception) {
        println(err)
    }
}

runBlocking { getUser(1) }
```
