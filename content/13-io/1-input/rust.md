`read_line` appends into a `String` buffer and keeps the newline — trim it off.

```rust
use std::io;

let mut name = String::new();
io::stdin().read_line(&mut name).unwrap();
let name = name.trim();   // shadow to strip the newline
```
