`None` is the sole "no value" singleton — Python has no separate null/undefined distinction.

```python
a = None

a is None    # True  — preferred identity check
a == None    # True  — works but `is` is idiomatic

type(None)   # <class 'NoneType'>

# safe default
name = user.get("name") if user else "Guest"
```
