No default parameters — use overloads or the functional-options pattern for configurable APIs.

```go
func greet(name string) string {
    return greetWith(name, "Hello")
}

func greetWith(name, msg string) string {
    return fmt.Sprintf("%s, %s!", msg, name)
}
```
