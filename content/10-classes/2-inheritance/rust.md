No inheritance at all — compose structs and share behavior through traits.

```rust
struct Animal {
    name: String,
}

struct Dog {
    animal: Animal,   // composition — no field/method promotion
    breed: String,
}

impl Dog {
    fn speak(&self) -> String {
        format!("{} barks", self.animal.name)
    }
}
```
