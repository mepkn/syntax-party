No ownership — variables share references, and the GC frees unreachable objects.

```ruby
a = ["x"]
b = a               # same array — reference copy
b << "y"
a                   # ["x", "y"]

c = a.dup           # shallow copy
```
