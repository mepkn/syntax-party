`next` skips, `break` exits — `redo` even reruns the current iteration.

```ruby
xs.each do |x|
  next if x == "skip"
  break if x == "stop"
  puts x
end
```
