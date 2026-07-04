`len` returns byte count, not character count.

```go
s := "  Hello, World!  "

len(s)                               // 17 (bytes)
strings.TrimSpace(s)                 // "Hello, World!"
strings.ToUpper(s)                   // "  HELLO, WORLD!  "
strings.ToLower(s)                   // "  hello, world!  "
s[0]                                 // byte at index 0
s[2:7]                               // "Hello"
strings.Contains(s, "World")         // true
strings.ReplaceAll(s, "World", "Go") // "  Hello, Go!  "
strings.Split(s, ", ")               // ["  Hello" "World!  "]
```
