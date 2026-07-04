`net/http` is stdlib. Always close the response body — usually via `defer`.

```go
import (
    "encoding/json"
    "net/http"
)

res, err := http.Get("https://api.example.com/users")
if err != nil {
    return err
}
defer res.Body.Close()

var data []User
json.NewDecoder(res.Body).Decode(&data)
```
