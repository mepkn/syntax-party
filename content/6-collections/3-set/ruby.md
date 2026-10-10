`Set` is autoloaded since Ruby 3.2 — older versions need `require "set"`.

```ruby
s = Set["apple", "banana", "apple"]

s.size                 # 2 — duplicates collapsed
s.include?("apple")    # true
s.add("cherry")
s.delete("banana")

s1 | s2                # union
s1 & s2                # intersection
s1 - s2                # difference

s.each { |x| puts x }
```
