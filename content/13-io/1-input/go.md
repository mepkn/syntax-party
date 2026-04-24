`bufio.Scanner` is the usual choice for line-by-line input.

```go
import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

reader := bufio.NewReader(os.Stdin)
fmt.Print("Enter your name: ")
name, _ := reader.ReadString('\n')
name = strings.TrimSpace(name)
```
