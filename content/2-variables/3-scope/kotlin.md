Block-scoped. Lambdas capture outer variables and may mutate them — unlike Java.

```kotlin
var x = "global"

fun outer() {
    var x = "enclosing"

    val inner = {
        x = "modified by inner"   // lambdas capture and can mutate
        println(x)                // enclosing (modified)
    }

    inner()
    println(x)                    // enclosing (modified)
}
```
