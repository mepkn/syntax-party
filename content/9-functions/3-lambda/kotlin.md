A lambda as the last argument moves outside the parentheses; `it` is the implicit parameter.

```kotlin
val square = { x: Int -> x * x }

listOf(1, 2, 3).map { it * 2 }

users.sortedBy { it.age }
```
