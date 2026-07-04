`parse` returns a `Result` — failure is a value to handle, not an exception.

```rust
let n: i32 = "42".parse().unwrap();     // 42
let f: f64 = "3.14".parse().unwrap();   // 3.14
let bad = "42px".parse::<i32>();        // Err(...) — strict
```
