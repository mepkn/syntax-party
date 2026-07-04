```kotlin
val s = "  Hello, World!  "

s.length                    // 17
s.trim()                    // "Hello, World!"
s.uppercase()               // "  HELLO, WORLD!  "
s.lowercase()               // "  hello, world!  "
s[0]                        // ' '
s.substring(2, 7)           // "Hello"
s.contains("World")         // true
s.replace("World", "Kt")    // "  Hello, Kt!  "
s.split(", ")               // ["  Hello", "World!  "]
```
