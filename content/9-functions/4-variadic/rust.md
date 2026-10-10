No variadics — pass a slice. Macros like `println!` are how the stdlib fakes them.

```rust
fn sum_all(nums: &[i32]) -> i32 {
    nums.iter().sum()
}

sum_all(&[1, 2, 3]);   // 6

let xs = vec![1, 2, 3];
sum_all(&xs);          // slices borrow from a Vec
```
