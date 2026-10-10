The last expression — no semicolon — is the return value.

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b   // implicit return
}

add(2, 3);   // 5

// multiple values via tuples
fn divmod(a: i32, b: i32) -> (i32, i32) {
    (a / b, a % b)
}
```
