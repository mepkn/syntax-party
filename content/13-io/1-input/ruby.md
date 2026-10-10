`gets` includes the trailing newline — `chomp` removes it.

```ruby
print "Enter your name: "
name = gets.chomp

print "Enter your age: "
age = gets.to_i
```
