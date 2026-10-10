`match` must be exhaustive — the compiler rejects missing cases. `|` stacks patterns.

```rust
match day {
    "mon" | "tue" => println!("early week"),
    "fri" => println!("tgif"),
    _ => println!("other"),
}

// match is an expression; ranges are patterns too
let stage = match age {
    0..=12 => "child",
    13..=17 => "teen",
    _ => "adult",
};
```
