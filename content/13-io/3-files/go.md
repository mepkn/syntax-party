`os.ReadFile` / `os.WriteFile` handle open-and-close for whole-file operations.

```go
import "os"

data, _ := os.ReadFile("notes.txt")
text := string(data)

os.WriteFile("notes.txt", []byte("hello\n"), 0644)

// append — open with flags, close via defer
f, _ := os.OpenFile("notes.txt", os.O_APPEND|os.O_WRONLY, 0644)
defer f.Close()
f.WriteString("more\n")
```
