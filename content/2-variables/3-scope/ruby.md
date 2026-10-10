Blocks and lambdas close over locals; `def` starts a completely fresh scope.

```ruby
# Local → Enclosing (blocks/lambdas only)
# Direct Mutation

x = "outer"

inner = lambda do
  x = "modified by inner"  # closes over the enclosing local
  puts x                   # outer (modified)
end

inner.call
puts x                     # outer (modified)

def method_scope
  # x is not visible here — `def` does not close over locals
end
```
