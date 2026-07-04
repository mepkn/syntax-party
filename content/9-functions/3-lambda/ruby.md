Blocks are the everyday anonymous function; `->` lambdas are objects you can store and pass.

```ruby
square = ->(x) { x * x }
square.call(5)               # 5 → 25; also square.(5)

[1, 2, 3].map { |x| x * 2 }

users.sort_by { |u| u.age }
```
