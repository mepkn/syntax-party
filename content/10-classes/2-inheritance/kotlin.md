Classes and methods are `final` unless marked `open`; `override` is mandatory.

```kotlin
open class Animal(val name: String) {
    open fun speak() = "$name makes a sound"
}

class Dog(name: String, val breed: String) : Animal(name) {
    override fun speak() = "$name barks"
}
```
