No ownership — names bind to the same object, and the GC frees unreachable objects.

```python
a = ["x"]
b = a               # same list — name binding
b.append("y")
a                   # ["x", "y"]

c = a.copy()        # shallow copy
```
