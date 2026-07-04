Interfaces are implemented explicitly with `:` — they may also carry default implementations.

```kotlin
interface Speaker {
    fun speak(): String
}

class Dog(val name: String) : Speaker {
    override fun speak() = "$name barks"
}

fun announce(s: Speaker) = println(s.speak())

announce(Dog("Rex"))
```
