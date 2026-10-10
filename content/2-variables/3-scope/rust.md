Block-scoped. Re-`let`ing a name shadows it — idiomatic in Rust, unlike most languages.

```rust
let x = "outer";

{
    let x = "inner";   // shadows — a new binding, same name
    println!("{x}");   // inner
}

println!("{x}");       // outer (unchanged)

// closures capture the enclosing scope
let mut count = 0;
let mut inc = || count += 1;
inc();
```
