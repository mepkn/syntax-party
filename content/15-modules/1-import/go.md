Imports use module paths. Unused imports are a compile error.

```go
import (
    "fmt"
    "strings"
    "github.com/user/mypkg"

    alias "github.com/user/pkg" // renamed import
)

fmt.Println(strings.ToUpper("hi"))
```
