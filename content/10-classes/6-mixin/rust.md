Trait default methods are the mixin — implement one required method, inherit the rest.

```rust
trait Greetable {
    fn name(&self) -> &str;

    fn greet(&self) -> String {   // default method — mixed in for free
        format!("Hi, I'm {}", self.name())
    }
}

struct User {
    name: String,
}

impl Greetable for User {
    fn name(&self) -> &str {
        &self.name
    }
}

// user.greet() comes from the trait
```
