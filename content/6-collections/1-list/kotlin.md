`listOf` is read-only; `mutableListOf` allows changes. `it` is the implicit lambda parameter.

```kotlin
val xs = mutableListOf("apple", "banana", "cherry")

xs.size                    // 3
xs[0]                      // "apple"
xs.add("date")             // append
xs.removeLast()            // remove & return last
xs.subList(1, 3)           // ["banana", "cherry"]

xs.map { it.uppercase() }
xs.filter { it.length > 5 }

for (x in xs) println(x)
```
