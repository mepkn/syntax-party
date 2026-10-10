`to` builds pairs; missing keys return null rather than throwing.

```kotlin
val user = mutableMapOf("name" to "John", "age" to 25)

user["name"]               // "John"
user["email"]              // null if missing — no exception
user["email"] = "a@b.c"    // add
user.remove("age")         // remove

user.keys                  // [name, email]
user.values                // [John, 25]

for ((k, v) in user) println("$k $v")
```
