`os.ReadFile` reads the whole file into `[]byte` — convert to `string` as needed.

```go
data, err := os.ReadFile("notes.txt")
if err != nil {
    return err
}
text := string(data)
```
