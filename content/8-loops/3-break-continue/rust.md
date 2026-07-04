Labels (`'outer:`) let `break`/`continue` target an outer loop.

```rust
for x in xs {
    if x == "skip" {
        continue;
    }
    if x == "stop" {
        break;
    }
    println!("{x}");
}
```
