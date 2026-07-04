Immutable by default — `mut` opts in to reassignment. Types are inferred.

```rust
let name = "John";
let mut age = 25;
age += 1;
let is_active: bool = true;   // explicit type when needed
```
