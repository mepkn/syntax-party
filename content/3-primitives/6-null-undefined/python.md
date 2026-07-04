`None` is the sole "no value" singleton — Python has no separate null/undefined distinction.

```python
a = None

a is None    # True  — preferred identity check

# safe access
name = user.get("name") if user else "Guest"
```
