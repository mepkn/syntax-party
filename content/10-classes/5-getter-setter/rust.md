No accessor syntax — write methods. The getter takes the field's name, no `get_` prefix.

```rust
struct User {
    name: String,   // private outside its module
}

impl User {
    fn name(&self) -> &str {
        &self.name
    }

    fn set_name(&mut self, value: &str) {
        self.name = value.trim().to_string();
    }
}
```
