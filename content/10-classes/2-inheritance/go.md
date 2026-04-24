No inheritance — use struct embedding to compose. Embedded fields and methods are promoted.

```go
type Animal struct {
    Name string
}

func (a Animal) Speak() string {
    return a.Name + " makes a sound"
}

type Dog struct {
    Animal // embedded — promotes Name and Speak
}

func (d Dog) Speak() string { // shadows Animal.Speak
    return d.Name + " barks"
}
```
