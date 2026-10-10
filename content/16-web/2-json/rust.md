`serde` derives (de)serialization at compile time — the ecosystem standard.

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct User {
    name: String,
    age: u32,
}

// decode
let u: User = serde_json::from_str(r#"{"name":"John","age":25}"#)?;

// encode
let data = serde_json::to_string(&u)?;
let pretty = serde_json::to_string_pretty(&u)?;
```
