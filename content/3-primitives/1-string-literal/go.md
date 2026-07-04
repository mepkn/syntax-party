Single quotes make a `rune` (Unicode code point), not a string. Backticks are raw, multi-line literals.

```go
single := 'h' // rune, not string
double := "hello"
multiline := `line one
line two`
```
