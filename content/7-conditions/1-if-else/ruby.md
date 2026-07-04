`unless` and trailing modifiers read like prose.

```ruby
if age >= 18
  puts "adult"
elsif age >= 13
  puts "teen"
else
  puts "child"
end

# modifier form
puts "adult" if age >= 18
puts "minor" unless age >= 18
```
