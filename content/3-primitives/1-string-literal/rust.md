`&str` is a borrowed slice; `String` is owned and growable. Single quotes are `char`.

```rust
let single = 'h';                 // char, not a string
let literal = "hello";            // &str
let owned = String::from("hello");
let multiline = "line one
line two";
```
