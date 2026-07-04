`fs::read_to_string` reads the whole file; the `Result` forces failure handling.

```rust
use std::fs;

let text = fs::read_to_string("notes.txt")?;

for line in text.lines() {
    println!("{line}");
}
```
