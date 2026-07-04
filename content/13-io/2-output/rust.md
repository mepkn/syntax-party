`println!` is a macro — format strings are checked at compile time.

```rust
println!("Hello, World");
println!("x = {}, y = {}", 42, 7);
print!("no newline");
eprintln!("error message");         // stderr
println!("{:?}", vec![1, 2, 3]);    // debug form
```
