The primary constructor lives in the header — `val`/`var` parameters become properties.

```kotlin
class User(val name: String, var age: Int) {
    fun greet() = "Hi, I'm $name"
}

val u = User("John", 25)
u.greet()
```
