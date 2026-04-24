`Println` auto-spaces and newlines; `Printf` is format-string based.

```go
import (
    "fmt"
    "os"
)

fmt.Println("Hello, World")
fmt.Println("x =", 42, "y =", 7)         // space-separated
fmt.Printf("x = %d, y = %d\n", 42, 7)    // formatted
fmt.Fprintln(os.Stderr, "error message")
```
