Go has no `async`/`await` — code is synchronous by default; launch a goroutine and receive from a channel to "await".

```go
// synchronous by default — no special keyword
user, err := loadUser(1)
if err != nil {
    log.Println(err)
    return
}
fmt.Println(user)

// concurrent: `go` launches, channel receive "awaits"
ch := make(chan User, 1)
go func() {
    u, _ := loadUser(2)
    ch <- u
}()
user2 := <-ch
```
