`len` counts bytes; strings can't be indexed directly — slice by byte range or use `chars()`.

```rust
let s = "  Hello, World!  ";

s.len()                       // 17 (bytes)
s.trim()                      // "Hello, World!"
s.to_uppercase()              // "  HELLO, WORLD!  "
s.to_lowercase()              // "  hello, world!  "
s.chars().next()              // Some(' ') — no s[0]
&s[2..7]                      // "Hello"
s.contains("World")           // true
s.replace("World", "Rust")    // "  Hello, Rust!  "
s.split(", ")                 // iterator — .collect() for a Vec
```
