No classes — a `struct` plus an `impl` block. `Self::new` is the constructor convention.

```rust
struct User {
    name: String,
    age: u32,
}

impl User {
    fn new(name: &str, age: u32) -> Self {
        Self { name: name.into(), age }
    }

    fn greet(&self) -> String {
        format!("Hi, I'm {}", self.name)
    }
}

let u = User::new("John", 25);
u.greet();
```
