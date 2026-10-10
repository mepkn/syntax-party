Everything is private by default — `pub` exports it.

```rust
// mathx.rs
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub const PI: f64 = 3.14;

fn helper() {}   // private to the module
```
