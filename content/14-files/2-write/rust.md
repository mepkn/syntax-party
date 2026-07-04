```rust
use std::fs::{self, OpenOptions};
use std::io::Write;

fs::write("notes.txt", "hello\n")?;   // create or overwrite

// append
let mut f = OpenOptions::new().append(true).open("notes.txt")?;
f.write_all(b"more\n")?;
```
