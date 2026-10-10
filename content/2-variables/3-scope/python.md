Variables are function-scoped. Use `global` or `nonlocal` to write to an outer scope.

```python
# Local → Enclosing → Global → Built In
# Explicit Mutation

x = "global"

def outer():
    x = "enclosing"

    def inner():
        nonlocal x   # required to modify enclosing scope
        x = "modified by inner"
        print(x)     # enclosing (modified)

    inner()
    print(x)         # enclosing (modified)

outer()
print(x)             # global (unchanged)
```
