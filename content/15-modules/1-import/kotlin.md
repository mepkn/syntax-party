Imports are per-name; packages group code, Gradle resolves dependencies.

```kotlin
import kotlin.math.sqrt          // single name
import kotlin.math.*             // everything
import java.io.File as JFile     // alias

sqrt(4.0)
```
