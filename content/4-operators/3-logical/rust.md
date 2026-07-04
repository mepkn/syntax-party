Operands must be `bool` — no truthiness; `Option` fallbacks use `unwrap_or`, not `||`.

```rust
true && false    // false
true || false    // true
!true            // false
```
