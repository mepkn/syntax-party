Traits are explicit interfaces — types opt in with `impl Trait for Type`.

```rust
trait Speaker {
    fn speak(&self) -> String;
}

impl Speaker for Dog {
    fn speak(&self) -> String {
        format!("{} barks", self.name)
    }
}

fn announce(s: &impl Speaker) {
    println!("{}", s.speak());
}

announce(&dog);
```
