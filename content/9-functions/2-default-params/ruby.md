Defaults are re-evaluated on every call — a mutable default like `[]` is safe (unlike Python).

```ruby
def greet(name, msg = "Hello")
  "#{msg}, #{name}!"
end

greet("John")          # "Hello, John!"
greet("John", "Hi")    # "Hi, John!"
```
