Only `false` and `nil` are falsy — `!!` is the conversion idiom.

```ruby
!!nil        # false
!!false      # false
!!0          # true — 0 is truthy (unlike JS/Python)
!!""         # true — empty string is truthy
!![]         # true
```
