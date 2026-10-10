Associated functions and constants live in `impl` and are reached with `::`.

```rust
struct MathX;

impl MathX {
    const PI: f64 = 3.14;

    fn square(x: i32) -> i32 {
        x * x
    }
}

MathX::PI          // 3.14
MathX::square(5)   // 25
```
