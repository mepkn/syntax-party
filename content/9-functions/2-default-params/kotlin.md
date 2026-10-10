Named arguments let callers skip any subset of defaulted parameters.

```kotlin
fun greet(name: String, msg: String = "Hello") = "$msg, $name!"

greet("John")               // "Hello, John!"
greet("John", "Hi")         // "Hi, John!"
greet("John", msg = "Hi")   // named argument
```
