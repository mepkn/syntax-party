Falsy: `None`, `False`, `0`, `0.0`, `""`, and empty containers (`[]`, `()`, `{}`, `set()`). Everything else is truthy.

```python
bool(0)       # False
bool("")      # False
bool("hi")    # True
bool([])      # False — empty containers are falsy (unlike JS)
```
