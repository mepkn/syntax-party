`toIntOrNull` returns null instead of throwing.

```kotlin
"42".toInt()           // 42
"3.14".toDouble()      // 3.14
"42px".toIntOrNull()   // null — no exception
"42px".toInt()         // NumberFormatException
```
