Return `Err` — errors are ordinary values, not thrown control flow.

```rust
fn get_age(user: Option<&User>) -> Result<u32, String> {
    match user {
        Some(u) => Ok(u.age),
        None => Err("user required".to_string()),
    }
}

// custom error type
#[derive(Debug)]
struct ValidationError(String);
```
