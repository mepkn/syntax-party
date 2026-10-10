Go has no classes — a `struct` holds data, methods attach via receivers, and a constructor is just a `New*` function.

```go
type User struct {
    Name string
    Age  int
}

func (u User) Greet() string {
    return fmt.Sprintf("Hi, I'm %s", u.Name)
}

func NewUser(name string, age int) User {
    return User{Name: name, Age: age}
}

u := NewUser("John", 25)
u.Greet()
```
