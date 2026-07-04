`for` iterates anything implementing `IntoIterator`; ranges are `0..5`.

```rust
for i in 0..5 {
    println!("{i}");
}

for x in ["a", "b"] {
    println!("{x}");
}

for (k, v) in &obj {
    println!("{k} {v}");
}
```
