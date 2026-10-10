`coroutineScope` + `async` is structured concurrency — one failure cancels the siblings.

```kotlin
coroutineScope {
    val a = async { loadUser(1) }
    val b = async { loadUser(2) }
    val users = listOf(a.await(), b.await())
}
```
