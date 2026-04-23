Variables are function-scoped. Use `global` or `nonlocal` to write to an outer scope.

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        nonlocal x       # write to enclosing scope
        x = "modified"

    inner()
    print(x)  # "modified"

outer()
print(x)      # "global"
```
