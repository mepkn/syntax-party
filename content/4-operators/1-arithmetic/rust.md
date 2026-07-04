Integer `/` truncates; mixing numeric types is a compile error. `pow` is a method, not an operator.

```rust
10 + 3          // 13
10 - 3          // 7
10 * 3          // 30
10 / 3          // 3    (integer division)
10.0 / 3.0      // 3.333...
10 % 3          // 1
10_i32.pow(3)   // 1000

let mut x = 5;
// no ++ / -- operators
x += 2;
```
