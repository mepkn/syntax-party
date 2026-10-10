Integer `/` truncates; use `math.Pow` for exponentiation — Go has no `**`.

```go
10 + 3    // 13
10 - 3    // 7
10 * 3    // 30
10 / 3    // 3  (integer division when both ints)
10 % 3    // 1
math.Pow(10, 3)  // 1000

x := 5
x++       // statement, not an expression
x += 2
```
