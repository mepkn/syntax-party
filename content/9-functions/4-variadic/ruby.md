`*` collects positional arguments into an array; `**` collects keywords into a hash.

```ruby
def sum_all(*nums)
  nums.sum
end

sum_all(1, 2, 3)   # 6

xs = [1, 2, 3]
sum_all(*xs)       # splat to expand

def configure(**opts)
  puts opts        # {host: "...", port: ...}
end
```
