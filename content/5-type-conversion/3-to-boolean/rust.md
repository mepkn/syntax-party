No truthiness — write the comparison you mean.

```rust
let ok = !s.is_empty();       // non-empty string
let positive = n != 0;        // non-zero number
let exists = opt.is_some();   // Option holds a value
```
