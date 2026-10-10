`sync.WaitGroup` waits for a group of goroutines; each writes its own slot, so no locking is needed.

```go
import "sync"

var wg sync.WaitGroup
users := make([]User, 2)

for i, id := range []int{1, 2} {
    wg.Add(1)
    go func() {
        defer wg.Done()
        users[i], _ = loadUser(id)
    }()
}

wg.Wait()
```
