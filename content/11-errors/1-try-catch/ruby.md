Bare `rescue` catches `StandardError`, not everything — low-level errors stay fatal.

```ruby
begin
  risky_op
rescue ArgumentError => err
  puts err.message
rescue StandardError => err
  puts "unexpected: #{err.message}"
else
  puts "no error"
ensure
  cleanup
end
```
