`&&` / `||` return one of their operands; `||=` assigns only when `nil` or `false`.

```ruby
true && false      # false
true || false      # true
!true              # false

nil || "fallback"  # "fallback" — returns the operand
x ||= "default"    # ubiquitous memoization idiom
```
