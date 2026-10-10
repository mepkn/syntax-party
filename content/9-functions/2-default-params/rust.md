No default parameters — `Option` + `unwrap_or` (or a builder) fills the gap.

```rust
fn greet(name: &str, msg: Option<&str>) -> String {
    let msg = msg.unwrap_or("Hello");
    format!("{msg}, {name}!")
}

greet("John", None);         // "Hello, John!"
greet("John", Some("Hi"));   // "Hi, John!"
```
