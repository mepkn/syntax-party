`join!` awaits futures concurrently on one task; `try_join!` fails fast on the first error.

```rust
let (a, b) = tokio::join!(load_user(1), load_user(2));

let (a, b) = tokio::try_join!(load_user(1), load_user(2))?;

// tokio::spawn moves work to separate tasks (true parallelism)
```
