Falsy values: `None`, `False`, `0`, `0.0`, `""`, `[]`, `()`, `{}`, `set()`. Everything else is truthy.

```python
bool(1)        # True
bool(0)        # False
bool("")       # False
bool("x")      # True
bool([])       # False  — empty containers are falsy
```
