`loop do` + `break` is the idiomatic do-while; `until` inverts the condition.

```ruby
i = 0
while i < 5
  puts i
  i += 1
end

# do-while equivalent
loop do
  i += 1
  break if i >= 10
end
```
