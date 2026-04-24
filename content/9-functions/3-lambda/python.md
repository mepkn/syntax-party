`lambda` is expression-only — for anything multi-line, define a named function with `def`.

```python
square = lambda x: x * x

list(map(lambda x: x * 2, [1, 2, 3]))

sorted(users, key=lambda u: u.age)
```
