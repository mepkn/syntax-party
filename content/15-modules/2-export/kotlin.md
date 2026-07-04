Everything is `public` by default; `internal` scopes to the module.

```kotlin
// public by default
fun add(a: Int, b: Int) = a + b

const val PI = 3.14

internal fun helper() {}   // module-visible only
private fun secret() {}    // file-private
```
