No inheritance by design — Go composes instead. Embedding promotes the inner type's fields and methods.

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
