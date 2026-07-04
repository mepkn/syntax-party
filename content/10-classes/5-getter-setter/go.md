No accessor syntax — just write methods. Idiom: `Name()` (no "Get" prefix) and `SetName(v)`.

```go
type User struct {
    name string // lowercase = unexported
}

func (u *User) Name() string      { return u.name }
func (u *User) SetName(v string)  { u.name = strings.TrimSpace(v) }
```
