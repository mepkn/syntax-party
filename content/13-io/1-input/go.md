`bufio.Scanner` is the usual choice for line-by-line input.

```go
import (
    "bufio"
    "fmt"
    "os"
)

scanner := bufio.NewScanner(os.Stdin)
fmt.Print("Enter your name: ")
scanner.Scan()
name := scanner.Text()
```
