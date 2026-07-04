`for` exists but is rarely used — iterators like `times` and `each` are idiomatic.

```ruby
5.times { |i| puts i }

["a", "b"].each { |x| puts x }

obj.each { |k, v| puts "#{k} #{v}" }
```
