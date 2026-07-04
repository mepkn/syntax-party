`loop` is the idiomatic infinite loop — it can even `break` with a value.

```rust
let mut i = 0;
while i < 5 {
    println!("{i}");
    i += 1;
}

// do-while equivalent
loop {
    i += 1;
    if i >= 10 {
        break;
    }
}
```
