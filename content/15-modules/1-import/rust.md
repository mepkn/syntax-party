`use` brings paths into scope; external crates are declared in `Cargo.toml`.

```rust
use std::collections::HashMap;
use std::fmt::{self, Display};   // grouped
use serde_json as json;          // alias

// crate-local modules
use crate::mathx::add;
```
