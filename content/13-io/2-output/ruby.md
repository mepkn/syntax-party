`puts` for humans, `p` for debugging — `p` prints the `inspect` form and returns its argument.

```ruby
puts "Hello, World"          # appends newline
print "no newline"
p [1, 2, 3]                  # [1, 2, 3] — inspect form
warn "error message"         # stderr
```
