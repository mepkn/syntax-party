No ownership — references share objects, and the JVM GC frees them.

```kotlin
val a = mutableListOf("x")
val b = a               // same list — reference copy
b.add("y")
a                       // [x, y]

val c = a.toMutableList()   // explicit copy
```
