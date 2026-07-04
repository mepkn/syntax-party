`format!` interpolates with `{}` — format strings are checked at compile time.

```rust
let name = "Alice";
let age = 30;

let greeting = format!("Hello, {name}! You are {age} years old.");
let expr = format!("{} is four", 2 + 2);
```
