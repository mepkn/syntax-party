All exceptions are unchecked — no `throws` declarations required.

```kotlin
try {
    riskyOp()
} catch (err: IllegalArgumentException) {
    println(err.message)
} catch (err: Exception) {
    println("unexpected: ${err.message}")
} finally {
    cleanup()
}
```
