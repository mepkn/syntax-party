Futures are lazy — nothing runs until awaited. A runtime (usually Tokio) drives them.

```rust
async fn load_user(id: u32) -> User {
    sleep(Duration::from_millis(100)).await;
    User { id, name: "John".into() }
}

// returns a Future — inert until .await
let future = load_user(1);
let user = future.await;
```
