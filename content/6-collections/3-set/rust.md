Set operators work on references — `&s1 | &s2` builds a new set.

```rust
use std::collections::HashSet;

let mut s = HashSet::from(["apple", "banana", "apple"]);

s.len()                // 2 — duplicates collapsed
s.contains("apple")    // true
s.insert("cherry");
s.remove("banana");

&s1 | &s2              // union
&s1 & &s2              // intersection
&s1 - &s2              // difference

for x in &s {
    println!("{x}");
}
```
