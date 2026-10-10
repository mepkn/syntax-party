No interfaces — duck typing rules; `respond_to?` checks capability at runtime.

```ruby
# any object responding to #speak works
def announce(speaker)
  puts speaker.speak
end

announce(Dog.new("Rex"))

speaker.respond_to?(:speak)   # explicit duck-type check
```
