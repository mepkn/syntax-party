No `static` keyword — a `companion object` holds class-level members.

```kotlin
class MathX {
    companion object {
        const val PI = 3.14

        fun square(x: Int) = x * x
    }
}

MathX.PI          // 3.14
MathX.square(5)   // 25
```
