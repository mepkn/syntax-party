Interface default methods act as mixins — implement the property, inherit the behavior.

```kotlin
interface Greetable {
    val name: String

    fun greet() = "Hi, I'm $name"   // default method — mixed in for free
}

class User(override val name: String) : Greetable

User("John").greet()   // "Hi, I'm John"
```
