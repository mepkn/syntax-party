`os.WriteFile` creates or truncates in one call; appending needs `os.OpenFile` with flags.

```go
os.WriteFile("notes.txt", []byte("hello\n"), 0644)

// append
f, _ := os.OpenFile("notes.txt", os.O_APPEND|os.O_WRONLY, 0644)
defer f.Close()
f.WriteString("more\n")
```
