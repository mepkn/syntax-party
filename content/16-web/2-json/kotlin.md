`kotlinx.serialization` generates codecs at compile time via the `@Serializable` plugin.

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.Json

@Serializable
data class User(val name: String, val age: Int)

// decode
val u = Json.decodeFromString<User>("""{"name":"John","age":25}""")

// encode
val data = Json.encodeToString(u)
```
