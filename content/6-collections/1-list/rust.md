`Vec` is the growable list. `map`/`filter` live on iterators — `.iter()` first, `.collect()` after.

```rust
let mut xs = vec!["apple", "banana", "cherry"];

xs.len()      // 3
xs[0]         // "apple"
xs.push("date");   // append
xs.pop();          // remove & return last (Option)
&xs[1..3]     // ["banana", "cherry"]

let upper: Vec<_> = xs.iter().map(|x| x.to_uppercase()).collect();
let long: Vec<_> = xs.iter().filter(|x| x.len() > 5).collect();

for x in &xs {
    println!("{x}");
}
```
