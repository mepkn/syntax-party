```kotlin
import java.io.File

val text = File("notes.txt").readText()

File("notes.txt").forEachLine { println(it) }   // stream line-by-line
```
