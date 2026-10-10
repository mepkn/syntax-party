`lambda` is expression-only, and PEP 8 discourages assigning one to a name — lambdas belong inline.

```python
square = lambda x: x * x

list(map(lambda x: x * 2, [1, 2, 3]))

sorted(users, key=lambda u: u.age)
```
