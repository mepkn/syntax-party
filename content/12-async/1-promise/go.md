No promises — concurrency uses goroutines and channels. A channel is the "future" equivalent.

```go
func loadUser(id int) <-chan User {
    ch := make(chan User, 1)
    go func() {
        time.Sleep(100 * time.Millisecond)
        ch <- User{ID: id, Name: "John"}
        close(ch)
    }()
    return ch
}

user := <-loadUser(1) // block until the value arrives
```
