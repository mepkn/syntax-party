No null — `Option<T>` makes absence explicit and checked at compile time.

```rust
let a: Option<i32> = None;
let b = Some(5);

a.is_none()      // true
b.unwrap_or(0)   // 5 — fallback when None

if let Some(v) = b {   // pattern match to use the value
    println!("{v}");
}
```
