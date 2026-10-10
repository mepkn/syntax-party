Single-expression functions drop the braces and `return`.

```kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}

// expression body
fun addShort(a: Int, b: Int) = a + b

add(2, 3)   // 5
```
