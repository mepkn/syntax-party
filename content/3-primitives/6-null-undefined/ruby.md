`nil` is the sole "no value" — and it's a real object with methods (`nil.to_s` → `""`).

```ruby
a = nil

a.nil?       # true — preferred check

# safe navigation
name = user&.name || "Guest"
```
