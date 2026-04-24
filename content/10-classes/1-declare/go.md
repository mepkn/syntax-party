Go has no classes — a `struct` holds data and methods are attached via receivers.

```go
type User struct {
    Name string
    Age  int
}

func (u User) Greet() string {
    return fmt.Sprintf("Hi, I'm %s", u.Name)
}

u := User{Name: "John", Age: 25}
u.Greet()
```
