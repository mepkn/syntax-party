`vararg` collects into an array; `*` spreads one back in.

```kotlin
fun sumAll(vararg nums: Int) = nums.sum()

sumAll(1, 2, 3)   // 6

val xs = intArrayOf(1, 2, 3)
sumAll(*xs)       // spread operator
```
