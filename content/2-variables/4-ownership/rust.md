Assignment moves ownership — the old name is dead; `clone` copies, `&` borrows.

```rust
let a = String::from("hello");
let b = a;           // moved — using `a` now is a compile error
let c = b.clone();   // explicit deep copy

fn borrow(s: &String) {}   // `&` borrows — the caller keeps ownership
borrow(&c);
```
