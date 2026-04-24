Encoding is driven by struct field tags. Decoding takes a pointer to the destination.

```go
import "encoding/json"

type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

// decode
var u User
json.Unmarshal([]byte(`{"name":"John","age":25}`), &u)

// encode
data, _     := json.Marshal(u)
pretty, _   := json.MarshalIndent(u, "", "  ")
```
