Go has no `async`/`await`. Code reads synchronously; `go` launches a goroutine for concurrency.

```go
user, err := loadUser(1)
if err != nil {
    log.Println(err)
    return
}
fmt.Println(user)

// run concurrently — fire and (optionally) forget
go loadUser(2)
```
