Explicit sized types (`i32`, `u64`, `f64`); integer overflow panics in debug builds.

```rust
let integer: i32 = 42;
let float: f64 = 3.14;
let scientific = 1.5e10;
let readable = 1_000_000;   // underscores as separators
// no native complex numbers (use the `num` crate)
```
