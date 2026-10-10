No HTTP client in std — `reqwest` (on Tokio) is the de-facto choice.

```rust
let users: Vec<User> = reqwest::get("https://api.example.com/users")
    .await?
    .json()
    .await?;
```
