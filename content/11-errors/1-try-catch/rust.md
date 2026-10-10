No exceptions — `Result` is handled with `match` or propagated with `?`.

```rust
match risky_op() {
    Ok(value) => println!("{value}"),
    Err(err) => eprintln!("{err}"),
}

// or propagate to the caller
let value = risky_op()?;

// panics exist, but only for unrecoverable bugs
```
