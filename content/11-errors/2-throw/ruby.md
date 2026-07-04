`raise` is for errors — Ruby's `throw`/`catch` exist but are control flow, not exceptions.

```ruby
def get_age(user)
  raise ArgumentError, "user required" if user.nil?
  user.age
end

# custom exception
class ValidationError < StandardError
end

raise ValidationError, "bad input"
```
