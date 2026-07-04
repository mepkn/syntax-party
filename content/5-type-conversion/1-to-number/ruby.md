`to_i` is lenient (garbage → 0); `Integer()` raises on bad input.

```ruby
Integer("42")     # 42
Float("3.14")     # 3.14
"42px".to_i       # 42 — parses leading digits
Integer("42px")   # ArgumentError — strict
```
