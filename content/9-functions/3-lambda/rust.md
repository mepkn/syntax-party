Closures use `|args|` and capture by reference, mutation, or move — inferred automatically.

```rust
let square = |x: i32| x * x;

let doubled: Vec<_> = [1, 2, 3].iter().map(|x| x * 2).collect();

users.sort_by_key(|u| u.age);
```
