Interfaces are satisfied implicitly — any type with the right methods implements one, no `implements` keyword.

```go
type Speaker interface {
    Speak() string
}

// Dog and Robot both satisfy Speaker automatically
func announce(s Speaker) {
    fmt.Println(s.Speak())
}

announce(Dog{Name: "Rex"})
announce(Robot{})
```
