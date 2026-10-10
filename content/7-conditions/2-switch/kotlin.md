`when` has no fallthrough and works as an expression; a bare `when` replaces if/else chains.

```kotlin
when (day) {
    "mon", "tue" -> println("early week")
    "fri" -> println("tgif")
    else -> println("other")
}

// as an expression, with a bare subject
val stage = when {
    age >= 18 -> "adult"
    age >= 13 -> "teen"
    else -> "child"
}
```
