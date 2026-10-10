Build errors with `errors.New`, `fmt.Errorf`, or a custom type implementing `error`.

```go
import (
    "errors"
    "fmt"
)

func getAge(user *User) (int, error) {
    if user == nil {
        return 0, errors.New("user required")
    }
    return user.Age, nil
}

// custom error type
type ValidationError struct{ Msg string }

func (e *ValidationError) Error() string { return e.Msg }

err := fmt.Errorf("invalid id %d", id) // with context
```
