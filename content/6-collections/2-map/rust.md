`HashMap` values share one type — for mixed fields like this, a struct is the idiomatic choice.

```rust
use std::collections::HashMap;

let mut user = HashMap::from([("name", "John"), ("age", "25")]);

user.get("name")                 // Some("John")
user.get("email")                // None — no panic
user.insert("email", "a@b.c");   // add
user.remove("age");              // remove

user.keys()                      // iterator over keys
user.values()                    // iterator over values

for (k, v) in &user {            // iteration order is randomized
    println!("{k} {v}");
}
```
