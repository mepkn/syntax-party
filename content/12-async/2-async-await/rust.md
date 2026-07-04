`.await` is postfix, so it chains cleanly. `#[tokio::main]` sets up the runtime.

```rust
#[tokio::main]
async fn main() {
    match load_user(1).await {
        Ok(user) => println!("{user:?}"),
        Err(err) => eprintln!("{err}"),
    }
}
```
